import { buildCmsUrl } from '@/cms/base';
import { MediaList as MediaListType } from '@/cms/for-developer-page';
import Image from 'next/image';

interface MediaListProps {
  mediaList: MediaListType[];
}

export default function MediaList({ mediaList }: MediaListProps) {
  return (
    <div className="relative z-10 mx-auto flex flex-col items-center overflow-visible">
      {mediaList.map((media, index) => (
        <Media
          key={index}
          title={media.description.title}
          content={media.description.content}
          image_url={buildCmsUrl(media.image.data?.attributes.url)}
          height={media.image.data?.attributes.height || 0}
          width={media.image.data?.attributes.width || 0}
          index={index}
        />
      ))}
    </div>
  );
}

function Media({ title, content, image_url, height, width, index }: any) {
  return (
    <div
      className={`${
        index !== 0 ? 'mt-[9.375rem]' : ''
      } flex w-full flex-row flex-wrap items-center justify-center lg:flex-col lg:justify-between`}
    >
      <div
        className={`${
          index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
        }  lg:flex-column flex w-full flex-row flex-wrap items-center justify-center lg:justify-between`}
      >
        <div className="lg:mb-initial grow-1 shrink-1 mb-0 mb-[1.875rem] flex w-full basis-full flex-col items-center lg:shrink-0 lg:grow-0 lg:basis-[30rem] lg:items-start">
          <div className="font-lato mb-[1.25rem] whitespace-pre-wrap text-center text-[1.75rem] font-bold leading-[2.625rem] tracking-normal text-white lg:text-left">
            {title}
          </div>
          <div className="lg:text-normal font-lato leading-1.5rem whitespace-normal text-center text-[1rem] font-normal text-white text-opacity-100">
            {content}
          </div>
        </div>
        <div className="rounded-0.5rem grow-1 shrink-1 flex h-fit min-h-[12rem] w-fit basis-full justify-center shadow-lg lg:min-h-[unset] lg:shrink-[unset] lg:grow-[unset] lg:basis-[30rem] lg:justify-normal">
          <span className="inline-block text-transparent">
            <Image
              src={image_url}
              alt="first media image"
              className="w-full"
              width={width}
              height={height}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
