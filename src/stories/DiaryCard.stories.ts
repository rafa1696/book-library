import type { Meta, StoryObj } from '@storybook/react-vite';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import { ReadingDiaryEntry } from '../types/ReadingDiaryEntry.type';
import { withRouter } from './decorators/withRouter';
import { withContext } from './decorators/withContext';

const mockDiaryEntry: ReadingDiaryEntry = {
  id: 'entry-1',
  associatedBooks: ['book-id-1'],
  associatedBooksImages: [
    'https://covers.openlibrary.org/b/id/7995141-M.jpg',
  ],
  bookTitle: 'Clean Code',
  entry:
    'Este livro é absolutamente incrível! Aprender sobre clean code mudou completamente a forma como escrevo código. As práticas e padrões apresentados são fundamentais para qualquer desenvolvedor que deseja melhorar suas habilidades de programação.',
  timestamp: Date.now(),
  title: 'Impressões iniciais sobre Clean Code',
};

const mockDiaryEntryLongText: ReadingDiaryEntry = {
  ...mockDiaryEntry,
  id: 'entry-2',
  title: 'Muito Longo',
  entry:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

const mockDiaryEntryWithoutImage: ReadingDiaryEntry = {
  ...mockDiaryEntry,
  id: 'entry-3',
  associatedBooksImages: [],
};

const meta = {
  title: 'Components/DiaryCard',
  component: DiaryCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withContext, withRouter],
} satisfies Meta<typeof DiaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    diaryEntry: mockDiaryEntry,
  },
};

export const WithLongText: Story = {
  args: {
    diaryEntry: mockDiaryEntryLongText,
  },
};

export const WithoutImage: Story = {
  args: {
    diaryEntry: mockDiaryEntryWithoutImage,
  },
};

export const WithoutTitle: Story = {
  args: {
    diaryEntry: {
      ...mockDiaryEntry,
      id: 'entry-4',
      title: '',
    },
  },
};
