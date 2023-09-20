import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/for-developer-page';
import { backgroundImageSetStyle } from '@/components/tools/background-imageset';
import Image from 'next/image';
import Link from 'next/link';

const FrontMainSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div
      className="relative h-auto w-full overflow-x-hidden bg-cover bg-center"
      style={backgroundImageSetStyle(content.Section_1_Bg.data.attributes.url)}
    >
      <div className="mx-auto my-0 box-border h-[36.25rem] w-full px-[1.25rem] pb-[5rem] pt-[4.625rem] md:pb-[9.125rem] md:pt-[4.875rem] lg:w-[60rem] lg:px-0">
        <div className="flex w-full flex-row justify-center">
          <div className="relative flex w-full flex-col items-center sm:items-baseline">
            <div className="relative z-10 mb-[1.875rem] w-full items-start pt-[4.875rem]">
              <div className="mb-[1.875rem] max-w-[30rem] break-words text-[2.25rem] font-bold leading-[3.375rem] tracking-normal text-white">
                {content.Section_1_Paragraph.title}
              </div>
              <div className="max-w-[32.5rem] text-[1rem] font-normal leading-[1.875rem] text-white">
                {content.Section_1_Paragraph.content}
              </div>
            </div>
            <Link href={content.Section_1_Btn.link}>
              <button className="relative z-10 h-[2.25rem] cursor-pointer rounded-full border-none bg-secondary px-[2rem] py-[0.375rem] font-btn text-[1rem] font-bold font-bold text-white">
                {content.Section_1_Btn.text}
              </button>
            </Link>
            <div className="w-unset absolute bottom-[-5rem] right-[-2.5rem] z-0 sm:bottom-[-9.125rem] sm:right-[0rem]">
              <Image
                src={buildCmsUrl(content.Section_1_Image.data.attributes.url)}
                alt="First image large"
                className="w-full"
                width={content.Section_1_Image.data.attributes.width}
                height={content.Section_1_Image.data.attributes.height}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontMainSection;
