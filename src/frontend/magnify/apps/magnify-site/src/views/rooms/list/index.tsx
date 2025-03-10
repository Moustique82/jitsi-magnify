import {
  CustomCard,
  InstantRoom,
  KeycloakService,
  MagnifyQueryKeys,
  MyRooms,
  RoomsRepository,
  useTranslations,
} from '@openfun/magnify-components';

import { useQuery } from '@tanstack/react-query';
import { Box, Heading } from 'grommet';
import * as React from 'react';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title_part_one: {
    defaultMessage: 'Secure conference',
    id: 'view.rooms.title_part_one',
    description: 'Main title part one',
  },
  title_part_two: {
    defaultMessage: 'and quality up to 500 people',
    id: 'view.rooms.title_part_two',
    description: 'Main title',
  },
});

export function RoomsListView() {
  const intl = useTranslations();

  const { data: rooms, isLoading } = useQuery([MagnifyQueryKeys.ROOMS], RoomsRepository.getAll, {
    enabled: KeycloakService.isLoggedIn(),
  });

  return (
    <>
      <Box align={'center'} direction={'column'} height={{ min: 'auto' }} justify={'center'}>
        <Heading color={'brand'} level={1} margin="none" textAlign={'center'}>
          {intl.formatMessage(messages.title_part_one)}
        </Heading>
        <Heading color={'brand'} level={3} margin="none" textAlign={'center'}>
          {intl.formatMessage(messages.title_part_two)}
        </Heading>
      </Box>
      <CustomCard>
        <InstantRoom />
      </CustomCard>
      <MyRooms baseJitsiUrl={'/j'} isLoading={isLoading} rooms={rooms ?? []} />
    </>
  );
}
