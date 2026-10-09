export interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  pageCount?: number;
  rotation?: number; // 0, 90, 180, 270
  previewUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  bgColor: string;
  btnLabel: string;
}
