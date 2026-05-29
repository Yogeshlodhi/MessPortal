import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import './authShell.scss';

export type AuthVariant = 'student' | 'admin';

interface IAuthFeature {
  icon: ReactNode;
  text: string;
}

interface IAuthShellProps {
  variant?: AuthVariant;
  eyebrow: string;
  children: ReactNode;
}

const BRAND_COPY: Record<AuthVariant, { tagline: string; features: IAuthFeature[] }> = {
  student: {
    tagline: 'Everything your hostel mess needs, in one place.',
    features: [
      { icon: <EventAvailableOutlinedIcon />, text: 'Apply for leave in seconds' },
      { icon: <RateReviewOutlinedIcon />, text: 'Share feedback on every meal' },
      { icon: <CampaignOutlinedIcon />, text: 'Stay on top of menu & announcements' },
    ],
  },
  admin: {
    tagline: 'Run the mess with clarity and control.',
    features: [
      { icon: <GroupsOutlinedIcon />, text: 'Manage students, leaves & menus' },
      { icon: <ReportProblemOutlinedIcon />, text: 'Resolve complaints quickly' },
      { icon: <CampaignOutlinedIcon />, text: 'Publish announcements instantly' },
    ],
  },
};

/**
 * Shared split-screen chrome for the auth screens: a branded gradient panel
 * (hidden on small screens) beside the form card. `variant` switches the
 * accent + marketing copy between the student and admin experiences.
 */
const AuthShell = ({ variant = 'student', eyebrow, children }: IAuthShellProps) => {
  const { tagline, features } = BRAND_COPY[variant];

  return (
    <Box className={`authShell authShell--${variant}`}>
      <Box className='authShell__brand' aria-hidden>
        <Box className='authShell__brandInner'>
          <Box className='authShell__logo'>
            <RestaurantMenuOutlinedIcon fontSize='inherit' />
            <span>Mess Portal</span>
          </Box>
          <Typography variant='displayM' component='p' className='authShell__tagline'>
            {tagline}
          </Typography>
          <Box className='authShell__features'>
            {features.map((feature) => (
              <Box key={feature.text} className='authShell__feature'>
                <Box className='authShell__featureIcon'>{feature.icon}</Box>
                <Typography variant='textM'>{feature.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className='authShell__content'>
        <Box className='authShell__card'>
          <Typography variant='subtextM' component='span' className='authShell__eyebrow'>
            {eyebrow}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthShell;
