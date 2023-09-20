import { createHash } from 'crypto';
import path from 'path';

import fs from 'fs-extra';
import uniqWith from 'lodash.uniqwith';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import loadConfig from 'next/dist/server/config';
import recursiveReadDir from 'recursive-readdir';
import sharp from 'sharp';

import { formatValidate, getConfig } from '../get_config';
import { buildOutputInfo } from '../image_loader';
import externalImagesDownloader from './external-images';
import {
  createCacheDir,
  defaultCacheDir,
  readCacheManifest,
  writeCacheManifest,
} from './utils/cache';

const parseNdJSON = (ndjson) =>
  ndjson
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line));

const processManifest = (manifestJson) => parseNdJSON(manifestJson);

const uniqueItems = (items) =>
  uniqWith(
    items,
    (a, b) =>
      a.output === b.output &&
      a.width === b.width &&
      a.extension === b.extension,
  );

export const getOptimizeResult = async ({
  destDir,
  noCache,
  cacheImages,
  cacheDir,
  cacheMeasurement,
  nonCacheMeasurement,
  errorMeasurement,
  pushInvalidFormatAssets,
  cliProgressBarIncrement,
  originalFilePath,
  quality,
  sharpOptions,
  output,
  width,
  extension,
}) => {
  if (formatValidate(extension)) {
    try {
      const filePath = path.join(destDir, output);
      await fs.ensureFile(filePath);

      const outputPath = path.join(cacheDir, output);
      await fs.ensureFile(outputPath);

      const imageBuffer = await fs.readFile(originalFilePath);

      // Cache process
      if (!noCache) {
        const cacheImagesFindIndex = cacheImages.findIndex(
          (cacheImage) => cacheImage.output === output,
        );
        const hash = createHash('sha256').update(imageBuffer).digest('hex');

        if (cacheImagesFindIndex === -1) {
          cacheImages.push({ output, hash });
        } else {
          const currentCacheImage = cacheImages[cacheImagesFindIndex];
          if (currentCacheImage?.hash === hash) {
            await fs.copy(outputPath, filePath);
            cacheMeasurement();
            cliProgressBarIncrement();
            return;
          } else {
            if (currentCacheImage !== undefined) currentCacheImage.hash = hash;
          }
        }
      }

      const image = sharp(imageBuffer, {
        sequentialRead: true,
        animated: true,
      });

      image.rotate().resize({ width, withoutEnlargement: true });

      switch (extension) {
        case 'jpeg':
          await image
            .jpeg({ quality, ...sharpOptions?.jpg })
            .toFile(outputPath);
          break;
        case 'jpg':
          await image
            .jpeg({ quality, ...sharpOptions?.jpg })
            .toFile(outputPath);
          break;
        case 'png':
          await image.png({ quality, ...sharpOptions?.png }).toFile(outputPath);
          break;
        case 'webp':
          await image
            .webp({ quality, ...sharpOptions?.webp })
            .toFile(outputPath);
          break;
        case 'avif':
          await image
            .avif({ quality, ...sharpOptions?.avif })
            .toFile(outputPath);
          break;
      }

      await fs.copy(outputPath, filePath);

      nonCacheMeasurement();
      cliProgressBarIncrement();
    } catch (error) {
      console.warn(error);
      cliProgressBarIncrement();
      errorMeasurement();
    }
  } else {
    try {
      const filePath = path.join(destDir, output);
      await fs.ensureFile(filePath);

      await fs.copy(originalFilePath, filePath);

      extension !== 'svg' && pushInvalidFormatAssets(originalFilePath);
      cliProgressBarIncrement();
    } catch (error) {
      console.warn(error);
      cliProgressBarIncrement();
      errorMeasurement();
    }
  }
};

const cwd = process.cwd();

