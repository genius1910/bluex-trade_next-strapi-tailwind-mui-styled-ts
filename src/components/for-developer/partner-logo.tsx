import { ImageData } from '@/cms/types';
import { buildCmsUrl } from "@/cms/base";
import Image from "next/image";

interface LogoDataProps {
  logoData: ImageData;
  isFirst: boolean;
  isLast: boolean;
}

export default function PartnerLogo({ logoData, isFirst, isLast }: LogoDataProps) {
  const logo_url = buildCmsUrl(logoData.attributes.url);
  return (
    <div className={`h-[2.5rem] text-center mt-[1rem] grow-1 sm:grow-[unset] shrink-1 sm:shrink-[unset] basis-[2.5rem] sm:basis-[unset] w-full sm:w-[unset] ${!isFirst ? 'ml-[0rem] mt-[2.5rem] sm:ml-[3.125rem] sm:mt-0' : ''} ${isLast ? 'h-[4.375rem]' : ''}`}>
      <Image
        src={logo_url}
        alt="partner logo"
        className="mx-auto sm:mx-[unset] h-full w-auto text-center"
        width={logoData.attributes.width}
        height={logoData.attributes.height}
      />
    </div>
  )
};