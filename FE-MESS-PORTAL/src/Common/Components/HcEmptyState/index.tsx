import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

import type { IHcEmptyStateProps } from './constants/hcEmptyState.interfaces';

import './hcEmptyState.scss';

const HcEmptyState = ({
  renderIcon,
  renderText,
  renderSubText,
  primaryButtonTitle,
  onPrimaryClick,
  secondaryButtonTitle,
  onSecondaryClick,
}: IHcEmptyStateProps) => {
  const icon: ReactNode = renderIcon ?? <InboxOutlinedIcon className='hcEmptyStateWrapper__icon' />;
  return (
    <Box className='hcEmptyStateWrapper' role='status'>
      {icon}
      {renderText && (
        <Typography variant='headingS' component='h3'>
          {renderText}
        </Typography>
      )}
      {renderSubText && (
        <Typography variant='textM' className='hcEmptyStateWrapper__subtext'>
          {renderSubText}
        </Typography>
      )}
      {(primaryButtonTitle || secondaryButtonTitle) && (
        <Box className='hcEmptyStateWrapper__actions'>
          {secondaryButtonTitle && (
            <Button variant='outlined' onClick={onSecondaryClick}>
              {secondaryButtonTitle}
            </Button>
          )}
          {primaryButtonTitle && (
            <Button variant='contained' onClick={onPrimaryClick}>
              {primaryButtonTitle}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HcEmptyState;