export const optimizeImages = async ({
  manifestJsonPath,
  noCache,
  config,
  nextImageConfig,
  terse = false,
}) => {
  const destDir = path.resolve(cwd, config.outDir ?? 'out');

  let manifest = [];
  try {
    if (fs.existsSync(manifestJsonPath)) {
      manifest = uniqueItems(
        processManifest(await fs.readFile(manifestJsonPath, 'utf-8')),
      );
    }
  } catch (error) {
    console.error(error);
    throw Error(typeof error === 'string' ? error : 'Unexpected error.');
  }

  // Next Image allSizes
  const allSizes = [
    ...nextImageConfig.imageSizes,
    ...nextImageConfig.deviceSizes,
  ];

  // External image if present
  const remoteImages =
    config.remoteImages === undefined
      ? []
      : typeof config.remoteImages === 'function'
      ? await config.remoteImages()
      : config.remoteImages;
  if (remoteImages.length > 0) {
    const remoteImageList = new Set();

    remoteImages.forEach((url) => {
      remoteImageList.add(url);
    });

    manifest = manifest.concat(
      Array.from(remoteImageList)
        .map((url) =>
          allSizes.map((size) => {
            return buildOutputInfo({
              src: url,
              width: size,
              config,
            }).map(
              ({ output, extension, originalExtension, externalOutputDir }) => {
                const json = {
                  output,
                  src: `/${externalOutputDir}/${createHash('sha256')
                    .update(
                      url
                        .replace(/^https?:\/\//, '')
                        .split('/')
                        .slice(1)
                        .join('/'),
                    )
                    .digest('hex')}.${originalExtension}`,
                  width: size,
                  extension,
                  externalUrl: url,
                };

                return json;
              },
            );
          }),
        )
        .flat(2),
    );
  }
  if (manifest.some(({ externalUrl }) => externalUrl !== undefined)) {
    await externalImagesDownloader({ terse, manifest, destDir });
  }

  const publicDir = path.resolve(cwd, 'public');
  if (fs.existsSync(publicDir)) {
    // eslint-disable-next-line no-console
    console.log(`\n- Collect images in public directory -`);
    const publicDirFiles = await recursiveReadDir(publicDir);
    const publicDirImages = publicDirFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return (
        ext === '.png' ||
        ext === '.jpg' ||
        ext === '.jpeg' ||
        ext === '.webp' ||
        ext === '.avif' ||
        ext === '.gif'
      );
    });
    manifest = manifest.concat(
      publicDirImages
        .map((file) =>
          allSizes.map((size) => {
            const src = file.replace(publicDir, '');
            return buildOutputInfo({
              src,
              width: size,
              config,
            }).map(({ output, extension }) => {
              const json = {
                output,
                src,
                width: size,
                extension,
              };

              return json;
            });
          }),
        )
        .flat(2),
    );
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(`\n- Image Optimization -`);
  }

  let cacheImages = [];

  if (!noCache) {
    await createCacheDir();
    cacheImages = readCacheManifest();
  }

  const promises = [];

  let measuredCache = 0;
  let measuredNonCache = 0;
  let measuredError = 0;
  const invalidFormatAssets = new Set([]);

  const cacheMeasurement = () => (measuredCache += 1);
  const nonCacheMeasurement = () => (measuredNonCache += 1);
  const errorMeasurement = () => (measuredError += 1);
  const pushInvalidFormatAssets = (asset) => invalidFormatAssets.add(asset);

  for (const item of manifest) {
    const originalFilePath = path.join(destDir, item.src);

    promises.push(
      getOptimizeResult({
        destDir,
        noCache,
        cacheImages,
        cacheDir: defaultCacheDir,
        cacheMeasurement,
        nonCacheMeasurement,
        errorMeasurement,
        pushInvalidFormatAssets,
        cliProgressBarIncrement: () => undefined,
        originalFilePath,
        quality: config.quality ?? 75,
        sharpOptions: config.sharpOptions ?? {},
        ...item,
      }),
    );
  }

  await Promise.all(promises);

  if (!noCache) {
    writeCacheManifest(cacheImages);
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(
      `Cache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}, Error assets: ${measuredError}`,
    );

    if (invalidFormatAssets.size !== 0) {
      // eslint-disable-next-line no-console
      console.log(
        `\nThe following images are in a non-optimized format and a simple copy was applied.\n`,
        Array.from(invalidFormatAssets).join('\n'),
      );
    }

    // eslint-disable-next-line no-console
    console.log('\nSuccessful optimization!');
  }
};

export const run = async ({ noCache = false }) => {
  // eslint-disable-next-line no-console
  console.log('\noptimize-images: Optimize images.');

  const config = getConfig();
  const manifestJsonPath = path.resolve(
    cwd,
    '.next/optimize-images-list.nd.json',
  );

  const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, cwd);

  await optimizeImages({
    manifestJsonPath,
    noCache,
    config,
    nextImageConfig: nextConfig.images,
  });
};
