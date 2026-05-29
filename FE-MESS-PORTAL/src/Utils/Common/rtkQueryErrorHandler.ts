import type { Dispatch } from '@reduxjs/toolkit';
import { showSnackbar, SNACKBAR_SEVERITY } from 'Redux/Slices/Common/SnackbarSlice';
import { IApiError } from 'Common/types/api.types';

interface ILifecycleApi {
  dispatch: Dispatch;
  queryFulfilled: Promise<unknown>;
}

export const onQueryStartedErrorToast = async (
  _arg: unknown,
  api: ILifecycleApi,
): Promise<void> => {
  try {
    await api.queryFulfilled;
  } catch (err) {
    const apiError = (err as { error?: IApiError }).error;
    if (apiError?.isOffline) return;

    api.dispatch(
      showSnackbar({
        severity: SNACKBAR_SEVERITY.ERROR,
        message: apiError?.message ?? 'Something went wrong',
        transactionId: apiError?.transactionId ?? null,
      }),
    );
  }
};
