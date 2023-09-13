import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig } from './base';
import {
  AvailableLocaleType,
  ImageEntry,
  availableLocales,
} from './types';


const query = {
  populate: `SEO,
  Section_1_Bg,
  Section_1_Button,
  Section_1_Content,
  Section_1_Image,
  Section_1_Media_List,
  Section_1_Title,
  Section_2_Media_List,
  Section_2_Media_List.image,
  Section_2_Media_List.description,
  Section_2_Title,
  Section_3_Tab_Media,
  Section_3_Tab_Media.image,
  Section_3_Tab_Media.description,
  Section_3_Tab_Media.button,
  Section_4_Bg,
  Section_4_Content,
  Section_4_Image,
  Section_4_Speaker_Paragraph,
  Section_5_Notification,
  Section_5_Table_Headers,
  Section_5_Table_Rows,
  Section_5_Table_Rows.cells,
  Section_5_Title
  `,
};

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
};

interface LocalizedContent {
}

export interface MediaList {
  id: number;
  image: ImageEntry;
  description: Paragraph;
}

export interface TypeList {
  id: number;
  text: string;
  link: string;
}

export interface Paragraph {
  id: number;
  title: string;
  content: string;
}

export type { LocalizedContent, PageContent };

export const fetchContent = async () => {

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'Ecommerce-content',
    locales: availableLocales,
    query,
    limit: 500,
  });
  return res as PageContent;
};
