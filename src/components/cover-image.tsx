import Image from "next/image";
import { Coffee, BookOpen, TreePine, NotebookPen, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/categories";
import type { ComponentType } from "react";

const CATEGORY_PLACEHOLDER: Record<
  Category,
  { icon: ComponentType<{ className?: string }>; gradient: string }
> = {
  Coffee: { icon: Coffee, gradient: "gradient-coffee" },
  Books: { icon: BookOpen, gradient: "gradient-books" },
  Autumn: { icon: TreePine, gradient: "gradient-autumn" },
  Thoughts: { icon: NotebookPen, gradient: "gradient-thoughts" },
  Art: { icon: Paintbrush, gradient: "gradient-art" },
};

interface CoverImageProps {
  src?: string | null;
  alt: string;
  category: Category;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function CoverImage({ src, alt, category, className, priority, sizes }: CoverImageProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-muted", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  const { icon: Icon, gradient } = CATEGORY_PLACEHOLDER[category];

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("flex items-center justify-center overflow-hidden rounded-lg", gradient, className)}
    >
      <Icon className="h-10 w-10 text-background/70" />
    </div>
  );
}
