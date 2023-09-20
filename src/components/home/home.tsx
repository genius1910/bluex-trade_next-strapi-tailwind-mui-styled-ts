import type { PageContent } from '@/cms/home';
import { AvailableLocaleType } from '@/cms/types';
import FrontMainSection from '@/components/home/main-section';
import AwardSection from '@/components/home/award-section';
import DescriptionSection from '@/components/home/description-section';
import PageIntroSection from '@/components/home/page-intro-section';
import LogoSection from '@/components/home/logo-section';
import TestimonialSection from '@/components/home/testimonial-section';
import FAQSection from '@/components/home/faq-section';
import ContactSection from '@/components/home/contact-section';

export default function Home(props: {
  content: PageContent;
  locale: AvailableLocaleType;
}) {
  const localizedContent = props.content[props.locale];
  return (
    <>
      <FrontMainSection content={localizedContent} />
      <AwardSection content={localizedContent} />
      <DescriptionSection content={localizedContent} locale={props.locale} />
      <PageIntroSection content={localizedContent} locale={props.locale} />
      <LogoSection content={localizedContent} />
      <TestimonialSection content={localizedContent} />
      <FAQSection
        title={localizedContent.Section_7_Title}
        faqs={localizedContent.Section_7_FAQ_List}
      />
      <ContactSection
        title={localizedContent.Section_8_Content}
        linkButton={localizedContent.Section_8_Button}
        bg={localizedContent.Section_8_Bg}
      />
    </>
  );
}
