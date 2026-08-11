# 自动准备 DLL 构建设计

## 背景

项目的 Webpack 基础配置会直接读取 `build/manifest.json`，但该文件不纳入版本控制。首次克隆后直接执行 `npm run dev` 或 `npm run build` 会因文件缺失而失败。现有 README 提到了 `npm run dll`，但没有把它明确为首次运行前置步骤，也无法避免用户遗漏。

## 目标

- 首次克隆后，`npm run dev` 和 `npm run build` 能自动准备所需 DLL 产物。
- DLL 产物仍然有效时跳过重复打包。
- `package.json` 或 `package-lock.json` 更新后自动重建 DLL。
- 保留 `npm run dll`，供开发者手动强制重建。

## 非目标

- 不升级 Vue、Webpack 或其他依赖。
- 不修改业务代码、接口地址或页面行为。
- 不把 `build/manifest.json` 加入版本控制。

## 设计

新增 `build/ensure-dll.js`，检查以下两个 DLL 产物：

- `build/manifest.json`
- `static/js/dll/vendor.dll.js`

任一产物缺失时，脚本调用 `npm run dll`。两个产物均存在时，将其最早修改时间与 `package.json`、`package-lock.json` 的最晚修改时间比较；依赖描述文件更新较新时重新生成，否则输出跳过提示并正常退出。

为兼容 Windows，子进程命令在 Windows 使用 `npm.cmd`，其他平台使用 `npm`。DLL 命令失败时透传非零退出码，阻止后续开发服务器或生产构建继续运行。

`package.json` 增加 `predev` 和 `prebuild` 生命周期脚本，统一调用 `node build/ensure-dll.js`。README 补充项目目录、安装和启动顺序、自动 DLL 行为、手动重建命令及 `manifest.json` 排障说明。

## 验证

1. 删除本地忽略的 `build/manifest.json`，执行 `npm run build`，确认自动生成 DLL 并完成生产构建。
2. 再次执行 `npm run build`，确认检测到有效 DLL 并跳过重复生成。
3. 使用短时运行方式执行 `npm run dev`，确认预处理通过且开发服务器完成编译。
4. 检查 Git diff，确保只包含脚本、生命周期配置、README 和本设计规格，不提交生成产物。

## 风险与回退

主要风险是文件时间戳在复制或解压后不可靠。缺失检查仍保证首次运行正确；若时间戳异常，用户可执行 `npm run dll` 强制重建。回退时删除 `predev`、`prebuild` 和 `build/ensure-dll.js` 即可恢复原行为。
