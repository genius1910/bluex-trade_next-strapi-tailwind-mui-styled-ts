import type { PageContent } from '@/cms/home';
import { AvailableLocaleType } from '@/cms/types';
import FrontMainSection from './main-section';
import FeatureSection from './feature-section';
import SlideSection from './slide-section';
import QuotationSection from './quotation-section';
import PricingSection from './pricing-section';

export default function Ecommerce(props: {}) {

  // const localizedContent = props.content[props.locale];

  return (
    <div>
      <FrontMainSection />
      <FeatureSection />
      <SlideSection />
      <QuotationSection />
      <PricingSection />
    </div>
  );
}
