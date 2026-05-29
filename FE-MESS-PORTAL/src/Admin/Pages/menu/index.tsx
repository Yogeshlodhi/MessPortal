import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import ApiError from 'Common/Components/ApiError';
import HcEmptyState from 'Common/Components/HcEmptyState';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';
import MenuTable from 'Common/Components/MenuTable';
import { PERMISSION } from 'Rbac/roles';
import { usePermission } from 'Rbac/usePermission';

import MenuEditorForm from './components/menuEditorForm';
import { useMenuEditor } from './hooks/useMenuEditor';

import {
  ADMIN_MENU_CANCEL_LABEL,
  ADMIN_MENU_CREATE_LABEL,
  ADMIN_MENU_CREATE_TITLE,
  ADMIN_MENU_EDIT_LABEL,
  ADMIN_MENU_EDIT_TITLE,
  ADMIN_MENU_SAVE_LABEL,
  ADMIN_MENU_TITLE,
} from './constants/menu.general';

import './menu.scss';

const Menu = () => {
  const { menu, isLoading, error, refetch, isEditing, setIsEditing, control, errors, onSubmit, isSaving } =
    useMenuEditor();
  const { hasAny } = usePermission();
  const canEdit = hasAny([PERMISSION.UPLOAD_MENU, PERMISSION.UPDATE_MENU]);

  if (isLoading) return <LoadingSkeleton count={5} height={48} />;
  if (error) return <ApiError refetch={refetch} />;

  if (!menu && !isEditing) {
    return (
      <HcEmptyState
        renderText='No menu created yet'
        renderSubText='Create the weekly mess menu.'
        primaryButtonTitle={canEdit ? ADMIN_MENU_CREATE_LABEL : undefined}
        onPrimaryClick={canEdit ? () => setIsEditing(true) : undefined}
      />
    );
  }

  return (
    <Box className='adminMenuWrapper'>
      <Box className='adminMenuWrapper__header'>
        <Typography variant='headingL' component='h1'>
          {isEditing ? (menu ? ADMIN_MENU_EDIT_TITLE : ADMIN_MENU_CREATE_TITLE) : ADMIN_MENU_TITLE}
        </Typography>
        {canEdit && !isEditing && menu && (
          <Button variant='outlined' onClick={() => setIsEditing(true)}>
            {ADMIN_MENU_EDIT_LABEL}
          </Button>
        )}
      </Box>

      {isEditing ? (
        <Box component='form' onSubmit={onSubmit} className='adminMenuWrapper__form' noValidate>
          <MenuEditorForm control={control} errors={errors} />
          <Box className='adminMenuWrapper__actions'>
            <Button variant='outlined' onClick={() => setIsEditing(false)} disabled={isSaving}>
              {ADMIN_MENU_CANCEL_LABEL}
            </Button>
            <Button type='submit' variant='contained' disabled={isSaving}>
              {isSaving ? <CircularProgress size={20} color='inherit' /> : ADMIN_MENU_SAVE_LABEL}
            </Button>
          </Box>
        </Box>
      ) : (
        menu && <MenuTable menu={menu} />
      )}
    </Box>
  );
};

export default Menu;
