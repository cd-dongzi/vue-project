# Vue 仿今日头条 App

这是 [`vue-project`](../README.md) 的主示例应用，使用 Vue 2、Vue Router、Vuex、Axios 和 Webpack 3 构建。

## 本地启动

此应用位于仓库的 `vue-toutiao` 子目录。`package.json` 要求 Node.js `>=14 <17`；为避免旧版 Webpack 构建链的兼容性问题，建议使用 Node.js 16 和 npm 8。

从一个全新的克隆开始，可按以下步骤执行：

```bash
git clone https://github.com/cd-dongzi/vue-project.git
cd vue-project/vue-toutiao

# 如果使用 nvm，先选择受支持的 Node.js 版本
nvm install 16
nvm use 16

npm ci
npm run dev
```

`nvm` 仅用于管理 Node.js 版本；已经在使用 Node.js 16 的环境可以跳过这两行。`npm ci` 会严格按照仓库中的 `package-lock.json` 安装依赖。

开发服务器会尝试自动打开浏览器；没有自动打开时，访问 `http://localhost:8080`。启动后可按 `Ctrl+C` 停止服务。

`npm run dev` 会先检查 `build/manifest.json` 和 `static/js/dll/vendor.dll.js`。产物缺失，或 `package.json`、`package-lock.json` 比现有产物更新时，会自动执行 `npm run dll`；产物有效时则跳过重复生成。

## 构建

```bash
npm run build
```

`npm run build` 同样会在构建前检查 DLL，构建结果写入 `dist`。

提交修改前可运行以下命令验证现有测试和生产构建：

```bash
npm test
npm run build
```

如需强制重新生成 DLL，可手动执行：

```bash
npm run dll
```

## 排障

如果 `npm` 报告当前 Node.js 版本不受支持，先确认版本：

```bash
node --version
npm --version
```

请切换到 Node.js 16 后重新执行 `npm ci`。本项目的构建依赖较旧，不承诺兼容 Node.js 17 或更高版本。

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
