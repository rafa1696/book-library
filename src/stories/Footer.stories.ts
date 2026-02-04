import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '../components/Footer/Footer';
import { withRouter } from './decorators/withRouter';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
