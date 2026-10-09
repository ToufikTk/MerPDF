import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { UploadedFileItem } from '../types';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Creates an in-memory sample PDF file for testing
 */
export async function createSamplePdf(
  title: string,
  docType: string,
  color: [number, number, number] = [0.1, 0.4, 0.8]
): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  // Top header bar
  page.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: rgb(color[0], color[1], color[2]),
  });

  page.drawText('PDF DOCUMENT', {
    x: 40,
    y: height - 50,
    size: 20,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText(docType.toUpperCase(), {
    x: width - 180,
    y: height - 48,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  // Body Content
  page.drawText(title, {
    x: 40,
    y: height - 130,
    size: 24,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  page.drawText(`Date created: ${currentDate}`, {
    x: 40,
    y: height - 160,
    size: 11,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText('This sample document is generated dynamically by the PDF client engine.', {
    x: 40,
    y: height - 200,
    size: 13,
    font: font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('It demonstrates seamless browser-side PDF combining, page arrangement,', {
    x: 40,
    y: height - 225,
    size: 13,
    font: font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('and lossless vector preserving without sending files to external servers.', {
    x: 40,
    y: height - 250,
    size: 13,
    font: font,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Sample Table Box
  page.drawRectangle({
    x: 40,
    y: height - 400,
    width: width - 80,
    height: 120,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
    color: rgb(0.97, 0.98, 0.99),
  });

  page.drawText('Item Description', {
    x: 60,
    y: height - 315,
    size: 11,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Status', {
    x: 350,
    y: height - 315,
    size: 11,
    font: boldFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('1. Document Verification & Integrity Check', {
    x: 60,
    y: height - 345,
    size: 10,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText('Verified', {
    x: 350,
    y: height - 345,
    size: 10,
    font: font,
    color: rgb(0.1, 0.6, 0.2),
  });

  page.drawText('2. Standard ISO 32000 Conformance', {
    x: 60,
    y: height - 370,
    size: 10,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText('Compliant', {
    x: 350,
    y: height - 370,
    size: 10,
    font: font,
    color: rgb(0.1, 0.6, 0.2),
  });

  // Footer
  page.drawLine({
    start: { x: 40, y: 50 },
    end: { x: width - 40, y: 50 },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });

  page.drawText('Page 1 of 1 • Generated for PDF Online Merge Tool', {
    x: 40,
    y: 35,
    size: 9,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
  return new File([blob], filename, { type: 'application/pdf' });
}

/**
 * Inspect page count of a PDF file
 */
export async function getPdfPageCount(file: File): Promise<number> {
  try {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      return pdfDoc.getPageCount();
    }
    // For images, treat as 1 page
    if (file.type.startsWith('image/')) {
      return 1;
    }
  } catch (err) {
    console.warn('Could not read page count:', err);
  }
  return 1;
}

/**
 * Merge an array of UploadedFileItems into a single PDF
 */
export async function mergePdfFiles(
  items: UploadedFileItem[],
  onProgress?: (progress: number) => void
): Promise<{ blob: Blob; url: string; totalPages: number; size: number }> {
  const mergedDoc = await PDFDocument.create();
  let totalPages = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const buffer = await item.file.arrayBuffer();

    if (item.file.type === 'application/pdf' || item.name.toLowerCase().endsWith('.pdf')) {
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pageIndices = srcDoc.getPageIndices();
      const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);

      for (const page of copiedPages) {
        if (item.rotation) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + item.rotation) % 360));
        }
        mergedDoc.addPage(page);
        totalPages++;
      }
    } else if (item.file.type.startsWith('image/')) {
      // Embed Image as a page
      let embeddedImage;
      if (item.file.type === 'image/jpeg' || item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg')) {
        embeddedImage = await mergedDoc.embedJpg(buffer);
      } else {
        embeddedImage = await mergedDoc.embedPng(buffer);
      }

      const imgWidth = embeddedImage.width;
      const imgHeight = embeddedImage.height;

      // Scale to fit standard A4 or image aspect ratio
      const a4Width = 595.28;
      const a4Height = 841.89;

      const scale = Math.min(a4Width / imgWidth, a4Height / imgHeight, 1);
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      const page = mergedDoc.addPage([a4Width, a4Height]);
      const x = (a4Width - scaledWidth) / 2;
      const y = (a4Height - scaledHeight) / 2;

      page.drawImage(embeddedImage, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });

      if (item.rotation) {
        page.setRotation(degrees(item.rotation % 360));
      }

      totalPages++;
    }

    if (onProgress) {
      onProgress(Math.round(((i + 1) / items.length) * 100));
    }
  }

  const mergedBytes = await mergedDoc.save();
  const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    totalPages,
    size: mergedBytes.length,
  };
}
