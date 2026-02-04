import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchFunction from '../components/Search/SearchFunction';
import { fn } from 'storybook/test';
import React from 'react';

const meta = {
  title: 'Components/SearchFunction',
  component: SearchFunction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSearch: fn((query: string) => {
      console.log('Search query:', query);
    }),
  },
  decorators: [
    (Story: any) =>
      React.createElement(
        'div',
        { style: { width: '100%', maxWidth: '500px' } },
        React.createElement(Story)
      ),
  ],
} satisfies Meta<typeof SearchFunction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ready: Story = {
  args: {
    onSearch: fn((query: string) => {
      console.log('Searching for:', query);
    }),
  },
};
