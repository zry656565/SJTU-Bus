fis.set('project.ignore', [
  'build/**',
  'logs/**',
  '.git/**',
  '.svn/**',
  '.idea/**',
  'node_modules/**',
  '.gitignore',
  '**.md',
  'LICENSE',
  'fis-conf.js',
  'package.json'
]);

fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});

// 将图片的请求重定向到 upyun 提供的 CDN 上
fis.match('images/(**.{png,jpg,gif})', {
  release: '/resources/sjtubus/$1',
  domain: 'https://jerryz.sgp1.cdn.digitaloceanspaces.com'
});

fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});

fis.media('prod').match('*.{js,less}', {
  useHash: true
});

fis.media('prod').match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.media('prod').match('*.less', {
  optimizer: fis.plugin('clean-css')
});