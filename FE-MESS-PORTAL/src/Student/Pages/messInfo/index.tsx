import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import { useGetStudentMessInfoQuery } from 'Redux/Slices/Common/MessInfoApi';

import { renderContactCards } from './helpers/messInfo.renderers';

import './messInfo.scss';

const formatDate = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const MessInfo = () => {
  const { data, isLoading, error, refetch } = useGetStudentMessInfoQuery();

  if (isLoading) return <LoadingSkeleton count={4} height={64} />;
  if (error) return <ApiError refetch={refetch} />;
  if (!data) {
    return (
      <HcEmptyState
        renderText='No mess information available'
        renderSubText='The admin has not published mess information yet.'
      />
    );
  }

  return (
    <Box className='studentMessInfoWrapper'>
      <Typography variant='headingL' component='h1'>
        Mess Information
      </Typography>

      <Card>
        <CardContent>
          <Box className='studentMessInfoWrapper__grid'>
            <Box className='studentMessInfoWrapper__field'>
              <Typography
                variant='semiBoldLabelS'
                component='span'
                className='studentMessInfoWrapper__fieldLabel'
              >
                Mess Owner
              </Typography>
              <Typography variant='semiBoldLabelL' component='span'>
                {data.messOwner}
              </Typography>
            </Box>

            <Box className='studentMessInfoWrapper__field'>
              <Typography
                variant='semiBoldLabelS'
                component='span'
                className='studentMessInfoWrapper__fieldLabel'
              >
                Meal Price
              </Typography>
              <Typography variant='semiBoldLabelL' component='span'>
                ₹ {data.mealPrice}
                <Typography
                  variant='subtextS'
                  component='span'
                  className='studentMessInfoWrapper__unit'
                >
                  {' '}
                  / day
                </Typography>
              </Typography>
            </Box>

            <Box className='studentMessInfoWrapper__field'>
              <Typography
                variant='semiBoldLabelS'
                component='span'
                className='studentMessInfoWrapper__fieldLabel'
              >
                Tenure
              </Typography>
              <Typography variant='semiBoldLabelL' component='span'>
                {formatDate(data.tenureStarts)} – {formatDate(data.tenureEnds)}
              </Typography>
            </Box>

            <Box className='studentMessInfoWrapper__field studentMessInfoWrapper__contractInfo'>
              <Typography
                variant='semiBoldLabelS'
                component='span'
                className='studentMessInfoWrapper__fieldLabel'
              >
                Contract Info
              </Typography>
              <Typography variant='textL' component='span'>
                {data.contractInfo}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant='headingS' component='h2'>
        Contacts
      </Typography>
      {data.contacts.length === 0 ? (
        <Typography variant='textM' className='studentMessInfoWrapper__noContacts'>
          No contacts listed.
        </Typography>
      ) : (
        <Box className='studentMessInfoWrapper__contactGrid'>
          {renderContactCards(data.contacts)}
        </Box>
      )}
    </Box>
  );
};

export default MessInfo;
