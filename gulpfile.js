const gulp = require('gulp')
const spawn = require('cross-spawn')
const sftp = require('gulp-sftp')

function buildApp(cb) {
  process.env.NODE_ENV = 'production'
  const bulidSpawn = spawn('yarn', ['build'], { stdio: 'inherit' })
  bulidSpawn.on('close', function() {
    cb && cb()
  })

  bulidSpawn.on('error', function() {
    cb && cb()
  })
}

// 部署到个人测试环境
gulp.task('deploy-boss-interview', () => {
  return buildApp(() => {
    gulp.src('dist/**').pipe(
      // 我的服务器
      sftp({
        host: '47.113.81.18',
        user: 'root',
        pass: 'xyc@993412',
        remotePath: '/home/boss-interview',
      }),
    )
  })
})

// 一次执行多个任务
gulp.task('deploy', ['deploy-boss-interview'])
