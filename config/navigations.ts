import { NavItem } from "@/types";

export const navigationConfig: NavItem[] = [
  { id: 1, name: "Beranda", href: "/dashboard" },
  { id: 2, name: "Tentang", href: "/about" },
  { id: 3, name: "Paketan", href: "/pricing" },
];

export const footerConfig: NavItem[] = [
  { id: 1, name: "Beranda", href: "/dashboard" },
  { id: 2, name: "Tentang", href: "/about" },
  { id: 3, name: "Paketan", href: "/pricing" },
  {
    id: 4,
    name: "Kebijakan Privasi",
    href: "/site-policy/kerjatim-privacy-statement",
  },
  {
    id: 5,
    name: "Syarat & Ketentuan",
    href: "/site-policy/kerjatim-term",
  },
];
