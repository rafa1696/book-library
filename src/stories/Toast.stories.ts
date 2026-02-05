import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from '../components/Toast/Toast';
import React, { useEffect } from 'react';
import { BookLibraryProvider, useBookLibraryContext } from '../context/BookLibraryContext';
import { ToastType } from '../enums/ToastType.enum';

const ProviderDecorator = (Story: any) =>
  React.createElement(
    BookLibraryProvider,
    null,
    React.createElement('div', { style: { padding: '20px' } }, React.createElement(Story))
  );

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ProviderDecorator],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  decorators: [
    () => {
      const ToastWithContext = () => {
        const { toastMessageDefinition } = useBookLibraryContext();
        useEffect(() => {
          toastMessageDefinition(ToastType.success);
        }, []);
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};

export const Failure: Story = {
  decorators: [
    () => {
      const ToastWithContext = () => {
        const { toastMessageDefinition } = useBookLibraryContext();
        useEffect(() => {
          toastMessageDefinition(ToastType.failure);
        }, []);
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};

export const Hidden: Story = {
  decorators: [
    () => {
      const ToastWithContext = () => {
        return React.createElement(Toast);
      };
      return React.createElement(ToastWithContext);
    },
  ],
};
