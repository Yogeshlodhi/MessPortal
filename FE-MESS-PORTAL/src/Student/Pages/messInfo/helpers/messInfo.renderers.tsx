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
    <Card key={`${contact.emailId}-${idx}`} className='studentMessInfoWrapper__contactCard'>
      <CardContent className='studentMessInfoWrapper__contactContent'>
        <Box className='studentMessInfoWrapper__contactHeader'>
          <Box className='studentMessInfoWrapper__contactAvatar'>
            <BadgeOutlinedIcon fontSize='small' />
          </Box>
          <Typography variant='semiBoldLabelL' component='h3'>
            {contact.role}
          </Typography>
        </Box>

        <Box className='studentMessInfoWrapper__contactRow'>
          <PhoneOutlinedIcon fontSize='small' className='studentMessInfoWrapper__contactIcon' />
          <Typography
            variant='textM'
            component='a'
            href={`tel:${contact.contactNo}`}
            className='studentMessInfoWrapper__contactValue'
          >
            {contact.contactNo}
          </Typography>
        </Box>

        <Box className='studentMessInfoWrapper__contactRow'>
          <EmailOutlinedIcon fontSize='small' className='studentMessInfoWrapper__contactIcon' />
          <Typography
            variant='textM'
            component='a'
            href={`mailto:${contact.emailId}`}
            className='studentMessInfoWrapper__contactValue'
          >
            {contact.emailId}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));
