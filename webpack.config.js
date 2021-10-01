const Encore = require('@symfony/webpack-encore');
const { resolve } = require('path');
const { version } = require('uikit/package.json');

const paths = {
  output: resolve(__dirname, './build/'),
  pattern: /\.(jpe?g|png|gif|svg|webp)$/i,
  public: 'build',
  source: resolve(__dirname, './assets'),
  vendor: resolve(__dirname, './node_modules'),
};

Encore
  // Set output and public paths
  .setOutputPath(`${paths.output}/`)
  .setPublicPath(`/${paths.public}`)

  // Clean output before build
  .cleanupOutputBeforeBuild()

  // JavaScript
  .addEntry('app', `${paths.source}/js/index.js`)
  .disableSingleRuntimeChunk()
  .configureBabel(() => {}, {
    includeNodeModules: ['uikit'],
    useBuiltIns: 'usage',
    corejs: 3,
  })
  .configureDefinePlugin((options) => {
    options.VERSION = JSON.stringify(version);
  })
  .addAliases({ '@': `${paths.source}/js` })
  .addAliases({ 'uikit-util': `${paths.vendor}/uikit/src/js/util` })

  // CSS
  .enableSassLoader((options) => {
    options.sassOptions.quietDeps = true;
  }, { resolveUrlLoader: false })

  // Source maps and cache buster
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());

// Advanced config options
const config = Encore.getWebpackConfig();
config.optimization.concatenateModules = true;

module.exports = config;
