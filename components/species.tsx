import axios from 'axios';
import { useQuery } from 'react-query';
import { Spinner } from '@nextui-org/spinner';

const useSpeciesDetails = (url: string) => {
  return useQuery(['species', url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export const Species: React.FC<{ url: string }> = ({ url }) => {
  const species = useSpeciesDetails(url);
  
  if (species.isLoading || species.isFetching) {
    return (
      <div className='items-center justify-center flex my-10'>
        <Spinner
          label='Loading species details...'
          color='secondary'
          labelColor='secondary'
          size='sm'
        />
      </div>
    );
  }

  if (!species.data) return null;

  return (
    <div className='my-3'>
      <p className='text-md uppercase'>Name: {species.data.name}</p>
      <p className='text-md uppercase'>
        Classification: {species.data.classification}
      </p>
      <p className='text-md uppercase'>
        Average Lifespan: {species.data.average_lifespan}
      </p>
      <p className='text-md uppercase'>Language: {species.data.language}</p>
    </div>
  );
};
