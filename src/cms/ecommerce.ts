import BlogContent from '@/constants/mockup/blog-content.json';
import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import {
  AvailableLocaleType,
  ImageEntry,
  ImageFormats,
  SEO,
  availableLocales,
} from './types';
import Ecommerce from './../components/ecommerce-page/ecommerce';

const query = {
  // populate: {
  //   SEO: '*',
  //   Section_1_Title: '*',
  //   Section_1_Content: '*',
  //   Section_1_Image: '*',
  //   Section_1_Button: '*',
  //   Section_2_Title: '*',
  //   Section_2_Media_List: {
  //     image: '*',
  //     description: {
  //       title: '*',
  //       content: '*',
  //     },
  //   },
  //   Section_3_Tab_Media:{
  //     tag:"*",
  //     image:"*",
  //     description:{
  //       title: '*',
  //       content: '*',
  //     },
  //     button:{
  //       text:"*",
  //       link:"*"
  //     }
  //   },
  //   Section_4_Image:"*",
  //   Section_4_Content:"*",
  //   Section_4_Speaker_Paragraph:{
  //     title: '*',
  //     content: '*',
  //   },
  //   Section_4_Bg:"*",
  //   Section_5_Title:"*",
  //   Section_5_Table_Headers:{
  //     data:"*"
  //   },
  //   Section_5_Table_Rows:{
  //     header:"*",
  //     cells:{
  //       data:"*"
  //     }
  //   },
  //   Section_5_Notification:"*"
  // },
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
  `
};

type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
};

interface LocalizedContent {
  SEO: SEO;
  Section_1_Title: string;
  Section_1_Content: string;
  Section_1_Image: ImageEntry;
  Section_1_Button: string;
  Section_2_Title: string;
  // Section_2_Media_List: MediaList[];

  // Section_2_Button:                 string;
  // Template_Sidebar_Section_1_Title: string;
  // Template_Sidebar_Section_2_Title: string;
  // locale:                           string;
  // Section_1_Paragraph:              Paragraph;
  // Section_1_Bg:                     ImageEntry;
  // Not_Found_Paragraph:              Paragraph;
  // Blog_Type_List:                   TypeList[];
  // Category_Type_List:               TypeList[];
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
  // if (useMockData) {
  //   return EcommerceContent as PageContent
  // }

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'Ecommerce-content',
    locales: availableLocales,
    query,
    limit: 500,
  });
  return res as PageContent;
};
