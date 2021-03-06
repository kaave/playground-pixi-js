const fs = require('fs');
const path = require('path');
const globby = require('globby');
const webpack = require('webpack');

const paths = {
  build: path.join(process.cwd(), 'build'),
  assets: path.join(process.cwd(), 'assets'),
  script: path.join(process.cwd(), 'src', 'scripts'),
  view: path.join(process.cwd(), 'src', 'views'),
};
paths.lib = path.join(paths.assets, 'lib');

const viewData = require(path.join(paths.view, '/data.json'));

const imageMin = {
  png: {
    // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま) -で繋いで2つ書くとmin-maxという意味合いらしいがよくわかりません
    quality: '65-80',
    // 処理速度を指定 1(じっくり) ~ 10(最速) 5％くらい質に違いが出るらしい
    speed: 1,
    // ディザリングを設定 0(無効) ~ 1(最大)
    floyd: 0,
    // フロイド-スタインバーグ・ディザリングを無効化するか
    // https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AD%E3%82%A4%E3%83%89-%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%B3%E3%83%90%E3%83%BC%E3%82%B0%E3%83%BB%E3%83%87%E3%82%A3%E3%82%B6%E3%83%AA%E3%83%B3%E3%82%B0
    nofs: false
  },
  jpg: {
    // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま)
    quality: 80,
    // プログレッシブjpegを作成するか falseにするとベースラインjpeg
    progressive: true,
  },
  gif: {
    // 最適化レベル 1(ちょっと)-3(そこそこ)で指定
    optimizationLevel: 3,
  },
};

const entry = {
  index: path.join(paths.script, 'index.ts'),
  filter: path.join(paths.script, 'filter.ts'),
  slice: path.join(paths.script, 'slice.ts'),
  '2018-09-08': path.join(paths.script, '2018-09-08.ts'),
};

module.exports = {
  /*
   * webpack configs
   */
  entry,
  output: {
    path: paths.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['json', '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.ejs$/,
        use: [
          'html-loader',
          {
            loader: 'ejs-html-loader',
            options: { ...viewData, isProduction: process.env.NODE_ENV === 'production' },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // bypassOnDebug: true,
              mozjpeg: imageMin.jpg,
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: imageMin.png,
              gifsicle: imageMin.gif,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(txt|md|frag)$/,
        use: 'raw-loader'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  /*
   * not webpack configs
   */
  paths,
  imageMin,
  views: globby.sync([
    path.join(paths.view, '**', '*.ejs'),
    path.join('!', paths.view, '**', '_*.ejs'),
  ]).map(template => ({
    template,
    filename: template.replace(`${paths.view}/`, '').replace(/\.ejs$/, ''),
  })),
  viewData,
};
