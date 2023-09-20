import { LocalizedContent } from '@/cms/home';
import Image from 'next/image';
import Link from 'next/link';
import { AvailableLocaleType } from '@/cms/types';
import { buildCmsUrl } from '@/cms/base';

const DescriptionSection = ({
  content,
  locale,
}: {
  content: LocalizedContent;
  locale: AvailableLocaleType;
}) => {
  return (
    <div className="h-fit w-full bg-[#009bd2]">
      <div className="mx-auto box-border flex w-full flex-col flex-wrap items-start justify-between px-5 pb-[3.157rem] pt-[3.75rem] md:flex-row lg:w-[60rem] lg:flex-row lg:px-0 lg:pb-[5.688rem] lg:pt-[8.875rem]">
        <div className="mb-10 flex w-full flex-col text-white md:mb-0 md:mr-0 md:w-[360px] lg:mb-2.5 lg:mr-[7.5rem] lg:w-[336px]">
          <div className="mb-[1.875rem] w-full">
            <div className="mb-[0.188rem] font-sans text-lg font-black leading-6">
              {content.Section_3_Type}
            </div>
            <div className="font-title text-4xl font-bold leading-[3rem]">
              {
                content.Section_3_Title.split(
                  content.Section_3_Title_Styled_Keyword + '',
                )[0]
              }
              <span className="italic">
                {content.Section_3_Title_Styled_Keyword}
              </span>
              &nbsp;
              {
                content.Section_3_Title.split(
                  content.Section_3_Title_Styled_Keyword + '',
                )[1]
              }
            </div>
            <div className=" font-sans text-lg font-normal leading-6">
              {content.Section_3_Content}
            </div>
          </div>
          <div className="mb-[1.875rem] text-xl font-bold leading-[1.875rem]">
            {content.Section_3_Feature_List.map(({ content }, index) => (
              <div key={`feature-item-${index}`}>{content}</div>
            ))}
          </div>
          <Link
            href={locale + content.Section_3_Button?.link || '/'}
            className="w-40"
          >
            <button className="text-4 w-full cursor-pointer rounded-[18px] border-none bg-white px-4 py-1 text-center font-title font-semibold leading-normal tracking-normal text-[#009bd2] hover:bg-[#18335e] hover:text-white">
              {content.Section_3_Button?.text}
            </button>
          </Link>
        </div>
        <div className="w-full flex-1 flex-shrink flex-grow md:w-1/2 lg:w-[33.75rem]">
          <Image
            src={buildCmsUrl(content.Section_3_Image.data?.attributes.url)}
            alt={''}
            width="504"
            height="389"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
