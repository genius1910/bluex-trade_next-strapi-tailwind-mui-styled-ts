import path from 'path'
import fs from 'fs-extra'

export const defaultCacheDir = path.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images')
export const defaultCacheFilePath = path.join(defaultCacheDir, 'cached-images.json')

export const createCacheDir = async (cacheDir = defaultCacheDir) => {
  await fs.mkdirp(cacheDir)
}

export const readCacheManifest = (filePath = defaultCacheFilePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (_) {
    return []
  }
}

export const writeCacheManifest = (cacheImages, filePath = defaultCacheFilePath) => {
  fs.writeFileSync(filePath, JSON.stringify(cacheImages), 'utf-8')
}
