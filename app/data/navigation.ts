import type { ComponentType, SVGProps } from "react";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type TeamItem = {
  id: number;
  name: string;
  href: string;
  initial: string;
};

export const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
];

export const teams: TeamItem[] = [
  { id: 1, name: "Heroicons", href: "/teams/heroicons", initial: "H" },
  { id: 2, name: "Tailwind Labs", href: "/teams/tailwind-labs", initial: "T" },
  { id: 3, name: "Workcation", href: "/teams/workcation", initial: "W" },
];
