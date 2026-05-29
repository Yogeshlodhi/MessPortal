import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import RHFormElement from 'Common/Components/RHFormElement';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import { useMessInfoEditor } from './hooks/useMessInfoEditor';
import { renderContactCards } from './helpers/messInfo.renderers';

import {
  MESS_INFO_ADD_CONTACT_LABEL,
  MESS_INFO_CANCEL_LABEL,
  MESS_INFO_CREATE_LABEL,
  MESS_INFO_EDIT_LABEL,
  MESS_INFO_SAVE_LABEL,
  MESS_INFO_TITLE,
} from './constants/messInfo.general';

import './messInfo.scss';

const formatDate = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const MessInfo = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isEditing,
    setIsEditing,
    infoForm,
    onSubmitInfo,
    isSavingInfo,
    contactForm,
    onSubmitContact,
    isAddingContact,
  } = useMessInfoEditor();
  const { has } = usePermission();
  const canEdit = has(PERMISSION.ADD_MESS_INFO) || has(PERMISSION.UPDATE_MESS_INFO);
  const canAddContact = has(PERMISSION.ADD_MESS_INFO_CONTACT);

  if (isLoading) return <LoadingSkeleton count={5} height={56} />;
  if (error) return <ApiError refetch={refetch} />;

  if (!data && !isEditing) {
    return (
      <HcEmptyState
        renderText='No mess information yet'
        renderSubText='Create the mess information record.'
        primaryButtonTitle={canEdit ? MESS_INFO_CREATE_LABEL : undefined}
        onPrimaryClick={canEdit ? () => setIsEditing(true) : undefined}
      />
    );
  }

  return (
    <Box className='adminMessInfoWrapper'>
      <Box className='adminMessInfoWrapper__header'>
        <Typography variant='headingL' component='h1'>
          {MESS_INFO_TITLE}
        </Typography>
        {canEdit && !isEditing && data && (
          <Button variant='outlined' onClick={() => setIsEditing(true)}>
            {MESS_INFO_EDIT_LABEL}
          </Button>
        )}
      </Box>

      {isEditing ? (
        <Card>
          <CardContent>
            <Box
              component='form'
              onSubmit={onSubmitInfo}
              className='adminMessInfoWrapper__form'
              noValidate
            >
              <RHFormElement
                control={infoForm.control}
                name='mealPrice'
                mode='text'
                label='Meal Price'
                error={infoForm.formState.errors.mealPrice}
              />
              <RHFormElement
                control={infoForm.control}
                name='messOwner'
                mode='text'
                label='Mess Owner'
                error={infoForm.formState.errors.messOwner}
              />
              <RHFormElement
                control={infoForm.control}
                name='tenureStarts'
                mode='date'
                label='Tenure Starts'
                error={infoForm.formState.errors.tenureStarts}
              />
              <RHFormElement
                control={infoForm.control}
                name='tenureEnds'
                mode='date'
                label='Tenure Ends'
                error={infoForm.formState.errors.tenureEnds}
              />
              <RHFormElement
                control={infoForm.control}
                name='contractInfo'
                mode='textarea'
                label='Contract Info'
                error={infoForm.formState.errors.contractInfo}
              />
              <Box className='adminMessInfoWrapper__actions'>
                <Button
                  variant='outlined'
                  onClick={() => setIsEditing(false)}
                  disabled={isSavingInfo}
                >
                  {MESS_INFO_CANCEL_LABEL}
                </Button>
                <Button type='submit' variant='contained' disabled={isSavingInfo}>
                  {isSavingInfo ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : (
                    MESS_INFO_SAVE_LABEL
                  )}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        data && (
          <Card>
            <CardContent>
              <Box className='adminMessInfoWrapper__readonly'>
                <Box className='adminMessInfoWrapper__field'>
                  <Typography
                    variant='semiBoldLabelS'
                    component='span'
                    className='adminMessInfoWrapper__fieldLabel'
                  >
                    Mess Owner
                  </Typography>
                  <Typography variant='semiBoldLabelL' component='span'>
                    {data.messOwner}
                  </Typography>
                </Box>
                <Box className='adminMessInfoWrapper__field'>
                  <Typography
                    variant='semiBoldLabelS'
                    component='span'
                    className='adminMessInfoWrapper__fieldLabel'
                  >
                    Meal Price
                  </Typography>
                  <Typography variant='semiBoldLabelL' component='span'>
                    ₹ {data.mealPrice}
                    <Typography
                      variant='subtextS'
                      component='span'
                      className='adminMessInfoWrapper__unit'
                    >
                      {' '}
                      / day
                    </Typography>
                  </Typography>
                </Box>
                <Box className='adminMessInfoWrapper__field'>
                  <Typography
                    variant='semiBoldLabelS'
                    component='span'
                    className='adminMessInfoWrapper__fieldLabel'
                  >
                    Tenure
                  </Typography>
                  <Typography variant='semiBoldLabelL' component='span'>
                    {formatDate(data.tenureStarts)} – {formatDate(data.tenureEnds)}
                  </Typography>
                </Box>
                <Box className='adminMessInfoWrapper__field adminMessInfoWrapper__contractInfo'>
                  <Typography
                    variant='semiBoldLabelS'
                    component='span'
                    className='adminMessInfoWrapper__fieldLabel'
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
        )
      )}

      {data && (
        <>
          <Typography variant='headingS' component='h2'>
            Contacts
          </Typography>
          {data.contacts.length === 0 ? (
            <Typography variant='textM' className='adminMessInfoWrapper__noContacts'>
              No contacts yet.
            </Typography>
          ) : (
            <Box className='adminMessInfoWrapper__contactGrid'>
              {renderContactCards(data.contacts)}
            </Box>
          )}

          {canAddContact && (
            <Card>
              <CardContent>
                <Typography variant='headingS' component='h3'>
                  {MESS_INFO_ADD_CONTACT_LABEL}
                </Typography>
                <Box
                  component='form'
                  onSubmit={onSubmitContact}
                  className='adminMessInfoWrapper__contactForm'
                  noValidate
                >
                  <RHFormElement
                    control={contactForm.control}
                    name='role'
                    mode='text'
                    label='Role'
                    error={contactForm.formState.errors.role}
                  />
                  <RHFormElement
                    control={contactForm.control}
                    name='contactNo'
                    mode='text'
                    label='Contact No'
                    error={contactForm.formState.errors.contactNo}
                  />
                  <RHFormElement
                    control={contactForm.control}
                    name='emailId'
                    mode='text'
                    label='Email'
                    error={contactForm.formState.errors.emailId}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isAddingContact}
                    className='adminMessInfoWrapper__contactSubmit'
                  >
                    {isAddingContact ? (
                      <CircularProgress size={20} color='inherit' />
                    ) : (
                      MESS_INFO_ADD_CONTACT_LABEL
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default MessInfo;
