import type { Meta, StoryObj } from '@storybook/react-vite';
import GalleryFilter from '../components/GalleryFilter/GalleryFilter';
import { FilterTypes } from '../enums/FilterTypes.enum';
import { fn } from 'storybook/test';
import React from 'react';

const meta = {
  title: 'Components/GalleryFilter',
  component: GalleryFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onFilterChange: fn(),
  },
  decorators: [
    (Story: any) =>
      React.createElement(
        'div',
        { style: { width: '400px' } },
        React.createElement(Story)
      ),
  ],
} satisfies Meta<typeof GalleryFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAlphabetical: Story = {
  args: {
    onFilterChange: fn((filter: FilterTypes) => {
      console.log('Filter applied:', filter);
    }),
  },
};

export const WithNewest: Story = {
  args: {
    onFilterChange: fn((filter: FilterTypes) => {
      console.log('Filter applied:', filter);
    }),
  },
};
