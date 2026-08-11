# Vue 仿今日头条 App

这是 [`vue-project`](../README.md) 的主示例应用，使用 Vue 2、Vue Router、Vuex、Axios 和 Webpack 3 构建。

## 开发

旧版构建链建议使用 Node.js 16 和 npm 8。

```bash
npm ci
npm run dev
```

开发服务器默认运行在 `http://localhost:8080`。

## 构建

```bash
npm run build
```

构建结果写入 `dist`。开发和生产构建会通过 npm 前置脚本自动运行 `npm run dll`，确保干净克隆后也能生成所需的 `manifest.json` 和 DLL 资源。

## 注意事项

- 外部 Mock API 可能变更或停止运行。
- 请勿使用真实密码或敏感信息测试登录功能。
- 本项目使用旧版依赖，仅用于学习和迁移参考，不建议直接用于生产环境。
- 提交贡献前请阅读根目录的 [贡献指南](../CONTRIBUTING.md) 和 [安全策略](../SECURITY.md)。

历史资料：

- [SegmentFault 文章](https://segmentfault.com/a/1190000013153782)
- [历史在线预览](http://dzblog.cn/cases/vue-toutiao/index.html)（可用性不作保证）
