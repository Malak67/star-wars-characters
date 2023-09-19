'use client';

import React from 'react';
import { Card, CardHeader } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Character } from '@/types';
import { extractIdFromUrl, formatCharacterDate } from '@/utils';
import { Button } from '@nextui-org/button';
import NextLink from 'next/link';

export const CharacterCard: React.FC<{ character: Character }> = ({
  character,
}) => (
  <Card className='py-4'>
    <CardHeader className='pb-0 pt-2 px-4 flex-col items-start gap-y-2'>
      <div className='flex gap-x-2 align-center items-center'>
        <Avatar
          showFallback
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${character.name}`}
        />
        <h4 className='font-bold text-xl'>{character.name}</h4>
      </div>
      <p className='text-large uppercase font-bold'>
        Height: {character.height}
      </p>
      <p className='text-large uppercase font-bold'>
        Birth Year: {character.birth_year}
      </p>
      <p className='text-large uppercase font-bold'>
        Created: {formatCharacterDate(character.created)}
      </p>
      <NextLink
        className='flex justify-start items-center gap-1'
        href={`/details/${extractIdFromUrl(character.url)}`}
      >
        <Button color='secondary' variant='solid' className='px-28'>
          Details
        </Button>
      </NextLink>
    </CardHeader>
  </Card>
);
