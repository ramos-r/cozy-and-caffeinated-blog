import { Home, User, Images, Camera, MessageCircle, Mail } from "lucide-react";

// lucide-react dropped brand/logo icons (Instagram, X/Twitter, etc.) — these
// generic icons stand in until Rebecca wants real brand marks instead.

export const siteConfig = {
  name: "Cozy & Caffeinated",
  url: "https://cozy-and-caffeinated.vercel.app",
  description:
    "Books, coffee and the softest season of the year — written slowly, on purpose.",
  tagline: "BOOKS · COFFEE · AUTUMN",
  topBarNote: "one more chapter, one more cup",
  nav: [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Gallery", href: "/gallery", icon: Images },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com", icon: Camera },
    { label: "X", href: "https://x.com", icon: MessageCircle },
    { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  ],
  footer: {
    quote: "Some seasons ask you to bloom. Autumn just asks you to slow down.",
    note: "COZY & CAFFEINATED · MADE WITH WARM HANDS",
  },
};
