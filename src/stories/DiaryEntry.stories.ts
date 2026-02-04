import type { Meta, StoryObj } from '@storybook/react-vite';
import DiaryEntry from '../components/DiaryEntry/DiaryEntry';
import React from 'react';
import { withRouter } from './decorators/withRouter';

const meta = {
  title: 'Components/DiaryEntry',
  component: DiaryEntry,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof DiaryEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NewEntry: Story = {};
