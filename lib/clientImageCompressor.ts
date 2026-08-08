/**
 * Compresses an image file on the client side using HTML5 Canvas before uploading to server.
 * Reduces raw 5-20MB photos to ~200-500KB WebP images, preventing HTTP 413 (Payload Too Large) errors on Vercel.
 */
export async function compressImageClient(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.82
): Promise<File> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const isRasterImage =
    file.type.startsWith('image/') ||
    ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext);

  // Skip videos, gifs, svgs, or non-raster images
  if (!isRasterImage || ext === 'gif' || ext === 'svg' || file.type.includes('gif') || file.type.includes('svg')) {
    return file;
  }

  return new Promise((resolve) => {
    let resolved = false;
    const safeResolve = (resFile: File) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      resolve(resFile);
    };

    const timer = setTimeout(() => {
      safeResolve(file);
    }, 3000);

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      try {
      let width = img.width;
      let height = img.height;

      // Downscale if dimensions exceed limits
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        safeResolve(file);
        return;
      }

      // Smooth canvas image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            safeResolve(file);
            return;
          }

          // Use compressed file if it reduced size
          if (blob.size < file.size) {
            const cleanName = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const compressedFile = new File([blob], `${cleanName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            safeResolve(compressedFile);
          } else {
            safeResolve(file);
          }
        },
        'image/webp',
        quality
      );
      } catch (err) {
        safeResolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      safeResolve(file);
    };

    img.src = url;
  });
}
