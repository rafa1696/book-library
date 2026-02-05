import type { Meta, StoryObj } from '@storybook/react-vite';
import BookCard from '../components/BookCard/BookCard';
import { GoogleBookVolumes } from '../types/GoogleBookVolumes.type';
import { withRouter } from './decorators/withRouter';
import { withContext } from './decorators/withContext';

const mockBook: GoogleBookVolumes = {
  kind: 'books#volume',
  id: 'test-book-123',
  etag: 'test-etag',
  selfLink: 'https://www.googleapis.com/books/v1/volumes/test-book-123',
  volumeInfo: {
    title: 'O Senhor dos Anéis: A Comunidade do Anel',
    authors: ['J.R.R. Tolkien'],
    publisher: 'Editora HarperCollins',
    publishedDate: '2012-08-28',
    description:
      'Uma história épica sobre o heroísmo, a amizade e a coragem. Frodo herda um anel mágico e deve destrui-lo antes que caia nas mãos do mal.',
    industryIdentifiers: [
      {
        type: 'ISBN_10',
        identifier: '0547928211',
      },
      {
        type: 'ISBN_13',
        identifier: '9780547928211',
      },
    ],
    readingModes: {
      text: true,
      image: true,
    },
    pageCount: 496,
    printType: 'BOOK',
    categories: ['Fiction'],
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: true,
    contentVersion: '1.2.2.0.preview.2',
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        'https://covers.openlibrary.org/b/id/7995141-S.jpg',
      thumbnail:
        'https://covers.openlibrary.org/b/id/7995141-M.jpg',
    },
    language: 'pt',
    previewLink:
      'http://books.google.com/books?id=test-book-123&pg=PA1&dq=test&hl=&cd=1&source=gbs_api',
    infoLink:
      'https://play.google.com/store/books/details?id=test-book-123&source=gbs_api',
    canonicalVolumeLink:
      'https://play.google.com/store/books/details?id=test-book-123',
  },
  saleInfo: {
    country: 'BR',
    saleability: 'FOR_SALE',
    isEbook: true,
    listPrice: {
      amount: 29.99,
      currencyCode: 'BRL',
    },
    retailPrice: {
      amount: 23.99,
      currencyCode: 'BRL',
    },
    buyLink: 'https://play.google.com/store/books/details?id=test-book-123',
    offers: [],
  },
  accessInfo: {
    country: 'BR',
    viewability: 'PARTIAL',
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: 'ALLOWED',
    epub: {
      isAvailable: true,
      acsTokenLink:
        'http://books.google.com/books/download/test-epub-token-link',
    },
    pdf: {
      isAvailable: false,
    },
    webReaderLink:
      'http://play.google.com/books/reader?id=test-book-123&hl=&printsec=frontcover&source=gbs_api',
    accessViewStatus: 'SAMPLE',
    quoteSharingAllowed: false,
  },
  searchInfo: {
    textSnippet:
      'Uma história épica sobre o heroísmo, a amizade e a coragem...',
  },
};

const meta = {
  title: 'Components/BookCard',
  component: BookCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withContext, withRouter],
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    book: mockBook,
  },
};

export const WithoutAuthor: Story = {
  args: {
    book: {
      ...mockBook,
      volumeInfo: {
        ...mockBook.volumeInfo,
        authors: undefined,
      },
    },
  },
};

export const WithoutCover: Story = {
  args: {
    book: {
      ...mockBook,
      volumeInfo: {
        ...mockBook.volumeInfo,
        imageLinks: {
          smallThumbnail: "",
          thumbnail: "",
        },
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    book: {
      ...mockBook,
      volumeInfo: {
        ...mockBook.volumeInfo,
        title:
          'O Senhor dos Anéis: A Comunidade do Anel - Uma Edição Especial Com Capa Dura e Ilustrações Exclusivas',
      },
    },
  },
};
