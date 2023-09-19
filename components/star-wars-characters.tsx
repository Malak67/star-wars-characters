'use client';

import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { SWAPIResponse } from '@/types';
import { SearchIcon } from '@/components/icons';
import { Spinner } from '@nextui-org/spinner';
import { Input } from '@nextui-org/input';
import { CharacterCard } from '@/components/character-card';
import debounce from 'lodash.debounce';

const fetchCharacters = async ({
  pageParam = 'https://swapi.dev/api/people/?page=1',
  search = '',
}) => {
  const url = search
    ? `https://swapi.dev/api/people/?search=${search}`
    : pageParam;
  const { data } = await axios.get<SWAPIResponse>(url);
  return data;
};

export const StarWarsCharacters: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useInfiniteQuery<SWAPIResponse, unknown, SWAPIResponse>(
    ['characters', searchString],
    ({ pageParam }) => fetchCharacters({ pageParam, search: searchString }),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      staleTime: 60000, // 1 minute
      cacheTime: 3600000, // 1 hour
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      const threshold = 100;
      if (!fetching && scrollHeight - scrollTop <= clientHeight + threshold) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: any) => {
    setSearchString(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    refetch();
  }, [searchString, refetch]);

  return (
    <div className='mt-8 w-full'>
      <Input
        aria-label='Search'
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-lg',
        }}
        labelPlacement='outside'
        placeholder='Search...'
        startContent={
          <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
        }
        onChange={debouncedResults}
      />

      {isError && (
        <p style={{ color: 'red' }}>
          Error fetching data: {(error as Error).message}
        </p>
      )}

      <div>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((character) => (
              <div className='my-4' key={character.name}>
                <CharacterCard character={character} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {(isFetchingNextPage || isLoading) && (
        <div className='items-center justify-center flex my-10'>
          <Spinner
            label='Loading characters...'
            color='secondary'
            labelColor='secondary'
            size-='lg'
          />
        </div>
      )}
    </div>
  );
};
