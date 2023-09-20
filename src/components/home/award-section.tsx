'use client';
import { LocalizedContent } from '@/cms/home';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { MarkDownTranslator } from '@/utils/MarkDownTranslator';
import { buildCmsUrl } from '@/cms/base';

const AwardSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative h-fit w-full">
      <div className="tems-center absolute -top-20 left-0 right-0 mx-auto box-border hidden w-full flex-nowrap items-center justify-center rounded-[1.188rem] bg-white px-5 py-1.5 lg:flex lg:w-[64rem] lg:px-0">
        <div className="w-[22.5rem] whitespace-pre-wrap font-title text-[28px] font-medium text-[#18335e]">
          {MarkDownTranslator(content.Section_2_Title)}
        </div>
        {content.Section_2_Media_List.map(({ image, description }, index) => (
          <div
            className="m-[1.875rem] flex w-14 flex-initial flex-shrink-0 flex-grow-0 flex-col items-center "
            key={`award-list-${index}`}
          >
            <div className="flex items-center">
              <Image
                className="max-h-full max-w-[3.5rem]"
                src={buildCmsUrl(image.data?.attributes.url)}
                alt={description.title}
                width="56"
                height="56"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="relative box-border flex flex-col items-center py-8 lg:hidden">
        <div className="mb-7 w-[22.5rem] whitespace-pre-wrap text-center font-title text-[28px] font-medium text-[#18335e]">
          {MarkDownTranslator(content.Section_2_Title)}
        </div>
        <Swiper
          className="h-[9.75rem] w-full"
          spaceBetween={60}
          slidesPerView={5}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
          modules={[Autoplay]}
        >
          {content.Section_2_Media_List.map(({ image, description }, index) => (
            <SwiperSlide
              key={index}
              className="!flex h-full flex-col items-center justify-center"
            >
              <div className="mb-4 flex h-24 items-center justify-center">
                <Image
                  className="h-auto max-h-full w-auto max-w-[10.875rem]"
                  src={buildCmsUrl(image.data?.attributes.url)}
                  alt={description.title}
                  width="128"
                  height="128"
                />
              </div>
              <div className="w-[14rem] whitespace-pre-wrap text-center font-title text-[1.125rem] font-black leading-[1.5rem] -tracking-normal text-[#18335e]">
                {description.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default AwardSection;
