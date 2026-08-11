# vue-project

[![CI](https://github.com/cd-dongzi/vue-project/actions/workflows/ci.yml/badge.svg)](https://github.com/cd-dongzi/vue-project/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/cd-dongzi/vue-project?style=flat)](https://github.com/cd-dongzi/vue-project/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/cd-dongzi/vue-project?style=flat)](https://github.com/cd-dongzi/vue-project/forks)

一个使用 Vue 2、Vue Router、Vuex、Axios 和 Webpack 3 构建的移动端新闻应用示例。项目参考今日头条的常见交互，用于展示一个完整 Vue 单页应用的目录组织、状态管理、路由、数据请求和组件拆分方式。

> **项目状态：维护恢复与安全现代化进行中。** 这是教学和代码参考项目，不应直接作为生产级身份认证或新闻服务使用。当前技术栈较旧，升级依赖前请先阅读[安全说明](SECURITY.md)。

## 项目价值

- 提供可直接阅读和运行的 Vue 2 移动端 SPA 示例。
- 覆盖路由、Vuex 模块、请求封装、登录状态和本地存储等常见场景。
- 为仍在维护 Vue 2 / Webpack 3 项目的开发者提供迁移前参考。
- 保留清晰的组件与页面拆分，适合学习和小范围实验。

## 主要功能

- 分类新闻信息流和频道管理
- 新闻搜索与文章详情
- 视频列表与播放交互
- 微头条列表和发布示例
- 登录、个人中心和退出登录
- 收藏、阅读历史和推送历史
- 消息、商城、反馈与系统设置示例页面
- 加载状态、对话框、开关、顶部栏等通用组件

## 技术栈

- Vue 2.5
- Vue Router 3
- Vuex 3
- Axios
- vue-awesome-swiper
- Webpack 3、Babel 6、Less

## 快速开始

项目代码位于 [`vue-toutiao`](vue-toutiao) 目录。旧版构建链建议使用 Node.js 16 和 npm 8。

```bash
cd vue-toutiao
npm ci
npm run dev
```

开发服务器默认运行在 `http://localhost:8080`。

生产构建会先生成 Webpack DLL 清单，再编译应用：

```bash
npm run build
```

构建结果写入 `vue-toutiao/dist`。`npm run dev` 同样会在启动前生成 DLL 清单，因此干净克隆后无需手动创建 `manifest.json`。

## 目录结构

```text
vue-toutiao/
├── build/              # Webpack 构建配置和脚本
├── config/             # 开发与生产环境配置
├── src/
│   ├── components/     # 通用 UI 组件
│   ├── directive/      # 自定义指令
│   ├── router/         # 路由和访问控制
│   ├── store/          # Vuex 状态与业务模块
│   ├── utils/          # 请求、存储和页面适配工具
│   └── views/          # 页面级组件
└── static/             # 静态资源
```

## 外部服务与数据说明

示例数据来自代码中配置的外部 Mock API，该服务可能变更或停止运行。应用会发起网络请求；请勿在演示登录框中输入真实密码或敏感信息。历史在线预览地址为 `http://dzblog.cn/cases/vue-toutiao/index.html`，当前可用性不作保证。

## 参与贡献

提交 Issue 或 Pull Request 前，请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。安全问题不要创建公开 Issue，请按照 [SECURITY.md](SECURITY.md) 中的方式私下报告。

当前优先事项：

1. 审核并更新存在已知漏洞的依赖。
2. 为核心数据流和页面补充自动化测试。
3. 逐步迁移旧版构建工具，同时保持示例可运行。
4. 改进文档、无障碍体验和移动端兼容性。

## English summary

`vue-project` is an educational mobile news SPA built with Vue 2, Vue Router, Vuex, Axios, and Webpack 3. It demonstrates feeds, search, articles, video, login state, local storage, routing, and reusable UI components. The repository is undergoing a security-focused maintenance restart; it is not intended to provide production authentication or a production news backend.

## License

Released under the [ISC License](LICENSE).
