import type { ReactNode } from 'react';

export interface INavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

export interface IDashboardShellProps {
  navItems: ReadonlyArray<INavItem>;
  title: string;
}
