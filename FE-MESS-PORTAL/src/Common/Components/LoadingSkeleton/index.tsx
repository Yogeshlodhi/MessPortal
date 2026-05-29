import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { SKELETON_DEFAULT_COUNT } from './constants/loadingSkeleton.general';
import type { ILoadingSkeletonProps } from './constants/loadingSkeleton.interfaces';

import './loadingSkeleton.scss';

const LoadingSkeleton = ({
  count = SKELETON_DEFAULT_COUNT,
  height = 56,
  width = '100%',
}: ILoadingSkeletonProps) => (
  <Box className='loadingSkeletonWrapper'>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        variant='rounded'
        height={height}
        width={width}
        animation='wave'
        className='loadingSkeletonWrapper__bar'
      />
    ))}
  </Box>
);

export default LoadingSkeleton;
