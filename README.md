# lieefu.com
前端基于Angular，使用angular-cli生成的Angular工程。后端使用nodejs、Expressjs和mongodb数据库，可作为MEAN建站模板样品工程。

## Build client
$ npm run build

## Start server
$ npm start

#Deploy
前台build，在client目录下，执行 ng build --prod --aot
创建一个start.sh脚本，使用这个脚本启动后台api服务
#!/bin/sh
rm .forever/*.log
NODE_ENV=production forever start -l forever_lieefu.log -e err_lieefu.log  ./lieefu.com/server/app.js
