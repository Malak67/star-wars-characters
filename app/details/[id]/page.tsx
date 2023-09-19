'use client';

import axios from 'axios';
import { useQuery } from 'react-query';
import { Character } from '@/types';
import { Spinner } from '@nextui-org/spinner';
import { CharacterDetails } from '@/components/character-details';

export default function Page({ params }: { params: { id: string } }) {
  const getCharacter = () => {
    const url = `https://swapi.dev/api/people/${params.id}`;
    return axios.get(url);
  };

  const useGetCharacterDetails = () => {
    const { data, refetch, isError, error, isLoading } = useQuery(
      ['character'],
      () => getCharacter(),
      {
        retry: false,
        enabled: !!params.id,
        onError: (error) => {
          console.log('ERROR: ', error);
        },
      }
    );
    return {
      data: data?.data as Character,
      refetch,
      isError,
      isLoading,
      error,
    };
  };

  const { data: characterDetails, isLoading } = useGetCharacterDetails();

  return isLoading || !characterDetails ? (
    <div className='items-center justify-center flex my-10'>
      <Spinner
        label='Loading character details...'
        color='secondary'
        labelColor='secondary'
        size-='lg'
      />
    </div>
  ) : (
    <CharacterDetails character={characterDetails} />
  );
}
