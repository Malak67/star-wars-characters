import axios from 'axios';
import { useQuery } from 'react-query';
import { Pilot } from './pilot';
import { Spinner } from '@nextui-org/spinner';

const useVehicleDetails = (url: string) => {
  return useQuery(['vehicles', url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export const Vehicle: React.FC<{ url: string }> = ({ url }) => {
  const vehicle = useVehicleDetails(url);

  if (vehicle.isLoading || vehicle.isFetching) {
    return (
      <div className='items-center justify-center flex my-10'>
        <Spinner
          label='Loading vehicle details...'
          color='secondary'
          labelColor='secondary'
          size='sm'
        />
      </div>
    );
  }

  if (!vehicle.data) return null;

  return (
    <div className='my-3'>
      <p className='text-md uppercase'>Name: {vehicle.data.name}</p>
      <p className='text-md uppercase'>Model: {vehicle.data.model}</p>
      <div>
        <p className='text-md uppercase'>Pilots:</p>
        <div className='ml-4'>
          {vehicle.data.pilots.map((pilotUrl: string) => (
            <Pilot key={pilotUrl} url={pilotUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};
