# Vue 仿今日头条 App

这是 [`vue-project`](../README.md) 的主示例应用，使用 Vue 2、Vue Router、Vuex、Axios 和 Webpack 3 构建。

## 开发

旧版构建链建议使用 Node.js 16 和 npm 8。

```bash
npm ci
npm run dev
```

开发服务器默认运行在 `http://localhost:8080`。

`npm run dev` 会先检查 `build/manifest.json` 和 `static/js/dll/vendor.dll.js`。产物缺失，或 `package.json`、`package-lock.json` 比现有产物更新时，会自动执行 `npm run dll`；产物有效时则跳过重复生成。

## 构建

```bash
npm run build
```

`npm run build` 同样会在构建前检查 DLL，构建结果写入 `dist`。

如需强制重新生成 DLL，可手动执行：

```bash
npm run dll
```

## 排障

如果遇到 `Cannot find module './manifest.json'`，请先执行：

```bash
npm run dll
```

生成 `build/manifest.json` 和 `static/js/dll/vendor.dll.js` 后，再重新运行 `npm run dev` 或 `npm run build`。

## 注意事项

- 外部 Mock API 可能变更或停止运行。
- 请勿使用真实密码或敏感信息测试登录功能。
- 本项目使用旧版依赖，仅用于学习和迁移参考，不建议直接用于生产环境。
- 提交贡献前请阅读根目录的 [贡献指南](../CONTRIBUTING.md) 和 [安全策略](../SECURITY.md)。

历史资料：

- [SegmentFault 文章](https://segmentfault.com/a/1190000013153782)
- [历史在线预览](http://dzblog.cn/cases/vue-toutiao/index.html)（可用性不作保证）
