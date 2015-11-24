import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import jspm from 'jspm';
import systemjsBuilder from 'systemjs-builder';
import serve from 'browser-sync';
import modRewrite from 'connect-modrewrite';
import del from 'del';
import yargs from 'yargs';

const $ = gulpLoadPlugins();
const reload = () => serve.reload();
const root = 'client';

// helper method to resolveToApp paths
const resolveTo = (resolvePath) => {
  return (glob) => {
    glob = glob || '';
    return path.resolve(path.join(root, resolvePath, glob));
  };
};

const resolveToApp = resolveTo('app'); // app/{glob}
const resolveToComponents = resolveTo('app/components'); // app/components/{glob}

// map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  css: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  static: path.join(root, 'static/**/*'),
  entry: path.join(root, 'app/bootstrap.js'),
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dist: path.join(__dirname, 'dist/')
};

gulp.task('serve', gulp.series(
  styles,
  gulp.parallel(serveDev, watch)
));

gulp.task('serve:dist', gulp.series(
  clean,
  gulp.parallel(styles, build, staticFiles),
  serveDist
));

gulp.task('dist', gulp.series(
  clean,
  gulp.parallel(styles, staticFiles),
  build
));

gulp.task(clean);
gulp.task(lint);
gulp.task(styles);
gulp.task(staticFiles);
gulp.task(build);
gulp.task(watch);
gulp.task(component);


// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('dist'));

// Clean
function clean() {
  return del([paths.dist]);
}

// Style tasks
function styles() {
  return gulp.src(paths.css)
    .pipe($.newer(resolveToApp('**')))
    .pipe($.sourcemaps.init())
    // .pipe($.postcss(processors).on('error', console.error.bind(console)))
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
  	.pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(root + '/app/layout'));
}

function staticFiles() {
  return gulp.src(paths.static)
    .pipe(gulp.dest(paths.dist));
}

function lint() {
  return gulp.src([paths.js,
    '!**/*.spec.js'
  ])
  // .pipe(reload({stream: true, once: true}))
  .pipe($.eslint())
  .pipe($.eslint.format())
  .on('error', (e) => {
    const basePath = path.join(__dirname, root);
    const filename = e.fileName.substr(basePath.length + 1);
  });
}

function build() {
  const Builder = systemjsBuilder;
  const builder = new Builder(root, './jspm.config.js');
  const dist = path.join(paths.dist + 'build.js');

  return builder.buildStatic(resolveToApp('app.bootstrap'), dist, {
    minify: true,
    mangle: false,
    sourceMaps: true
  })
  .then(() => {
    // Also create a fully annotated minified copy
    return gulp.src(dist)
      // .pipe($.ngAnnotate())
      //.pipe(uglify())
      // .pipe($.rename('bundle.js'))
      .pipe(gulp.dest(paths.dist));
  })
  .then(() => {
    // Inject minified script into index
    return gulp.src('client/index.html')
      .pipe($.htmlReplace({
        'js': 'build.js'
      }))
      .pipe(gulp.dest(paths.dist));
  });
}

// Browser-sync
function serveDev() {
  require('chokidar-socket-emitter')({port: 8081, path: 'src', relativeTo: 'src'})
  serve({
    port: process.env.PORT || 3000,
    open: false,
    files: [].concat(
      paths.js,
      paths.css,
      paths.html
    ),
    server: {
      baseDir: [root, root + '/static'],
      // serve our jspm dependencies with the src folder
      routes: {
        '/jspm.config.js': './jspm.config.js',
        '/jspm_packages': './jspm_packages'
      }
    },
    middleware: [
      modRewrite([
        '^([^.]+)$ /index.html [L]'
      ])
    ]
  });
}

// Browser-sync Dist
function serveDist() {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    notify: false,
    logPrefix: 'FEDS',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    // will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    baseDir: 'dist',
    middleware: [
      modRewrite([
        '^([^.]+)$ /index.html [L]'
      ])
    ]
  });
}

// Rerun the task when a file changes
function watch() {
  gulp.watch(paths.html, reload);
  gulp.watch(paths.js, reload);
  gulp.watch(paths.css, gulp.series(styles, reload));
}

function component() {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const camel = (val) => {
    return val.replace( /-([a-z])/ig, ( all, letter ) => letter.toUpperCase());
  };
  const name = yargs.argv.name;
  const upCaseName = cap(name);
  const camelCaseName = camel(upCaseName);
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
  .pipe($.template({
    name,
    upCaseName,
    camelCaseName
  }))
  .pipe($.rename((path) => {
    path.basename = path.basename.replace('temp', name);
  }))
  .pipe(gulp.dest(destPath));
}
