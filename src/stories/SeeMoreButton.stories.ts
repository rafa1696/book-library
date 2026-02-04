import type { Meta, StoryObj } from '@storybook/react-vite';
import SeeMoreButton from '../components/SeeMoreButton/SeeMoreButton';
import React from 'react';
import { withRouter } from './decorators/withRouter';

const meta = {
  title: 'Components/SeeMoreButton',
  component: SeeMoreButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    withRouter,
    (Story: any) =>
      React.createElement(
        'div',
        { style: { padding: '20px' } },
        React.createElement(Story)
      ),
  ],
} satisfies Meta<typeof SeeMoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
