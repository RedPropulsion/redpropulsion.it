import Image, { type ImageProps } from "next/image";
import imageVariants from "@/lib/image-variants.json";

type Variant = { src: string; width: number };
const variants: Record<string, Variant[]> = imageVariants;

/** Static image variants work on GitHub Pages without an image server. */
export default function ResponsiveImage(props: ImageProps) {
  const available = typeof props.src === "string" ? variants[props.src] : undefined;
  if (!available?.length) return <Image {...props} alt={props.alt} />;
  return (
    <picture style={props.fill ? { position: "absolute", inset: 0 } : undefined}>
      <source type="image/webp" srcSet={available.map(image => `${image.src} ${image.width}w`).join(", ")} sizes={props.sizes ?? "100vw"} />
      <Image
        {...props}
        alt={props.alt}
        src={available[available.length - 1].src}
        priority={false}
        loading={props.priority ? "eager" : props.loading}
        fetchPriority={props.priority ? "high" : props.fetchPriority}
      />
    </picture>
  );
}
