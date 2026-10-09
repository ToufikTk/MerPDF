import { UserProfile, DEMO_OTHER_USERS } from '../types/user';

const STORAGE_KEY_CURRENT_USER = 'pdf_merge_current_user_v1';
const STORAGE_KEY_USERS_DB = 'pdf_merge_users_db_v1';

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      // Also update in users DB
      const db = getAllRegisteredUsers();
      const existingIdx = db.findIndex((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
      if (existingIdx >= 0) {
        db[existingIdx] = user;
      } else {
        db.push(user);
      }
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (e) {
    console.error('Error saving user to localStorage:', e);
  }
}

export function getAllRegisteredUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Updates a user's profile details and login credentials:
 * First Name, Last Name, Email, Password, Bio, Location.
 * Strictly verifies email availability and password requirements.
 */
export function updateUserProfileAndCredentials(params: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  newPassword?: string;
  bio?: string;
  location?: string;
}): { success: boolean; user?: UserProfile; error?: string } {
  const cleanFirst = params.firstName.trim();
  const cleanLast = params.lastName.trim();
  const cleanEmail = params.email.trim().toLowerCase();

  if (!cleanFirst) {
    return { success: false, error: 'First name is required.' };
  }

  if (!cleanEmail) {
    return { success: false, error: 'Email address is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  if (params.newPassword && params.newPassword.trim().length > 0 && params.newPassword.trim().length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const db = getAllRegisteredUsers();
  // Check if the requested email is already used by a DIFFERENT registered account
  const emailConflict = db.find(
    (u) => u.id !== params.userId && u.email.toLowerCase() === cleanEmail
  );
  if (emailConflict) {
    return {
      success: false,
      error: `The email "${cleanEmail}" is already registered to another account. Please use a different email.`,
    };
  }

  const current = getCurrentUser();
  const existingUser = db.find((u) => u.id === params.userId) || (current?.id === params.userId ? current : null);

  const fullName = cleanLast ? `${cleanFirst} ${cleanLast}` : cleanFirst;
  const username = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'user';

  const updatedPasswordHash =
    params.newPassword && params.newPassword.trim().length > 0
      ? params.newPassword.trim()
      : (existingUser?.passwordHash || (current?.passwordHash));

  const updatedUser: UserProfile = {
    id: params.userId || (existingUser?.id || `usr-${Date.now()}`),
    name: fullName,
    email: cleanEmail,
    username: existingUser?.username || username,
    bio: params.bio !== undefined ? params.bio.trim() : (existingUser?.bio || ''),
    location: params.location !== undefined ? params.location.trim() : (existingUser?.location || ''),
    avatarColor: existingUser?.avatarColor || 'bg-black',
    joinedDate: existingUser?.joinedDate || 'October 2026',
    isVerified: existingUser ? existingUser.isVerified : true,
    plan: existingUser?.plan || 'Free',
    passwordHash: updatedPasswordHash,
    stats: existingUser?.stats || {
      documentsMerged: 0,
      filesUploaded: 0,
      storageUsedMb: 0,
    },
    recentActivities: existingUser?.recentActivities || [
      {
        id: `act-${Date.now()}`,
        title: 'Updated Profile Information.pdf',
        date: 'Just now',
        size: '1.2 MB',
        pageCount: 1,
      },
    ],
  };

  saveCurrentUser(updatedUser);

  return {
    success: true,
    user: updatedUser,
  };
}

export function createNewAccount(params: {
  name: string;
  email: string;
  password?: string;
  isVerified?: boolean;
}): UserProfile {
  const cleanName = params.name.trim();
  const cleanEmail = params.email.trim().toLowerCase();
  const username = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'user';
  
  const colors = [
    'bg-blue-600',
    'bg-indigo-600',
    'bg-emerald-600',
    'bg-teal-600',
    'bg-violet-600',
    'bg-rose-600',
  ];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  // Check if account already exists with this email
  const db = getAllRegisteredUsers();
  const existingIdx = db.findIndex((u) => u.email.toLowerCase() === cleanEmail);

  const newUser: UserProfile = {
    id: existingIdx >= 0 ? db[existingIdx].id : `usr-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    username,
    passwordHash: params.password ? params.password : (existingIdx >= 0 ? db[existingIdx].passwordHash : undefined),
    bio: 'PDF tool enthusiast. Merging, organizing, and managing documents online.',
    location: 'United States',
    avatarColor: existingIdx >= 0 && db[existingIdx].avatarColor ? db[existingIdx].avatarColor : avatarColor,
    joinedDate: existingIdx >= 0 ? db[existingIdx].joinedDate : 'October 2026',
    isVerified: params.isVerified ?? true,
    plan: 'Free',
    stats: {
      documentsMerged: 0,
      filesUploaded: 0,
      storageUsedMb: 0,
    },
    recentActivities: [
      {
        id: `act-${Date.now()}`,
        title: 'Welcome to PDF Merge - Sample Document.pdf',
        date: 'Just now',
        size: '1.2 MB',
        pageCount: 3,
      },
    ],
  };

  saveCurrentUser(newUser);
  return newUser;
}

export interface AuthenticateResult {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

/**
 * Validates authentication credentials:
 * - If user does not exist: returns error indicating account not found.
 * - If user exists but password does not match: returns access denied / incorrect password error.
 * - If user exists and password matches: sets user as currentUser and returns success.
 */
export function authenticateWithPassword(email: string, passwordAttempt: string): AuthenticateResult {
  const cleanEmail = email.trim().toLowerCase();
  const db = getAllRegisteredUsers();
  const user = db.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return {
      success: false,
      error: `No account found for "${cleanEmail}". Please check your email or click "Sign up" to create one.`,
    };
  }

  // If user has a registered password, strictly enforce matching
  if (user.passwordHash && user.passwordHash !== passwordAttempt) {
    return {
      success: false,
      error: 'Access denied: The password entered does not match the password created during account setup. Please verify your credentials and try again.',
    };
  }

  // Successful login
  saveCurrentUser(user);
  return {
    success: true,
    user,
  };
}

export function getUserById(id: string): UserProfile | null {
  const current = getCurrentUser();
  if (current && current.id === id) return current;

  // Check demo other users
  const demoMatch = DEMO_OTHER_USERS.find((u) => u.id === id);
  if (demoMatch) return demoMatch;

  // Check registered users
  const registered = getAllRegisteredUsers();
  return registered.find((u) => u.id === id) || null;
}
