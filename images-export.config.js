module.exports = {
  imageDir: '_opt',
  quality: 90,
  convertFormat: [
    ['png', 'webp'],
    ['jpg', 'webp']
  ],
  generateFormats: ['webp']
  // filenameGenerator: ({ path, name, width, quality, extension }) =>
  //   `${path.replace(/^\//, '').replace(/\//g, '-')}-${name}.${width}.${quality}.${extension}`,
}
