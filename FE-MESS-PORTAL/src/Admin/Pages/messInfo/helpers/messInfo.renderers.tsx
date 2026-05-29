import _map from 'lodash/map';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import type { IMessContact } from 'Common/types/domain.types';

export const renderContactCards = (contacts: ReadonlyArray<IMessContact>) =>
  _map(contacts, (contact, idx) => (
    <Card key={`${contact.emailId}-${idx}`} className='adminMessInfoWrapper__contactCard'>
      <CardContent className='adminMessInfoWrapper__contactContent'>
        <Box className='adminMessInfoWrapper__contactHeader'>
          <Box className='adminMessInfoWrapper__contactAvatar'>
            <BadgeOutlinedIcon fontSize='small' />
          </Box>
          <Typography variant='semiBoldLabelL' component='h3'>
            {contact.role}
          </Typography>
        </Box>

        <Box className='adminMessInfoWrapper__contactRow'>
          <PhoneOutlinedIcon fontSize='small' className='adminMessInfoWrapper__contactIcon' />
          <Typography
            variant='textM'
            component='a'
            href={`tel:${contact.contactNo}`}
            className='adminMessInfoWrapper__contactValue'
          >
            {contact.contactNo}
          </Typography>
        </Box>

        <Box className='adminMessInfoWrapper__contactRow'>
          <EmailOutlinedIcon fontSize='small' className='adminMessInfoWrapper__contactIcon' />
          <Typography
            variant='textM'
            component='a'
            href={`mailto:${contact.emailId}`}
            className='adminMessInfoWrapper__contactValue'
          >
            {contact.emailId}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));
