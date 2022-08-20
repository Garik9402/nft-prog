// gulp
import gulp from "gulp";
import gulpif from "gulp-if";

import browserSync, { init } from "browser-sync";
import rename from "gulp-rename";
import plumber from "gulp-plumber";

import { deleteAsync } from "del";

// html
import htmlMin from "gulp-htmlmin";

// scss
import sass from "sass";
import gulpSass from "gulp-sass";
const scssTOcss = gulpSass(sass);
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import gcmq from "gulp-group-css-media-queries";

// js
import webpack from "webpack-stream";
import terser from "gulp-terser";
// fonts

//img
import gulpimage from "gulp-image";

let dev = false;

// пути
const path = {
  src: {
    base: "src/",
    html: "src/*.html",
    scss: "src/scss/styles.scss",
    js: "src/js/script.js",
    img: "src/images/**/*.{jpg,svg,png,jpeg,gif}",
    fonts: "src/fonts/**/*.*",
  },

  dist: {
    base: "dist/",
    html: "dist/",
    css: "dist/css/",
    js: "dist/js/",
    img: "dist/images/",
    fonts: "dist/fonts/",
  },

  watch: {
    base: "src/",
    html: "src/*.html",
    scss: "src/scss/style.scss",
    js: "src/js/**/*.*",
    img: "src/images/**/*.{jpg,svg,png,jpeg,gif}",
  },
};

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(
      gulpif(
        !dev,
        htmlMin({
          removeComments: true,
          collapseWhitespace: true,
        })
      )
    )
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream());
};

export const scss = () => {
  return gulp
    .src(path.src.scss)
    .pipe(gulpif(dev, sourcemaps.init()))
    .pipe(scssTOcss().on("error", scssTOcss.logError))
    .pipe(
      gulpif(
        !dev,
        autoprefixer({
          cascade: false,
        })
      )
    )
    .pipe(gulpif(!dev, gcmq()))
    .pipe(gulpif(!dev, gulp.dest(path.dist.css)))
    .pipe(
      gulpif(
        !dev,
        cleanCSS({
          2: {
            spcialComments: 0,
          },
        })
      )
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());
};
const configWebpack = {
  mode: dev ? "development" : "production",
  devtool: dev ? "eval-source-map" : false,
  optimization: {
    minimize: false,
  },
  output: {
    filename: "script.js",
  },
  module: {
    rules: [],
  },
};

if (!dev) {
  configWebpack.module.rules.push({
    test: /\.(js)$/,
    exclude: /(node_modules)/,
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-transform-runtime"],
    },
  });
}
export const js = () => {
  return gulp
    .src(path.src.js)
    .pipe(plumber())
    .pipe(webpack(configWebpack))
    .pipe(gulpif(!dev, gulp.dest(path.dist.js)))
    .pipe(gulpif(!dev, terser()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpif(!dev, gulp.dest(path.dist.js)))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(path.dist.js));
};

export const image = () => {
  return gulp
    .src(path.src.img)
    .pipe(
      gulpimage({
        optipng: ["-i 1", "-strip all", "-fix", "-o7", "-force"],
        pngquant: ["--speed=1", "--force", 256],
        zopflipng: ["-y", "--lossy_8bit", "--lossy_transparent"],
        jpegRecompress: [
          "--strip",
          "--quality",
          "medium",
          "--min",
          40,
          "--max",
          80,
        ],
        mozjpeg: ["-optimize", "-progressive"],
        gifsicle: ["--optimize"],
        svgo: ["--enable", "cleanupIDs", "--disable", "convertColors"],
      })
    )
    .pipe(gulp.dest(path.dist.img))
    .pipe(
      browserSync.stream({
        once: true,
      })
    );
};
export const copy = () => {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts))
    .pipe(
      browserSync.stream({
        once: true,
      })
    );
};

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    host: "localhost",
    tunnel: true,
    server: {
      baseDir: path.dist.base,
    },
  });

  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, image);
  gulp.watch(path.src.fonts, copy);
};
const clear = () => {
  return deleteAsync(path.dist.base, {
    force: true,
  });
};
let develope = (ready) => {
  dev = true;
  ready();
};

export const base = gulp.parallel(html, scss, js, image, copy);
export const build = gulp.series(clear, base);
export default gulp.series(develope, base, server);
