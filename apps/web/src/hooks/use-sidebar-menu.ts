import { useState } from "react";
import { Home, Factory, UserPen, Settings } from "lucide-react";
import type { MenuType } from "@/types/sidebar";

// static, English-only sidebar template
const menuTemplate: MenuType[] = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
    items: null,
    isActive: true,
  },
  {
    title: "Workspace",
    url: "#",
    icon: Factory,
    isActive: false,
    items: [
      { title: "Products",        url: "/dashboard/products",       isActive: false },
    ],
  },
  {
    title: "My Account",
    url: "#",
    icon: UserPen,
    isActive: false,
    items: [
      { title: "Subscription",     url: "/dashboard/subscription",    isActive: false },
      { title: "Manage Account",   url: "/dashboard/manage-account",  isActive: false },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    isActive: false,
    items: [
      { title: "General Settings", url: "/dashboard/general-settings", isActive: false },
    ],
  },
];

/**
 * A hook providing the sidebar menu items and a setter for activation logic.
 */
export function useSidebarMenu() {
  const [data, setData] = useState<MenuType[]>(menuTemplate);
  return { data, setData };
}
