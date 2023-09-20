import type { PageContent } from '@/cms/for-developer-page';
import { AvailableLocaleType } from '@/cms/types';
import APITableSection from './api-section';
import FrontMainSection from './main-section';
import MediaSection from './media-section';
import PartnerSection from './partner-section';

export default function ForDeveloper(props: {
  content: PageContent;
  locale: AvailableLocaleType;
}) {
  const localizedContent = props.content[props.locale];
  return (
    <div>
      <FrontMainSection content={localizedContent} />
      <PartnerSection content={localizedContent} />
      <MediaSection content={localizedContent} />
      <APITableSection content={localizedContent} />
    </div>
  );
}
