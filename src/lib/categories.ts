export const CATEGORIES = ["Coffee", "Books", "Autumn", "Thoughts", "Art"] as const;

export type Category = (typeof CATEGORIES)[number];
