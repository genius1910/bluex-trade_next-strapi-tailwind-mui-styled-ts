import { LocalizedContent } from '@/cms/for-developer-page';
import MediaList from './media-list';

const MediaSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative h-auto w-full bg-gradient-to-b from-[#091E37] to-[#001D27] bg-cover">
      <div className="mx-auto my-[0rem] box-border flex w-full flex-col items-center justify-center px-[1.25rem] pb-[4.25rem] pt-[5rem] sm:pb-[7.313rem] lg:w-[62.5rem] lg:px-0">
        <div className="font-stretch-normal font-style-normal font-roboto leading-2.875rem mb-[4rem] w-full whitespace-pre-wrap text-center text-[1.75rem] font-black tracking-tight text-secondary sm:w-[37.5rem] sm:whitespace-normal">
          {content.Section_3_Title}
        </div>
        <MediaList mediaList={content.Section_3_Media_List} />
      </div>
    </div>
  );
};

export default MediaSection;
