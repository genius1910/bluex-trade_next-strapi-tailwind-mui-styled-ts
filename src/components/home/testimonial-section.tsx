'use client';
import { LocalizedContent } from '@/cms/home';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import IconComma from '@/images/icon/icon-quote.inline.svg';
import IconFiveStars from '@/images/icon/icon-five-stars-ranking.inline.svg';

const TestimonialSection = ({ content }: { content: LocalizedContent }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string | null) {
      return (
        '<span class="' +
        className +
        '" style="height:16px; width:16px;"></span>'
      );
    },
  };
  return (
    <div className="relative h-fit w-full bg-[#F3FBFE] bg-cover bg-center">
      <div className="testimonialSwiper mx-auto box-border flex w-full flex-col items-center px-5 pb-8 pt-[6.25rem] lg:w-[60rem]">
        <div className=" mb-[2.875rem] whitespace-pre-wrap text-center text-[2.25rem] font-bold leading-[3rem] tracking-normal text-[#18335e]">
          {content.Section_6_Title}
        </div>
        <Swiper
          spaceBetween={0}
          effect={'coverflow'}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
          }}
          navigation={true}
          pagination={pagination}
          modules={[EffectCoverflow, Pagination, Navigation]}
          onClick={(swiper: any) => {
            const ai = swiper.activeIndex;
            const ci = swiper.clickedIndex;
            const length = (swiper as any).visibleSlidesIndexes.length;
            if (ai < ci || (ci === 1 && ai === length)) {
              swiper.slideNext();
              return;
            }

            if (ai > ci || (ai === 1 && ci === length)) {
              swiper.slidePrev();
            }
          }}
        >
          {content.Section_6_Testimonial_List.map(
            ({ content, name, position, company }, index) => (
              <SwiperSlide key={`testimonial-item-${index}`}>
                <div className="relative mx-0 my-8 h-[28rem] w-full rounded-[4px] bg-white px-5 py-6 pt-[3.75rem] shadow-testimonial-item md:mx-8 md:my-0 md:h-[22rem] md:w-[30rem] md:px-10 md:pb-10">
                  <div className="absolute left-0 top-5 md:-left-5">
                    <IconComma />
                  </div>
                  <div className="mb-[0.125rem]">
                    <IconFiveStars />
                  </div>
                  <div className="box-border flex flex-col font-title text-base font-normal italic leading-[1.4rem] tracking-normal">
                    {content}
                  </div>
                  <div className="absolute bottom-[1.8rem] left-10">
                    <div className="font-normal text-[#009bd2]">{`${name} | ${position}`}</div>
                    <div className="font-normal">{company}</div>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
    </div>
  );
};
export default TestimonialSection;
