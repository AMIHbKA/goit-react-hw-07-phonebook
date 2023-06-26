import { PulseLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <PulseLoader
      color="blue"
      cssOverride={{
        textAlign: 'center',
      }}
      margin={10}
      size={12}
    />
  );
};
