'use client';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FAQList } from '@/cms/home';
import { MarkDownTranslator } from '@/utils/MarkDownTranslator';
import IconFoldOff from '@/images/icon/icon-fold-off.inline.svg';
import IconFoldOn from '@/images/icon/icon-fold-on.inline.svg';

const FAQSection = ({
  title,
  faqs,
}: {
  title: string | null;
  faqs: FAQList[];
}) => {
  const [switcher, setSwitcher] = useState(faqs.map(() => false));
  const theme = useTheme();
  const isNotMobileDevice = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className="relative h-fit w-full overflow-x-hidden">
      <div className="relative box-border flex w-full flex-col items-center overflow-x-visible px-5 py-[4.375rem] md:py-[6.25rem] lg:mx-auto lg:w-[72rem]">
        <div className="hidden lg:block">
          <div className="absolute -right-[25.313rem] top-20 flex w-[31.313rem] flex-col">
            <div className="mb-[0.563rem] h-[2.215rem] -rotate-[30deg] transform rounded-[1.688rem] bg-[#009bd2] opacity-60" />
            <div className="ml-[8.25rem] h-[1.063rem] w-[16.188rem] -rotate-[30deg] transform rounded-lg bg-[#63B56F] " />
          </div>
        </div>
        <div className="mb-[3.75rem] whitespace-pre-wrap text-center text-[2.25rem] font-bold leading-[3rem] tracking-normal text-[#18335e]">
          {title}
        </div>
        <div className="flex w-full flex-col justify-center lg:w-[58.75rem]">
          {faqs.map(({ title, titleSize, content }, index) => (
            <div
              key={`faq-item-${index}`}
              className="flex w-full flex-col items-center overflow-hidden"
            >
              <button
                className={`flex w-full flex-row items-center justify-between border-b border-solid border-b-[#DCEDF2] !font-[sans-serif] bg-white py-3 pl-10 pr-5 text-left text-[18px] font-bold leading-[3rem] text-[#18335e] focus-visible:outline-none`}
                onClick={() => {
                  setSwitcher(
                    switcher.map((item, idx) => (idx === index ? !item : item)),
                  );
                }}
              >
                {title}
                {isNotMobileDevice &&
                  (switcher[index] ? <IconFoldOff /> : <IconFoldOn />)}
              </button>
              <div
                className={`${
                  (!isNotMobileDevice || switcher[index]) && 'max-h-[30rem]'
                } text-4 box-border max-h-0 w-full bg-[#F4FCFE] font-normal text-[#18335e] transition-all duration-500 ease-out `}
              >
                <div className="h-full w-full px-10 py-4 pl-10 md:pr-[90px]">
                  {MarkDownTranslator(content)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
