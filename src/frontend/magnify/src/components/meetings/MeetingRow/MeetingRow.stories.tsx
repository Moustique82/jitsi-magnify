import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import createRandomMeeting from '../../../factories/meetings';
import createRandomRoom from '../../../factories/rooms';
import { Meeting } from '../../../types/entities/meeting';
import MeetingRow from './MeetingRow';

export default {
  title: 'Meetings/MeetingRow',
  component: MeetingRow,
  decorators: [withRouter],
} as ComponentMeta<typeof MeetingRow>;

// Template
const Template: ComponentStory<typeof MeetingRow> = (args: Meeting) => <MeetingRow {...args} />;

// Stories
export const Simple = Template.bind({});
Simple.args = createRandomMeeting(false, createRandomRoom());
