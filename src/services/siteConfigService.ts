export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
}

export interface SiteConfig {
  // 1. Site Branding
  siteName: string;
  tagline: string;
  logoType: 'stack' | 'document' | 'modern' | 'minimal' | 'custom';
  customLogoUrl: string;

  // 2. Contact Information
  supportEmail: string;
  contactPhone: string;
  officeAddress: string;
  businessHours: string;
  responseTime: string;

  // 3. Social Media Links & Visibility
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    facebook: string;
    youtube: string;
  };
  socialVisibility: {
    twitter: boolean;
    github: boolean;
    linkedin: boolean;
    facebook: boolean;
    youtube: boolean;
  };

  // 4. Legal Pages Content Management
  legalPages: {
    privacyPolicy: LegalDocument;
    termsOfService: LegalDocument;
    cookiesPolicy: LegalDocument;
  };

  // 5. SEO & Metadata
  seo: {
    seoTitle: string;
    metaDescription: string;
    h1: string;
    h2: string;
    h3: string;
    keywords: string;
    urlSlug: string;
  };

  // 6. Site Owner Credentials
  adminUsername: string;
  adminPasswordHash: string;
}

const STORAGE_KEY_SITE_CONFIG = 'pdf_merge_site_config_v2';
const STORAGE_KEY_OWNER_AUTH = 'pdf_merge_owner_session_v1';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: 'Merge PDF',
  tagline: 'Merge. Combine. Simplify.',
  logoType: 'stack',
  customLogoUrl: '',

  supportEmail: 'voskvisa@gmail.com',
  contactPhone: '+1 (800) 555-0199',
  officeAddress: '100 Montgomery St, Suite 1800, San Francisco, CA 94104',
  businessHours: 'Monday – Friday: 9:00 AM – 6:00 PM EST',
  responseTime: 'Within 24 hours on business days',

  socialLinks: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    facebook: '',
    youtube: '',
  },
  socialVisibility: {
    twitter: true,
    github: true,
    linkedin: true,
    facebook: false,
    youtube: false,
  },

  legalPages: {
    privacyPolicy: {
      title: 'Privacy Policy',
      lastUpdated: 'October 2026',
      introduction:
        'Your privacy is our priority. We are committed to transparency in how our online document tools protect your confidential data.',
      sections: [
        {
          id: 'processing',
          title: '1. In-Browser Client-Side Processing',
          content:
            'All PDF merging and page manipulation occurs directly inside your local browser using client-side execution. Your documents, images, and confidential files are never uploaded to, transmitted across, or stored on external remote servers.',
        },
        {
          id: 'telemetry',
          title: '2. Zero Telemetry & No Document Logging',
          content:
            'We do not monitor, store, or inspect document metadata, filenames, text content, or file sizes. When you finish your session or close the browser tab, all allocated memory is immediately cleared.',
        },
        {
          id: 'compliance',
          title: '3. Regulatory Compliance (GDPR, CCPA, HIPAA)',
          content:
            'Because documents never leave your local device, using this service complies with GDPR data sovereignty rules, CCPA privacy rights, and strict HIPAA security requirements for confidential personal health records.',
        },
      ],
    },
    termsOfService: {
      title: 'Terms of Service',
      lastUpdated: 'October 2026',
      introduction:
        'These Terms of Service govern your access to and use of our web-based PDF merging utility.',
      sections: [
        {
          id: 'acceptance',
          title: '1. Acceptance of Terms',
          content:
            'By accessing or using this website, you agree to comply with all applicable local, national, and international laws. Our service is provided free of charge for personal, educational, and business use.',
        },
        {
          id: 'acceptable-use',
          title: '2. Permitted Use',
          content:
            'You are free to combine, arrange, and manage documents for personal or commercial projects. You agree not to reverse-engineer, exploit vulnerabilities, or use automated scrapers to degrade service availability for other users.',
        },
        {
          id: 'liability',
          title: '3. Disclaimer & Limitation of Liability',
          content:
            'The service is provided on an "as is" and "as available" basis without warranties of any kind. We strive for 100% document integrity and recommend keeping local backups of your original source files.',
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookies Policy',
      lastUpdated: 'October 2026',
      introduction:
        'This policy explains how our website uses essential browser storage to preserve your preferences without third-party tracking.',
      sections: [
        {
          id: 'essential',
          title: '1. Essential Local Storage Only',
          content:
            'We use local storage strictly for essential user session states, such as preserving your account login status and UI theme preferences. We do not use third-party behavioral tracking or advertising cookies.',
        },
        {
          id: 'control',
          title: '2. Managing Browser Storage',
          content:
            'You can clear your local storage and cookies at any time via your browser settings. Clearing storage will log you out of your current session.',
        },
      ],
    },
  },

  seo: {
    seoTitle: 'Merge PDF files',
    metaDescription:
      'Select multiple files, arrange their positions, and merge them in seconds. Easily combine PDF files online for free.',
    h1: 'Merge PDF Files Online for Free',
    h2: 'Combine Multiple PDF Files into One Document',
    h3: 'How to Merge PDF Files Online',
    keywords:
      'Merge PDF, Merge PDF Files Online, Combine PDF Files, Free PDF Merger, Combine PDF Documents, Merge Multiple PDFs, PDF Merger Online',
    urlSlug: '/merge-pdf/',
  },

  adminUsername: 'admin',
  adminPasswordHash: 'admin123',
};

// Retrieve current configuration
export function getSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SITE_CONFIG);
    if (!raw) return DEFAULT_SITE_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_CONFIG,
      ...parsed,
      socialLinks: { ...DEFAULT_SITE_CONFIG.socialLinks, ...(parsed.socialLinks || {}) },
      socialVisibility: { ...DEFAULT_SITE_CONFIG.socialVisibility, ...(parsed.socialVisibility || {}) },
      seo: { ...DEFAULT_SITE_CONFIG.seo, ...(parsed.seo || {}) },
      legalPages: {
        privacyPolicy: {
          ...DEFAULT_SITE_CONFIG.legalPages.privacyPolicy,
          ...(parsed.legalPages?.privacyPolicy || {}),
        },
        termsOfService: {
          ...DEFAULT_SITE_CONFIG.legalPages.termsOfService,
          ...(parsed.legalPages?.termsOfService || {}),
        },
        cookiesPolicy: {
          ...DEFAULT_SITE_CONFIG.legalPages.cookiesPolicy,
          ...(parsed.legalPages?.cookiesPolicy || {}),
        },
      },
    };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

