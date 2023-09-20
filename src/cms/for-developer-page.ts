import DeveloperContent from '@/constants/mockup/for-developer-content.json';
import { loadSingleTypes } from '@/lib/strapi_adapter';
import { baseConfig, useMockData } from './base';
import { AvailableLocaleType, ImageEntry, ImageData, ImageFormats, SEO, availableLocales } from './types';
import { Image, FAQList } from './home';

const query = {
  populate: `SEO,
  Section_1_Paragraph,
  Section_1_Btn,
  Section_1_Image,
  Section_1_Bg,
  Section_2_Title,
  Section_2_Main_Logo,
  Section_2_Logo_List,
  Section_3_Title,
  Section_3_Media_List.image,
  Section_3_Media_List.description,
  Section_4_Title,
  Section_4_Table_Row_Header_1,
  Section_4_Table_Row_Data_1.function,
  Section_4_Table_Row_Header_2,
  Section_4_Table_Row_Data_2.function,
  Section_4_Table_Row_Header_3,
  Section_4_Table_Row_Data_3.function,
  Section_5_Title,
  Section_5_First_Name_Input,
  Section_5_Last_Name_Input,
  Section_5_Email_Input,
  Section_5_Company_Input,
  Section_5_Mobile_Input,
  Section_5_Country_Input,
  Section_5_Confirm_Text,
  Section_5_Confirm_Link_Text,
  Section_5_Confirm_Link_Url,
  Section_5_Submit_Btn`
}

export type PageContent = {
  [key in AvailableLocaleType]: LocalizedContent;
}

export interface LocalizedContent {
  SEO: SEO,
  Section_1_Paragraph: SectionParagraph,
  Section_1_Btn: SectionButton,
  Section_1_Image: ImageEntry,
  Section_1_Bg: ImageEntry,
  Section_2_Title: String,
  Section_2_Main_Logo: ImageEntry,
  Section_2_Logo_List: { data: ImageData[] },
  Section_3_Title: String,
  Section_3_Media_List: MediaList[],
  Section_4_Title: String,
  Section_4_Table_Row_Header_1: String,
  Section_4_Table_Row_Data_1: TableRowList[],
  Section_4_Table_Row_Header_2: String,
  Section_4_Table_Row_Data_2: TableRowList[],
  Section_4_Table_Row_Header_3: String,
  Section_4_Table_Row_Data_3: TableRowList[],
  Section_5_Title: String,
  Section_5_First_Name_Input: String,
  Section_5_Last_Name_Input: String,
  Section_5_Email_Input: String,
  Section_5_Company_Input: String,
  Section_5_Mobile_Input: String,
  Section_5_Country_Input: String,
  Section_5_Confirm_Text: String,
  Section_5_Confirm_Link_Text: String,
  Section_5_Confirm_Link_Url: String,
  Section_5_Submit_Btn: String,
}

export interface MediaList {
  id: number;
  image: Image;
  description: FAQList;
}

export interface TableRowList {
  id: number;
  category: string;
  function: any;
}

export interface SectionParagraph {
  id: number;
  title: string;
  content: string;
}

export interface SectionButton {
  id: number;
  text: string;
  link: string;
}

export const fetchContent = async () => {
  if (useMockData) {
    return DeveloperContent as unknown as PageContent;
  }

  const res = await loadSingleTypes({
    ...baseConfig(),
    singularName: 'developer-content',
    locales: availableLocales,
    query,
    limit: 500
  })
  return res as PageContent
}
