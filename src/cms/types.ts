//
// lang type defines the page path of each language
// locale type defines the language of the content in the CMS(Strapi)
//

import { reverseRecord } from "@/lib/tools";

const constAvailableLangs = ['en', 'tw', 'cn'] as const;
const constAvailableLocales = ['en', 'zh-Hant-TW', 'zh-Hans-CN'] as const;

type AvailableLangType = typeof constAvailableLangs[number];
type AvailableLocaleType = typeof constAvailableLocales[number];

const pathLangToCmsLangMap = {
  en: 'en',
  'tw': 'zh-Hant-TW',
  'cn': 'zh-Hans-CN',
} as Record<AvailableLangType, AvailableLocaleType>

const LocaleToLangMap = reverseRecord(pathLangToCmsLangMap);

export type { AvailableLocaleType, AvailableLangType }
export const defaultLocale = 'en'
export const availableLangs = [...constAvailableLangs]
export const availableLocales = [...constAvailableLocales]
export const mapLangToLocale = (lang: AvailableLangType) => pathLangToCmsLangMap[lang];
export const mapLocaleToLang = (locale: AvailableLocaleType) => LocaleToLangMap[locale];

export interface Metadata {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}

export interface ImageAttributes {
  ext:    string;
  url:    string;
  hash:   string;
  mime:   string;
  name:   string;
  size:   number;
  width:  number;
  height: number;
}

export interface ImageFormats {
  large?:     ImageAttributes;
  small?:     ImageAttributes;
  medium?:    ImageAttributes;
  thumbnail?: ImageAttributes;
}

export interface ImageEntry {
  data: ImageData;
}

export interface ImageData {
  id:         number;
  attributes: ImageMeta;
}

export interface ImageMeta {
  name:              string;
  alternativeText?:  string | null;
  caption?:          string | null;
  width:             number;
  height:            number;
  formats:           ImageFormats;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
}

export interface SEO {
  id:          number;
  title:       string | null;
  description: string | null;
  image?:      ImageEntry;
}

