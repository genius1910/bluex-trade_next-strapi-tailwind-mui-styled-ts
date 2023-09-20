import { LocalizedContent } from '@/cms/home';
import parse from 'html-react-parser';

// import BackgroundVideo from "../../images/front-main/BlueX Page animated background.mp4";

export default function FrontMainSection({
  content,
}: {
  content: LocalizedContent;
}) {
  return (
    <div className="relative mt-24 h-[41.75rem] w-full overflow-hidden bg-white md:mt-0 md:h-[41.75rem] lg:h-auto">
      <div className="absolute bottom-0 left-0 right-0 top-0 lg:relative">
        <video
          id="BGMainVideo"
          className=" lg:mb-0 mb-[-0.5rem] h-full w-screen lg:max-w-none object-cover object-center "
          autoPlay={true}
          preload="auto"
          muted
          loop
        >
          <source
            src="https://www.bluexpay.com/static/24484696578bc710b212f3cae84878aa/Blue_X_Page_animated_background_Whats_App_Video_2022_08_26_at_7_54_42_PM_905b94067b.mp4"
            type="video/mp4"
          />
          <a
            href="https://www.bluexpay.com/static/5daa9eb7adaf5967ee82ab206970d731/Blue_X_Page_animated_background_preview_4b504b22b9.jpg"
            aria-label="Background_Video_Preview"
          >
            {' '}
          </a>
        </video>
      </div>
      <div
        // MainSectionWrapper
        className="relative top-0 flex h-full w-full items-center bg-[rgba(24,51,94,0.5)] lg:absolute"
      >
        <div
          // MainSectionContent
          className="box-sizing mx-auto my-0 box-border flex w-full flex-col overflow-x-visible px-5 md:flex-row lg:w-[60rem]"
        >
          <div
            // TitleWrapper
            className="mr-[6.25rem] flex w-full flex-col md:w-full lg:mr-0"
          >
            <div
              // Title
              className="z-20 mb-[1.375rem] w-full whitespace-pre-wrap text-left font-title text-[3.125rem] font-bold not-italic leading-[3rem] tracking-[normal] text-white md:w-[576px]"
            >
              {parse(content.Section_1_Title)}
            </div>
            <div className="mb-[2.625rem] md:w-[400px]">
              <div className="whitespace-pre-wrap text-left font-title text-base font-normal not-italic tracking-[normal] text-white">
                {content.Section_1_Content}
              </div>
            </div>
            <button
              className="w-36 rounded-[18px] border-none bg-[#009bd2] px-2 py-1.5 text-center text-sm font-bold normal-case leading-6 text-white hover:bg-[#00afec]"
              // onClick={() => btnCallback(true)}
            >
              {content.Section_1_Button.text}
            </button>
          </div>
          {/* <ImgRelativeFrame>
            <ImgWrapper />
          </ImgRelativeFrame> */}
        </div>
      </div>
    </div>
  );
}
