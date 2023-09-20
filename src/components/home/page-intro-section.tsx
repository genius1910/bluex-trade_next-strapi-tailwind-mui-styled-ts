import { LocalizedContent } from '@/cms/home';
import { AvailableLocaleType } from '@/cms/types';
import { backgroundImageSetStyle } from '@/components/tools/background-imageset';
import Link from 'next/link';

const PageIntroSection = ({
  content,
  locale,
}: {
  content: LocalizedContent;
  locale: AvailableLocaleType;
}) => {
  return (
    <div className="relative h-fit w-full bg-primary">
      <div className="felx-row relative box-border flex flex-col items-center justify-center px-6 py-4 md:mx-0 md:flex-row md:px-0 md:pb-[5.188rem] md:pt-[6.438rem]">
        {content.Section_4_Page_Intro_List.map(
          ({ title, content, attachment, button, background }, index) => (
            <div
              key={`page-intro-item-${index}`}
              className=" h-128 mx-[50px] my-6 flex h-[496px] w-full flex-initial flex-shrink-0 flex-grow-0 flex-col items-center gap-[0.375rem] rounded-[1.25rem] bg-cover bg-center px-4 pt-4 md:my-0 md:h-[32rem] md:flex-1 lg:w-[28.75rem] lg:flex-none lg:rounded-lg lg:px-[74px] lg:pt-10"
              style={backgroundImageSetStyle(background.data?.attributes.url)}
            >
              <div className="whitespace-pre-wrap text-left font-title text-[1.75rem] font-bold leading-[2.938rem] text-[#18335e]">
                {title}
              </div>
              <div className="text-4 text-center font-title font-normal leading-[1.5rem] tracking-normal text-[#18335e]">
                {content}
              </div>
              {attachment && (
                <div className="-mt-[0.375rem]">
                  <Link href={locale + attachment.link} className="text-center">
                    {attachment.text}
                  </Link>
                </div>
              )}
              <Link
                href={locale + button.link}
                className="text-center md:mt-[18px] lg:mt-5"
              >
                <button className="w-40 rounded-[18px] border-none bg-[#009bd2] px-3 py-1.5 text-center text-base font-bold normal-case leading-6 text-white hover:bg-[#00afec]">
                  {button.text}
                </button>
              </Link>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default PageIntroSection;
