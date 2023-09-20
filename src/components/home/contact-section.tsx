import Image from 'next/image';
import React from 'react';
import { MarkDownTranslator } from '@/utils/MarkDownTranslator';
import { Button } from '@/cms/home';
import { ImageEntry } from '@/cms/types';
import { buildCmsUrl } from '@/cms/base';

const ContactSection = ({
  title,
  linkButton,
  bg,
}: {
  title: string | null;
  linkButton: Button | null;
  bg: ImageEntry;
}) => {
  return (
    <div className="relative h-full overflow-hidden">
      <Image
        className="absolute left-1/2 top-1/2 -z-10 mx-auto block h-full w-[250%] !max-w-[250%] -translate-x-1/2 -translate-y-1/2 transform md:w-[140%] md:!max-w-[140%] lg:w-full"
        src={buildCmsUrl(bg.data?.attributes.url)}
        alt="front-contact-bg"
        width={1320}
        height={414}
      />
      <div className=" box-border flex w-full flex-col items-center justify-center px-5 pb-[4.375rem] pt-[2.563rem] md:pb-[91px] md:pt-[5.063rem] lg:mx-auto lg:w-[60rem] lg:pb-[5.688rem] lg:pt-[81px]">
        <div className="mb-[1.625rem] max-w-[34rem] whitespace-pre-wrap py-9 text-center text-[2.25rem] font-medium leading-[2.75rem] tracking-normal text-white">
          {MarkDownTranslator(title)}
        </div>
        <a
          className=" rounded-[31.5rem] border-none bg-[#009bd2] px-8 py-4 text-center text-[1.375rem] font-bold normal-case leading-6  text-white hover:bg-[#00afec]"
          href={linkButton?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkButton?.text}
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
