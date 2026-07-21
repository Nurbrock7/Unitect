// Product image resolution.
//
// Images arrive in two shapes: Supabase returns an `images` text array, while
// the static fallback data carries a single `image` string. Everything that
// renders a product image goes through here so both paths behave the same.

export type ProductImageSource = {
  images?: unknown;
  image?: unknown;
  cataloguePage?: unknown;
  catalogue_page?: unknown;
};

function toPath(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/** Every product photo, most representative first. Empty when none are set. */
export function productImages(product: ProductImageSource): string[] {
  const fromArray = Array.isArray(product.images)
    ? product.images.map(toPath).filter((p): p is string => Boolean(p))
    : [];

  const single = toPath(product.image);
  if (single && !fromArray.includes(single)) {
    return [single, ...fromArray];
  }

  return fromArray;
}

/** The single image to use for cards and thumbnails. */
export function primaryProductImage(
  product: ProductImageSource
): string | undefined {
  return productImages(product)[0];
}

/** Scanned catalogue page backing this product, if one is mapped. */
export function cataloguePage(
  product: ProductImageSource
): string | undefined {
  return toPath(product.cataloguePage) ?? toPath(product.catalogue_page);
}
