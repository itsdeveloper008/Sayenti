import Image from "next/image";
import { brandLogo } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fixed display boxes. The artwork is contained inside its box, so replacing
 * `brandLogo.src` with a different shape never stretches it or shifts layout.
 * Current mark aspect ≈ 3.84:1 (845×220).
 */
const SIZES = {
  sm: { box: "h-7 w-[108px]", sizes: "216px" },
  md: { box: "h-8 w-[124px]", sizes: "248px" },
  lg: { box: "h-10 w-[156px]", sizes: "312px" },
} as const;

export function Logo({
  size = "md",
  priority = false,
  className,
}: {
  size?: keyof typeof SIZES;
  priority?: boolean;
  className?: string;
}) {
  const { box, sizes } = SIZES[size];

  return (
    <span className={cn("relative block shrink-0", box, className)}>
      <Image
        src={brandLogo.src}
        alt={brandLogo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
