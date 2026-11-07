/**
 * Homepage photo C is the offer image (`workshop-breathwork-c.webp`).
 * It is full width of the padded container below `lg`, then one column of
 * the two-column grid. Without `sizes`, next/image builds a 1x/2x srcset
 * from the 1536px intrinsic width, and phones request the 2x file.
 */
export const HOMEPAGE_PHOTO_C_SIZES =
  "(min-width: 1536px) calc((1536px - 3rem - 4rem) / 2), (min-width: 1280px) calc((1280px - 3rem - 4rem) / 2), (min-width: 1024px) calc((1024px - 3rem - 4rem) / 2), (min-width: 768px) calc(768px - 3rem), (min-width: 640px) calc(640px - 3rem), calc(100vw - 3rem)";
