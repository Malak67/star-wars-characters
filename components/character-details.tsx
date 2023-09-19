'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Image } from '@nextui-org/image';
import { Character } from '@/types';
import { formatCharacterDate } from '@/utils';
import { backgrounds } from '@/config/images';
import { Vehicle } from './vehicle';
import { Starship } from './starship';
import { Species } from './species';
import { useQuery } from 'react-query';

const useHomeworldDetails = (url: string) => {
  return useQuery(['homeworld', url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export const CharacterDetails: React.FC<{ character: Character }> = ({
  character,
}) => {
  const [backgroundImage, setBackgroundImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  });

  const homeworld = useHomeworldDetails(character.homeworld);

  return (
    <Card className='py-4'>
      <CardHeader className='flex-col overflow-visible py-2 gap-y-4'>
        <div className='flex gap-x-3 align-center items-center'>
          <Avatar
            showFallback
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${character.name}`}
          />
          <h4 className='font-bold text-xl'>{character.name}</h4>
        </div>
        <Image
          alt='Card background'
          className='object-cover rounded-xl'
          src={backgroundImage}
          width={1000}
        />
      </CardHeader>
      <CardBody className='pb-0 pt-2 px-4 flex-col items-start gap-y-2'>
        <p className='text-large uppercase font-bold'>
          Height: {character.height}
        </p>
        <p className='text-large uppercase font-bold'>Mass: {character.mass}</p>
        <p className='text-large uppercase font-bold'>
          Hair Color: {character.hair_color}
        </p>
        <p className='text-large uppercase font-bold'>
          Skin Color: {character.skin_color}
        </p>
        <p className='text-large uppercase font-bold'>
          Eye Color: {character.eye_color}
        </p>
        <p className='text-large uppercase font-bold'>
          Birth Year: {character.birth_year}
        </p>
        <p className='text-large uppercase font-bold'>
          Gender: {character.gender}
        </p>
        {homeworld?.data && (
          <p className='text-large uppercase font-bold'>
            Homeworld: {homeworld.data.name}
          </p>
        )}
        {character.species.length > 0 && (
          <div>
            <p className='text-large uppercase font-bold'>Species:</p>
            <div className='ml-4'>
              {character.species.map((url) => (
                <Species key={url} url={url} />
              ))}
            </div>
          </div>
        )}
        {character.vehicles.length > 0 && (
          <div>
            <p className='text-large uppercase font-bold'>Vehicles:</p>
            <div className='ml-4'>
              {character.vehicles.map((url) => (
                <Vehicle key={url} url={url} />
              ))}
            </div>
          </div>
        )}
        {character.starships.length > 0 && (
          <div>
            <p className='text-large uppercase font-bold'>Starships:</p>
            <div className='ml-4'>
              {character.starships.map((url) => (
                <Starship key={url} url={url} />
              ))}
            </div>
          </div>
        )}
        <p className='text-large uppercase font-bold'>
          Created: {formatCharacterDate(character.created)}
        </p>
      </CardBody>
    </Card>
  );
};
