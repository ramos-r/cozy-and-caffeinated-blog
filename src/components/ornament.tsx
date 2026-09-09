import { Leaf } from "lucide-react";

export function Ornament() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3 text-muted-foreground"
    >
      <span className="h-px w-10 bg-border" />
      <Leaf className="h-4 w-4" />
      <span className="h-px w-10 bg-border" />
    </div>
  );
}
