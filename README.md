SJTU校园巴士时刻表
========

[![CircleCI](https://circleci.com/gh/zry656565/SJTU-Bus/tree/master.svg?style=svg)](https://circleci.com/gh/zry656565/SJTU-Bus/tree/master)

本项目是一个web应用，用于便捷地查看上海交通大学校园巴士的时刻表。本项目遵循MIT开源协议。

- [更新记录](./changelog.md)

## 反馈与建议
- 所有的反馈建议请在[issue版](https://github.com/zry656565/SJTU-Bus/issues)提交
- 或者直接在我[博客相关帖子](http://jerryzou.com/posts/sjtuBusFeedback/)里留言

## 参与开发
- 如果你想为本项目贡献代码，可以参考 issues 列表中存在的各种问题及需要的功能。
- 有什么问题请联系我：jerry.zry@outlook.com

### 环境部署

本项目依赖于 fis3，同时它的插件也需要全局安装（囧）：

```bash
npm install -g fis3 fis-parser-less fis3-postpackager-loader
```

### 编译代码

编译的默认输出目录都是 `./build`。

```bash
# 编译线上版本
npm run release
# 编译本地调试版本
npm run build
```

### 部署

本项目使用 [circleci](https://circleci.com/) 进行部署。

- 每当 master 分支更新时，circleci 会在编译成功后，自动部署到 http://3.sjtubus.sinaapp.com
- 每当新增加一个 tag（如 v2.4.0）时，circleci 会在编译成功后，自动部署到 http://sjtubus.sinaapp.com

## 主要贡献者

- [@zry656565](https://github.com/zry656565)
- [@gyz0072004](https://github.com/gyz0072004)
- [@zlqy386](https://github.com/zlqy386)
- [@MyComputableRomance](https://github.com/MyComputableRomance)
- [@ysyjerry1992](https://github.com/ysyjerry1992)
- [@hebingchang](https://github.com/hebingchang)