// Save configuration and broadcast updates
export function saveSiteConfig(config: SiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_SITE_CONFIG, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('siteConfigUpdated', { detail: config }));
  } catch (e) {
    console.error('Failed to save site config:', e);
  }
}

// Reset to initial defaults
export function resetSiteConfigToDefaults(): SiteConfig {
  saveSiteConfig(DEFAULT_SITE_CONFIG);
  return DEFAULT_SITE_CONFIG;
}

// Authentication for site owner
export function verifySiteOwnerCredentials(username: string, passwordAttempt: string): boolean {
  const config = getSiteConfig();
  const cleanUser = username.trim().toLowerCase();
  const isMatchUser = cleanUser === 'admin' || cleanUser === config.adminUsername.toLowerCase() || cleanUser === 'admin@pdfmerge.com';
  return isMatchUser && passwordAttempt === config.adminPasswordHash;
}

export function isSiteOwnerLoggedIn(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_OWNER_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setSiteOwnerLoggedIn(isLoggedIn: boolean): void {
  try {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEY_OWNER_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_OWNER_AUTH);
    }
    window.dispatchEvent(new CustomEvent('ownerAuthChanged', { detail: isLoggedIn }));
  } catch (e) {
    console.error('Error updating site owner session:', e);
  }
}

// Password modification for site owner
export function updateSiteOwnerPassword(
  currentPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const config = getSiteConfig();

  if (currentPassword !== config.adminPasswordHash) {
    return {
      success: false,
      error: 'Current password does not match. Please verify your existing password.',
    };
  }

  if (!newPassword || newPassword.length < 6) {
    return {
      success: false,
      error: 'New password must be at least 6 characters long.',
    };
  }

  const updatedConfig: SiteConfig = {
    ...config,
    adminPasswordHash: newPassword,
  };

  saveSiteConfig(updatedConfig);
  return { success: true };
}
