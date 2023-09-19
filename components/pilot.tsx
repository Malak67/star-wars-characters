import axios from 'axios';
import { useQuery } from 'react-query';
import { Spinner } from '@nextui-org/spinner';

const usePersonName = (url: string) => {
  return useQuery(['pilot', url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export const Pilot: React.FC<{ url: string }> = ({ url }) => {
  const pilot = usePersonName(url);

  if (pilot.isLoading || pilot.isFetching) {
    return (
      <div className='items-center justify-center flex my-10'>
        <Spinner
          label='Loading pilot details...'
          color='secondary'
          labelColor='secondary'
          size='sm'
        />
      </div>
    );
  }

  if (!pilot.data) return null;

  return <p className='text-tiny uppercase'>{pilot.data.name}</p>;
};
