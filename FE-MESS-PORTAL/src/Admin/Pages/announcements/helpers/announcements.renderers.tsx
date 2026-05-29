import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { IAnnouncement } from 'Common/types/domain.types';
import type { Permission } from 'Rbac/roles';
import { ANNOUNCEMENT_DELETE_LABEL } from '../constants/announcements.general';

export const renderAdminAnnouncementCards = (
  items: ReadonlyArray<IAnnouncement>,
  canDelete: (perm: Permission) => boolean,
  deletePerm: Permission,
  onDelete: (id: string) => void,
) =>
  _map(items, (item) => (
    <Card key={item._id} className='adminAnnouncementsWrapper__card'>
      <CardContent>
        <Typography variant='headingS' component='h3'>
          {item.heading}
        </Typography>
        <Typography variant='textM' className='adminAnnouncementsWrapper__description'>
          {item.description}
        </Typography>
        {item.createdAt && (
          <Typography variant='subtextS' className='adminAnnouncementsWrapper__date'>
            {new Date(item.createdAt).toLocaleString()}
          </Typography>
        )}
        {canDelete(deletePerm) && (
          <Box className='adminAnnouncementsWrapper__actions'>
            <Button color='error' size='small' variant='outlined' onClick={() => onDelete(item._id)}>
              {ANNOUNCEMENT_DELETE_LABEL}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  ));
