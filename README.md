SJTU校园巴士时刻表
========

本项目是一个web应用，用于便捷地查看上海交通大学校园巴士的时刻表。本项目遵循MIT开源协议。

#反馈与建议
- 所有的反馈建议请在[issue版](https://github.com/zry656565/SJTU-Bus/issues)提交
- 或者直接在我[博客相关帖子](http://jerryzou.com/posts/sjtuBusFeedback/)里留言

#参与开发
- 如果你想为本项目贡献代码，可以参考issues列表中存在的各种问题及需要的功能。
- 本项目的线上版本依赖于FIS和fis-postpackager-simple模块
  - 如果是本地调试，不一定要安装fis
  - 不过，用fis启动一个本地调试服务器可以简化许多工作
- 有什么问题请联系我：jerry.zry@outlook.com

###使用FIS启动用于调试的本地服务器：
```
fis server start -p 9990 #端口任意指定
fis release --watch #watch可以保证你的修改即时刷新
```

###编译 & 部署线上版本
本项目目前部署于SAE，而SAE使用SVN作为版本控制工具。因此我写了个[脚本](https://github.com/zry656565/git-for-SAE)来将本项目的代码部署在SAE上：
```
#编译线上版本，此处的 `./build` 为指定的输出目录
fis release --optimize --md5 --pack --dest ./build
#or
fis release -omp -d ./build

#使用git-for-SAE脚本将代码上传到SAE
cd build
sae-push.sh sjtubus 3 #staging
sae-push.sh sjtubus 2 #release
```
需要注意的是，`./build`可以修改为任意路径（但如果是输出到本项目的根目录下的话，建议使用`build`文件夹作为输出目录，或者你可以选择修改`fis-conf.js`配置文件中的`project.exclude`）

#更新记录
- v1.0.0
  - 初级版完成
- v1.1.0
  - 优化了移动端的体验
  - 更正了东川路地铁站的车站位置
  - 根据后勤处的调整，更新了时刻表的时间
  - 将打到 Github 上的所有流量重定向到 SAE
- v1.2.0
  - 添加按钮："查看最近的车站"
  - 使用 F.I.S 来使得项目工程化
  - 更新部分时刻表时间
- v2.0.0
  - 添加查看教工班车的入口
  - 优化界面效果
- v2.1.0
  - 为教工班车页添加快捷书签
- v2.1.1
  - 为 iOS 用户添加惯性滑动

#主要贡献者

- [zry656565](https://github.com/zry656565)
- [gyz0072004](https://github.com/gyz0072004)
- [zlqy386](https://github.com/zlqy386)
- [MyComputableRomance](https://github.com/MyComputableRomance)
- [ysyjerry1992](https://github.com/ysyjerry1992)
