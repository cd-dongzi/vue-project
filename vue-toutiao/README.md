# Vue 仿今日头条 App

一个使用 Vue 2、Vue Router、Vuex 和 Webpack 3 构建的移动端单页应用。

## 环境要求

- Node.js 6 或更高版本
- npm

## 安装与开发

```bash
npm install
npm run dev
```

开发服务器启动后访问 <http://localhost:8080>。

`npm run dev` 会先通过 `predev` 自动检查 DLL 产物：当 `build/manifest.json` 或 `static/js/dll/vendor.dll.js` 缺失，或 `package.json`、`package-lock.json` 比现有产物更新时，项目会自动执行 `npm run dll`；产物有效时则跳过重复生成。

## 生产构建

```bash
npm run build
```

`npm run build` 同样会在构建前自动检查 DLL，构建结果输出到 `dist/`。

如需强制重新生成 DLL，可手动执行：

```bash
npm run dll
```

## 排障

如果遇到 `Cannot find module './manifest.json'`，请先执行：

```bash
npm run dll
```

生成 `build/manifest.json` 后，再重新运行 `npm run dev` 或 `npm run build`。

## 相关链接

**[在线预览地址（也可通过 Chrome 控制台手机模式观看）](http://dzblog.cn/cases/vue-toutiao/index.html)**

> [SegmentFault](https://segmentfault.com/a/1190000013153782?utm_source=index-newest)

> [博客地址](http://dzblog.cn/article/5a78609ec153997e3417a6d4)
