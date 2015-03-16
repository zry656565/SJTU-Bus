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

#更新记录
- Version: 0.0.1
  - 初级版完成
- Version: 0.1.0
  - 优化了移动端的体验
  - 更正了东川路地铁站的车站位置
  - 根据后勤处的调整，更新了时刻表的时间
  - 将打到Github上的所有流量重定向到sina
- Version: 1.0.0
  - 添加按钮：“查看最近的车站”
  - 使用FIS来使得项目工程化
  - 更新部分时刻表时间
- Version: 1.1.0
  - 添加查看教工班车的入口
  - 优化界面效果

#主要贡献者

- [zry656565](https://github.com/zry656565)
- [gyz0072004](https://github.com/gyz0072004)
- [zlqy386](https://github.com/zlqy386)
- [MyComputableRomance](https://github.com/MyComputableRomance)
- [ysyjerry1992](https://github.com/ysyjerry1992)
