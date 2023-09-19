import axios from 'axios';
import { useQuery } from 'react-query';
import { Pilot } from './pilot';
import { Spinner } from '@nextui-org/spinner';

const useStarshipDetails = (url: string) => {
  return useQuery(['starships', url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export const Starship: React.FC<{ url: string }> = ({ url }) => {
  const starship = useStarshipDetails(url);

  if (starship.isLoading || starship.isFetching) {
    return (
      <div className='items-center justify-center flex my-10'>
        <Spinner
          label='Loading starship details...'
          color='secondary'
          labelColor='secondary'
          size='sm'
        />
      </div>
    );
  }

  if (!starship.data) return null;

  return (
    <div className='my-3'>
      <p className='text-md uppercase'>Name: {starship.data.name}</p>
      <p className='text-md uppercase'>Model: {starship.data.model}</p>
      <div>
        <p className='text-md uppercase'>Pilots:</p>
        <div className='ml-4'>
          {starship.data.pilots.map((pilotUrl: string) => (
            <Pilot key={pilotUrl} url={pilotUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};
