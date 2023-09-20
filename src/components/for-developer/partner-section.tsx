import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/for-developer-page';
import Image from 'next/image';
import PartnerLogo from './partner-logo';

const PartnerSection = ({ content }: { content: LocalizedContent }) => {
  const partnerLogos = content.Section_2_Logo_List.data;
  return (
    <div className="relative h-auto w-full">
      <div className="mx-auto my-0 box-border flex w-full flex-col items-center justify-center px-[1.25rem] py-[5rem] lg:w-[60rem] lg:px-0">
        <div className="flex flex-col">
          <div className="font-stretch-normal font-style-normal font-roboto leading-2.875rem mb-[3.188rem] text-center text-[1.75rem] font-black tracking-tighter text-secondary">
            {content.Section_2_Title}
          </div>
          <div className="mb-[2rem] flex flex-col flex-wrap items-center justify-center sm:flex-row lg:flex-nowrap">
            <div className="grow-1 shrink-1 basis[2.5rem] mt-[1rem] h-[2.5rem] w-full text-center sm:h-2/5 lg:mt-0 ">
              <Image
                src={buildCmsUrl(
                  content.Section_2_Main_Logo.data.attributes.url,
                )}
                alt="Main partner image"
                className="inline h-auto sm:h-2/5"
                width={content.Section_2_Main_Logo.data.attributes.width}
                height={content.Section_2_Main_Logo.data.attributes.height}
              />
            </div>
          </div>
          <div className="flex h-fit flex-col flex-wrap items-center justify-center sm:flex-row lg:h-[4.375rem] lg:flex-nowrap lg:items-end">
            {partnerLogos.map((data, index) => (
              <PartnerLogo
                isFirst={index === 0}
                isLast={index === partnerLogos.length - 1}
                logoData={data}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
