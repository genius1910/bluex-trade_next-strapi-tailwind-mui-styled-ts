import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/ecommerce';
import { backgroundImageSetStyle } from '@/components/tools/background-imageset';
import Image from 'next/image';

const QuotationSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div
      className="relative h-fit w-full bg-cover bg-center"
      style={backgroundImageSetStyle(content.Section_4_Bg.data?.attributes.url)}
    >
      <div className="mx-auto my-0 box-border flex w-full justify-center overflow-hidden px-5 pb-[3.563rem] pt-[3.625rem] lg:w-[70rem] lg:px-0">
        <div className="flex w-full flex-col justify-center bg-[rgba(256,256,256,0.1)] p-[1.875rem] lg:w-[70rem] lg:flex-row lg:px-[5rem] lg:pb-[1.875rem] lg:pt-[3.25rem]">
          <Image
            className="mb-5 mr-0 w-full lg:mb-0 lg:mr-[3rem] lg:w-[26rem]"
            src={buildCmsUrl(content.Section_4_Image.data?.attributes.url)}
            alt={content.Section_4_Content}
            width={416}
            height={166}
          />
          <div>
            <div className="font-lato font-stretch-normal overflow-wrap-normal mb-5 whitespace-normal text-left text-base font-normal normal-case leading-normal tracking-normal text-white">
              {content.Section_4_Content}
            </div>
            <div className="mb-0 flex w-full flex-col items-start">
              <div className="font-stretch-normal mb-1 whitespace-pre-wrap text-left font-[lato] text-xl font-bold leading-[2.625rem] text-[#009bd2]">
                {content.Section_4_Speaker_Paragraph.title}
              </div>
              <div className="font-stretch-normal mb-1 whitespace-pre-wrap text-left font-[lato] text-base font-normal leading-normal text-[#dadada]">
                {content.Section_4_Speaker_Paragraph.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationSection;
