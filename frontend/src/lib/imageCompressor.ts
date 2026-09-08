/**
 * Utility to compress and resize image files client-side before upload.
 * Reduces network payloads and avoids upload file size limits.
 */
export async function compressImage(
  file: File,
  maxDimension = 1920,
  quality = 0.82
): Promise<File> {
  // If file is not an image (e.g., PDF/DOCX) or already small (< 150KB), return as is
  if (!file.type.startsWith("image/") || file.size < 150 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Downscale image while preserving aspect ratio if larger than maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output MIME type (use image/jpeg for png/jpg to get best compression, preserve webp)
        const outputType = file.type === "image/webp" ? "image/webp" : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // If compression didn't reduce file size, return original file
              resolve(file);
              return;
            }

            // Create new File from blob with original filename (adjust extension if converted to jpeg)
            let newFilename = file.name;
            if (outputType === "image/jpeg" && !/\.(jpe?g)$/i.test(newFilename)) {
              newFilename = newFilename.replace(/\.[^/.]+$/, "") + ".jpg";
            }

            const compressedFile = new File([blob], newFilename, {
              type: outputType,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          outputType,
          quality
        );
      };

      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an array of Files sequentially.
 */
export async function compressMultipleImages(
  files: File[],
  maxDimension = 1920,
  quality = 0.82
): Promise<File[]> {
  const compressedFiles: File[] = [];
  for (const file of files) {
    const compressed = await compressImage(file, maxDimension, quality);
    compressedFiles.push(compressed);
  }
  return compressedFiles;
}
