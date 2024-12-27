export type GoogleBookVolumes = {
  readonly kind: string;
  readonly id: string;
  readonly etag: string;
  readonly selfLink: string;
  readonly volumeInfo: VolumeInfo;
  readonly saleInfo: SaleInfo;
  readonly accessInfo: AccessInfo;
  readonly searchInfo: SearchInfo;
};

export type AccessInfo = {
  readonly country: string;
  readonly viewability: string;
  readonly embeddable: boolean;
  readonly publicDomain: boolean;
  readonly textToSpeechPermission: string;
  readonly epub: Epub;
  readonly pdf: PDF;
  readonly webReaderLink: string;
  readonly accessViewStatus: string;
  readonly quoteSharingAllowed: boolean;
};

export type Epub = {
  readonly isAvailable: boolean;
  readonly acsTokenLink?: string;
  readonly downloadLink?: string;
};

export type PDF = {
  readonly isAvailable: boolean;
  readonly acsTokenLink?: string;
};

export type SaleInfo = {
  readonly country: string;
  readonly saleability: string;
  readonly isEbook: boolean;
  readonly listPrice?: SaleInfoListPrice;
  readonly retailPrice?: SaleInfoListPrice;
  readonly buyLink?: string;
  readonly offers?: Offer[];
};

export type SaleInfoListPrice = {
  readonly amount: number;
  readonly currencyCode: string;
};

export type Offer = {
  readonly finskyOfferType: number;
  readonly listPrice: OfferListPrice;
  readonly retailPrice: OfferListPrice;
  readonly giftable: boolean;
};

export type OfferListPrice = {
  readonly amountInMicros: number;
  readonly currencyCode: string;
};

export type SearchInfo = {
  readonly textSnippet: string;
};

export type VolumeInfo = {
  readonly title: string;
  readonly authors?: string[];
  readonly publisher?: string;
  readonly publishedDate: string;
  readonly description?: string;
  readonly industryIdentifiers: IndustryIdentifier[];
  readonly readingModes: ReadingModes;
  readonly pageCount: number;
  readonly printType: string;
  readonly categories: string[];
  readonly maturityRating: string;
  readonly allowAnonLogging: boolean;
  readonly contentVersion: string;
  readonly panelizationSummary: PanelizationSummary;
  readonly imageLinks: ImageLinks;
  readonly language: string;
  readonly previewLink: string;
  readonly infoLink: string;
  readonly canonicalVolumeLink: string;
  readonly subtitle?: string;
  readonly averageRating?: number;
  readonly ratingsCount?: number;
};

export type ImageLinks = {
  readonly smallThumbnail: string;
  readonly thumbnail: string;
};

export type IndustryIdentifier = {
  readonly type: string;
  readonly identifier: string;
};

export type PanelizationSummary = {
  readonly containsEpubBubbles: boolean;
  readonly containsImageBubbles: boolean;
};

export type ReadingModes = {
  readonly text: boolean;
  readonly image: boolean;
};
