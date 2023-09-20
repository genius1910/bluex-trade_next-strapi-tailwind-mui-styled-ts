import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/ecommerce';
import { backgroundImageSetStyle } from '@/components/tools/background-imageset';
import Image from 'next/image';

const FrontMainSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div
      className="relative overflow-x-hidden bg-cover bg-center"
      style={backgroundImageSetStyle(content.Section_1_Bg.data?.attributes.url)}
    >
      <div className="mx-auto my-0 box-border flex h-auto w-full items-center justify-center px-5 pt-44 md:h-[36.25rem] md:py-0 md:pt-0 lg:w-[60.9375rem] lg:px-0">
        <div className="mt-0 flex w-full flex-col items-center justify-center md:flex-row">
          <div className="mb-[1.875rem] mr-0 flex max-w-[25.3125rem] flex-col items-center md:items-start">
            <div className="mb-[1.875rem] w-full items-start">
              <div className="mb-[1.875rem] max-w-[30rem] break-keep text-left text-[2.25rem] font-bold leading-[3.375rem] tracking-normal text-white">
                {content.Section_1_Title}
              </div>
              <div className="max-w-[32.5rem] text-center text-base font-normal leading-[1.875rem] text-white md:text-left">
                {content.Section_1_Content}
              </div>
            </div>
            <a
              href="mailto:sales@bluextrade.com"
              target="_blank"
              className="inline-block w-36 rounded-[18px] border-none bg-[#009bd2] px-2 py-1.5 text-center text-sm font-bold normal-case leading-6 text-white hover:bg-[#00afec]"
            >
              {content.Section_1_Button}
            </a>
          </div>
          <div>
            <Image
              src={buildCmsUrl(content.Section_1_Image.data?.attributes.url)}
              alt={content.Section_1_Image.data?.attributes.alternativeText ?? ''}
              width={570}
              height={560}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontMainSection;
