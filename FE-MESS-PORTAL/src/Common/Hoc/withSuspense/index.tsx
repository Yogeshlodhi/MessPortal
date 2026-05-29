import { ComponentType, Suspense } from 'react';
import LoadingSkeleton from 'Common/Components/LoadingSkeleton';

const withSuspense = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  const Wrapped = (props: P) => (
    <Suspense fallback={<LoadingSkeleton count={3} />}>
      <Component {...props} />
    </Suspense>
  );
  Wrapped.displayName = `withSuspense(${Component.displayName ?? Component.name ?? 'Component'})`;
  return Wrapped;
};

export default withSuspense;
