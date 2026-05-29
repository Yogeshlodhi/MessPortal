import type { ReactNode } from 'react';

export interface IHcEmptyStateProps {
  renderIcon?: ReactNode;
  renderText?: ReactNode;
  renderSubText?: ReactNode;
  primaryButtonTitle?: string;
  onPrimaryClick?: () => void;
  secondaryButtonTitle?: string;
  onSecondaryClick?: () => void;
}
