export default async function handler(req: any, res: any) {
  try {
    let targetUrl = ((req.query?.url as string) || '').trim();
    if (!targetUrl && req.url) {
      try {
        const parsed = new URL(req.url, 'http://localhost');
        targetUrl = (parsed.searchParams.get('url') || '').trim();
      } catch {}
    }

    if (!targetUrl) {
      return res.status(400).json({ error: 'A valid document URL is required' });
    }

    // Auto prepend https:// if missing
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Convert common file sharing URLs to direct download links
    // 1. Google Drive view/share link -> direct download link
    const gDriveMatch = targetUrl.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    if (gDriveMatch && gDriveMatch[1]) {
      targetUrl = `https://drive.google.com/uc?export=download&id=${gDriveMatch[1]}`;
    }

    // 2. Dropbox share link -> direct download link (dl=1)
    if (targetUrl.includes('dropbox.com')) {
      if (targetUrl.includes('dl=0')) {
        targetUrl = targetUrl.replace('dl=0', 'dl=1');
      } else if (!targetUrl.includes('dl=1')) {
        targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'dl=1';
      }
    }

    // 3. GitHub blob link -> raw link
    const githubBlobMatch = targetUrl.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)/);
    if (githubBlobMatch) {
      targetUrl = `https://raw.githubusercontent.com/${githubBlobMatch[1]}/${githubBlobMatch[2]}/${githubBlobMatch[3]}`;
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/pdf,image/*,*/*',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Remote server returned HTTP ${response.status} (${response.statusText})` });
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 20 * 1024 * 1024) {
      return res.status(413).json({ error: 'Remote file exceeds the 20 MB size limit' });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > 20 * 1024 * 1024) {
      return res.status(413).json({ error: 'Remote file exceeds the 20 MB size limit' });
    }

    const buffer = Buffer.from(arrayBuffer);

    // Determine clean filename
    let filename = '';
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*?=['"]?(?:UTF-8'')?([^"';]+)['"]?/i);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1].trim());
      }
    }
    if (!filename) {
      try {
        const parsed = new URL(targetUrl);
        const base = parsed.pathname.split('/').filter(Boolean).pop();
        if (base && base.includes('.')) {
          filename = decodeURIComponent(base.split('?')[0].split('#')[0]);
        }
      } catch {}
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Type, Content-Length, X-Filename');
    if (filename) {
      res.setHeader('X-Filename', encodeURIComponent(filename));
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.send(buffer);
  } catch (err: any) {
    console.error('File proxy error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch remote document' });
  }
}
