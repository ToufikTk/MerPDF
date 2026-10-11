import { pdfjsLib } from './pdfSetup';

/**
 * Generates a thumbnail Data URL from the first page of a PDF file
 */
export async function generatePdfThumbnail(file: File): Promise<string | undefined> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    });

    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    // Get original dimensions and calculate thumbnail scale
    const originalViewport = page.getViewport({ scale: 1.0 });
    const targetWidth = 140; // High-DPI for 44px display
    const scale = Math.max(0.2, targetWidth / originalViewport.width);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext('2d');

    if (!context) return undefined;

    // Fill white background before rendering
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      canvas: canvas,
      viewport: viewport,
    }).promise;

    return canvas.toDataURL('image/jpeg', 0.85);
  } catch (err) {
    console.warn('Could not generate PDF thumbnail with pdfjs:', err);
    return undefined;
  }
}
