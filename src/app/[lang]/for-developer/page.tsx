import { fetchContent } from '@/cms/for-developer-page';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import ForDeveloper from '@/components/for-developer/for-developer';

export default async function Page({ params }: { params: { lang: string } }) {
  const content = await fetchContent();
  const locale = mapLangToLocale(params.lang as AvailableLangType);
  if (!locale) {
    return false;
  }
  return <ForDeveloper content={content} locale={locale} />;
}
