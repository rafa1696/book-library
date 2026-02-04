import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from '../components/Toast/Toast';
import { ToastType } from '../enums/ToastType.enum';
import React from 'react';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) =>
      React.createElement(
        'div',
        { style: { padding: '20px' } },
        React.createElement(Story)
      ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  decorators: [
    (Story: any) => {
      const ToastWithContext = () => {
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};

export const Failure: Story = {
  decorators: [
    (Story: any) => {
      const ToastWithContext = () => {
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};

export const Hidden: Story = {
  decorators: [
    (Story: any) => {
      const ToastWithContext = () => {
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};
