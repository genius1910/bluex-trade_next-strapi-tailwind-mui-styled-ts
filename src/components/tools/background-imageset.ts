import { buildCmsUrl } from '@/cms/base';
import imageLoader from '@/lib/image_export/image_loader';

export function backgroundImageSetStyle(src: string | undefined | null, width: number = 1920) {
  if (!src) return {}

  const bg = imageLoader({
    src: buildCmsUrl(src),
    width,
  });

  // const bg2x = imageLoader({
  //   src: buildCmsUrl(src),
  //   width: 3840,
  // });

  return {
    background: `transparent url(${bg}) no-repeat center center`,
    // backgroundImage: `-webkit-image-set(url(${bg}) 1x, url(${bg2x}) 2x)`,
    // backgroundSize: 'cover'
  };
}
