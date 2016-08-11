/**
 * Created by clf on 2016/8/5.
 */
import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import clean from 'gulp-rimraf';
import pm2 from 'pm2';

gulp.task('build:code', () => {
    return gulp.src(['src/**/*.js', '!src/**/*-compiled.js'])//忽略webstorm下面自动生成的compiled文件
        .pipe(babel())
        .pipe(gulp.dest('build'));
});


gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', '!src/**/*-compiled.js'], ['build:code', 'run']);
});

gulp.task('pm2:restart', function () {
    pm2.connect(true, function () {
        pm2.restart('all', function () {
            console.log('pm2 restart');
        });
    });
});

//使用pm2运行入口文件
gulp.task('run', function () {
    pm2.connect(true, function () {
        var pm2Config = require('./pm2.json');
        pm2.start(pm2Config, function () {
            console.log('pm2 started');
            pm2.streamLogs('all', 0);
        });
    });
});

//清楚build文件夹
gulp.task('clean', function () {
    return gulp.src(['build'], {read: false})
        .pipe(clean());
});
