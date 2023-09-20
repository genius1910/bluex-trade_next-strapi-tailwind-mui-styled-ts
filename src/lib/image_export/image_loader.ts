import { createHash } from 'crypto';
import {
  Config,
  DefaultImageParser,
  formatValidate,
  getConfig,
} from './get_config';
import { encodeBase58 } from './base58'
import type { ImageLoaderProps } from 'next/dist/shared/lib/image-external';

const defaultImageParser: DefaultImageParser = (src: string) => {
  const path = src.split(/\.([^.]*$)/)[0];
  const extension = (src.split(/\.([^.]*$)/)[1] || '').split('?')[0];

  if (!path || !extension) {
    throw new Error(`Invalid path or no file extension: ${src}`);
  }

  let pathWithoutName = path.split('/').slice(0, -1).join('/');
  const name = path.split('/').slice(-1).toString();

  if (src.startsWith('http')) {
    pathWithoutName = pathWithoutName
      .replace(/^https?:\/\//, '')
      .split('/')
      .slice(1)
      .join('/');
  }

  return {
    pathWithoutName,
    name,
    extension,
  };
};

type BuildOutputInfoArgs = {
  src: string;
  width: number;
  config: Config;
};

export const buildOutputInfo = ({ src: _src, width, config }: BuildOutputInfoArgs) => {
  let src = _src;

  const parsedImageInformation = config.sourceImageParser
    ? config.sourceImageParser({ src, defaultParser: defaultImageParser })
    : defaultImageParser(src);

  let { extension } = parsedImageInformation;
  const {
    pathWithoutName,
    name,
    extension: originalExtension,
  } = parsedImageInformation;

  if (!formatValidate(extension) && extension.toLowerCase() !== 'svg') {
    return []
  }

  const isSVG = originalExtension.toLowerCase() === 'svg';

  if (config.convertFormat !== undefined) {
    const convertArray = config.convertFormat.find(
      ([beforeConvert]) => beforeConvert === extension,
    );
    if (convertArray !== undefined) {
      if (!formatValidate(convertArray[0]))
        throw Error(
          `Unauthorized format specified in \`configFormat\`. beforeConvert: ${convertArray[0]}`,
        );
      if (!formatValidate(convertArray[1]))
        throw Error(
          `Unauthorized format specified in \`configFormat\`. afterConvert: ${convertArray[1]}`,
        );

      extension = convertArray[1];
    }
  }

  const outputDir = `/${
    config.imageDir
      ? config.imageDir.replace(/^\//, '').replace(/\/$/, '')
      : '_next/static/chunks/images'
  }`;
  const externalOutputDir = `${
    config.externalImageDir
      ? config.externalImageDir.replace(/^\//, '').replace(/\/$/, '')
      : '_next/static/media'
  }`;

  const extensions = [
    ...new Set([...(config.generateFormats ?? ['webp']), extension]),
  ];
  return extensions.map((extension, index) => {
    if (extensions.length !== index + 1 && !formatValidate(extension))
      throw Error(
        `Unauthorized extension specified in \`generateFormats\`: ${extension}`,
      );

    const filename =
      config.filenameGenerator !== undefined
        ? config.filenameGenerator({
            path: pathWithoutName,
            name,
            width,
            extension,
          })
        : isSVG
        ? `${encodedFilename(pathWithoutName, name)}.${extension}`
        : `${encodedFilename(pathWithoutName, name)}_${width}.${extension}`;
    const output = `${outputDir}/${filename.replace(/^\//, '')}`;

    return { output, src, extension, originalExtension, externalOutputDir };
  });
};

const encodedFilename = (path: string, name: string) =>
  encodeBase58(createHash('sha256').update(`${path}/${name}`).digest())
// const encodedFilename = (path: string, name: string) =>
//   `${path}/${name}`

const inNode = typeof global !== 'undefined' && global.global === global || Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (process.env['NODE_ENV'] === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`;
  }

  const config = getConfig();
  const outputInfo = buildOutputInfo({ src, width, config }).at(-1);

  if (outputInfo === undefined) {
    throw new Error(`No output info found for ${src}`);
  }

  if (!inNode) {
    return outputInfo.output;
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const json = {
      output: outputInfo.output,
      src: `/${outputInfo.externalOutputDir}/${createHash('sha256')
        .update(
          src
            .replace(/^https?:\/\//, '')
            .split('/')
            .slice(1)
            .join('/'),
        )
        .digest('hex')}.${outputInfo.originalExtension}`,
      width,
      extension: outputInfo.extension,
      externalUrl: src,
    };

    fs.appendFileSync(
      path.join(
        process.cwd(),
        '.next/optimize-images-list.nd.json',
      ),
      JSON.stringify(json) + '\n',
    );
  } catch (e) {
    // ignore errors
  }

  return outputInfo.output;
}

export async function exportImage(url: string) {
  // const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, process.cwd());
  // const allSizes = [
  //   ...nextConfig.images.deviceSizes,
  //   ...nextConfig.images.imageSizes,
  // ];

  // const parsedImageInformation = config.sourceImageParser
  //   ? config.sourceImageParser({ url, defaultParser: defaultImageParser })
  //   : defaultImageParser(url);

  const allSizes = [
    16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
    3840,
  ];
  const config = getConfig();

  allSizes.map(async (width) => {
    const outputInfo = buildOutputInfo({ src: url, width, config }).at(-1);
    if (outputInfo === undefined) {
      throw new Error(`No output info found for ${url}`);
    }
    try {
      const fs = require('fs');
      const path = require('path');
      const json = {
        output: outputInfo.output,
        src: `/${outputInfo.externalOutputDir}/${createHash('sha256')
          .update(
            url
              .replace(/^https?:\/\//, '')
              .split('/')
              .slice(1)
              .join('/'),
          )
          .digest('hex')}.${outputInfo.originalExtension}`,
        width,
        extension: outputInfo.extension,
        externalUrl: url,
      };

      fs.appendFileSync(
        path.join(
          process.cwd(),
          '.next/optimize-images-list.nd.json',
        ),
        JSON.stringify(json) + '\n',
      );
    } catch (e) {
      // ignore errors
    }
  });
}
