export interface B2BTutorial {
    valueSearch?: Daum[];
    idVideo?: number;
    switchOn?: Boolean;
    setSwitchOn?: any;
    value?: any;
    search?: boolean;
    responseVideobyId?: any;
    responseCMSbyId?: any;
    setId?: any;
    setIdVideo?: any;
    data?: Daum[];
    dataB?: any;
    meta?: Meta;
    isLoading?: any;
    id?: number;
    responseCMS?: any;
  }
  
  export interface Daum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    title: string;
    description: string;
    video_duration: string;
    index: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    checkout_module: CheckoutModule;
    video: Video;
  }
  
  export interface CheckoutModule {
    data: Data;
  }
  
  export interface Data {
    id: number;
    attributes: Attributes2;
  }
  
  export interface Attributes2 {
    title: string;
    description: string;
    index: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Video {
    data: Data2;
  }
  
  export interface Data2 {
    id: number;
    attributes: Attributes3;
  }
  
  export interface Attributes3 {
    name: string;
    alternativeText: string;
    caption: string;
    width: any;
    height: any;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: any;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Meta {
    pagination: Pagination;
  }
  
  export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  