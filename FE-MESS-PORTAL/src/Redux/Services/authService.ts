import { axiosInstance } from 'Axios/AxiosInstance';
import { clearAuth } from 'Redux/Slices/Common/AuthSlice';
import type { AppDispatch } from 'Redux/Store';

export const performStudentLogout = async (dispatch: AppDispatch): Promise<void> => {
  try {
    await axiosInstance.get('/student/logout');
  } finally {
    dispatch(clearAuth());
  }
};

export const performAdminLogout = async (dispatch: AppDispatch): Promise<void> => {
  try {
    await axiosInstance.get('/admin/logout');
  } finally {
    dispatch(clearAuth());
  }
};
