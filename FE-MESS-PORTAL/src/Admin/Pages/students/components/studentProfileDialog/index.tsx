import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import type { IStudentListRow } from 'Common/types/domain.types';

import './studentProfileDialog.scss';

interface IStudentProfileDialogProps {
  student: IStudentListRow | null;
  onClose: () => void;
}

const StudentProfileDialog = ({ student, onClose }: IStudentProfileDialogProps) => {
  const details = student
    ? [
        { label: 'Roll No.', value: student.studentRoll },
        { label: 'Name', value: student.studentName },
        { label: 'Email', value: student.emailId },
        { label: 'Contact No.', value: student.number },
        { label: 'Bank Account', value: student.bankAccount },
        { label: 'IFSC Code', value: student.ifsc },
      ]
    : [];

  return (
    <Dialog open={Boolean(student)} onClose={onClose} maxWidth='sm' fullWidth>
      {student && (
        <>
          <DialogTitle className='studentProfileDialog__title'>
            <span>{student.studentName}&apos;s Profile</span>
            <IconButton size='small' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box className='studentProfileDialog__body'>
              <Avatar src={student.avatar?.url} className='studentProfileDialog__avatar'>
                {student.studentName?.charAt(0).toUpperCase()}
              </Avatar>
              <Box className='studentProfileDialog__details'>
                {details.map((detail) => (
                  <Box key={detail.label} className='studentProfileDialog__row'>
                    <Typography variant='semiBoldLabelM' component='span'>
                      {detail.label}
                    </Typography>
                    <Typography variant='textM' component='span'>
                      {detail.value || '—'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default StudentProfileDialog;
