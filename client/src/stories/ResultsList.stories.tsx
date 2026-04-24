import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultsList from '../components/ResultsList';
import { Results } from 'shared/poll-types';

export default {
  title: 'ResultsList',
  component: ResultsList,
} as ComponentMeta<typeof ResultsList>;

const Template: ComponentStory<typeof ResultsList> = (args) => (
  <div className="max-w-sm m-auto h-screen">
    <ResultsList {...args} />
  </div>
);

const results: Results[] = [
  [
    {
      nominationID: '1',
      nominationText: 'Taco Bell',
      score: 3,
    },
    {
      nominationID: '2',
      nominationText: 'Del Taco',
      score: 2,
    },
    {
      nominationID: '3',
      nominationText: "Papa's Tacos",
      score: 1,
    },
    {
      nominationID: '4',
      nominationText: 'Los Taqueros Locos con Nomre Largo',
      score: 1,
    },
  ],
  [
    {
      nominationID: '1',
      nominationText: 'Taco Bell',
      score: 3,
    },
    {
      nominationID: '2',
      nominationText: 'Del Taco',
      score: 2,
    },
    {
      nominationID: '4',
      nominationText: "Papa's Tacos",
      score: 2,
    },
  ],
  [
    {
      nominationID: '4',
      nominationText: "Papa's Tacos",
      score: 4,
    },
    {
      nominationID: '1',
      nominationText: 'Taco Bell',
      score: 3,
    },
  ],
];

export const ResultsBasic = Template.bind({});
ResultsBasic.args = {
  results: results,
};

const resultsLong: Results[] = [
  [
    {
      nominationID: '1',
      nominationText: 'Taco Bell',
      score: 10,
    },
    {
      nominationID: '2',
      nominationText: 'Del Taco',
      score: 8,
    },
    {
      nominationID: '3',
      nominationText: "Papa's Tacos",
      score: 5,
    },
    {
      nominationID: '4',
      nominationText: 'Los Taqueros Locos con Nomre Largo',
      score: 4,
    },
    {
      nominationID: '5',
      nominationText: 'Chicky-Chicken-Filet',
      score: 4,
    },
    {
      nominationID: '6',
      nominationText: 'Mad Clown Burger',
      score: 3,
    },
    {
      nominationID: '7',
      nominationText: 'Thai Basil #0005',
      score: 3,
    },
    {
      nominationID: '8',
      nominationText: 'Sichuan Spice',
      score: 2,
    },
    {
      nominationID: '9',
      nominationText: 'Not Good Curry',
      score: 0,
    },
    {
      nominationID: '10',
      nominationText: 'Not Good Soul Food',
      score: 0,
    },
    {
      nominationID: '11',
      nominationText: 'Not Good Sushi',
      score: 0,
    },
    {
      nominationID: '12',
      nominationText: 'Not Good Falafel',
      score: 0,
    },
    {
      nominationID: '13',
      nominationText: 'Not Good Steakhouse',
      score: 0,
    },
    {
      nominationID: '14',
      nominationText: 'Not Good Burgers',
      score: 0,
    },
  ],
  [
    {
      nominationID: '1',
      nominationText: 'Taco Bell',
      score: 3,
    },
    {
      nominationID: '2',
      nominationText: 'Del Taco',
      score: 2,
    },
    {
      nominationID: '4',
      nominationText: "Papa's Tacos",
      score: 2,
    },
  ],
];

export const ResultsLong = Template.bind({});
ResultsLong.args = {
  results: resultsLong,
};
