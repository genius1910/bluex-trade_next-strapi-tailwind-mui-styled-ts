'use client';
import { LocalizedContent } from '@/cms/home';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import parse from 'html-react-parser';
import { buildCmsUrl } from '@/cms/base';

const LogoSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative h-fit w-full bg-white">
      <div className="relative box-border flex flex-col items-center px-10 pb-[5.625rem] pt-[3.428rem] md:px-0">
        <div className="parse-span z-20 mb-[1.875rem] whitespace-pre-wrap text-center text-4xl font-bold leading-[3rem] text-[#18335e]">
          {parse(content.Section_5_Title)}
        </div>
        <Swiper
          className="mx-10 h-[9.75rem] w-full md:mx-0"
          spaceBetween={60}
          slidesPerView={5}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // when window width is >= 768px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            960: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
          }}
          modules={[Autoplay]}
        >
          {content.Section_5_Logo_List.data.map((ImageData, index) => (
            <SwiperSlide
              key={`logo-item-${index}`}
              className="!flex h-full w-full items-center justify-center"
            >
              <Image
                className="h-auto max-h-full w-full max-w-[20.625rem] items-center"
                src={buildCmsUrl(ImageData?.attributes.url)}
                alt={''}
                width={270}
                height={98}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default LogoSection;
