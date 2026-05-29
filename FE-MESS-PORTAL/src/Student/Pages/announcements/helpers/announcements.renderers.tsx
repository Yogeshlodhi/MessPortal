import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import type { IAnnouncement } from 'Common/types/domain.types';

const RELATIVE_UNITS: ReadonlyArray<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const formatAbsolute = (iso: string): string => new Date(iso).toLocaleString();

const getRelativeTime = (iso: string): string => {
  const diffSeconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    if (absSeconds >= secondsInUnit || unit === 'second') {
      return relativeFormatter.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }
  return relativeFormatter.format(0, 'second');
};

export const renderAnnouncementCards = (items: ReadonlyArray<IAnnouncement>) =>
  _map(items, (item) => (
    <Card key={item._id} className='announcementsWrapper__card'>
      <CardContent className='announcementsWrapper__cardContent'>
        <Box className='announcementsWrapper__cardHeader'>
          <Box className='announcementsWrapper__icon'>
            <CampaignOutlinedIcon fontSize='small' />
          </Box>
          <Typography variant='semiBoldLabelL' component='h3'>
            {item.heading}
          </Typography>
        </Box>
        <Typography variant='textM' className='announcementsWrapper__description'>
          {item.description}
        </Typography>
        {item.createdAt && (
          <Tooltip title={formatAbsolute(item.createdAt)} arrow>
            <Box className='announcementsWrapper__date'>
              <AccessTimeOutlinedIcon fontSize='inherit' />
              <Typography variant='subtextS' component='span'>
                {getRelativeTime(item.createdAt)}
              </Typography>
            </Box>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  ));
