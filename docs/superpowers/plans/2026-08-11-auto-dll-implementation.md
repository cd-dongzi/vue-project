# Automatic DLL Preparation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make development and production builds automatically create missing or stale Webpack DLL artifacts while preserving the manual `npm run dll` command.

**Architecture:** A focused Node script owns DLL freshness detection and subprocess execution. npm lifecycle hooks call it before `dev` and `build`; a dependency-free Node test exercises freshness decisions with temporary files, and README updates explain the resulting workflow.

**Tech Stack:** Node.js CommonJS, npm lifecycle scripts, Webpack 3, Node built-in `assert`/`fs` modules, Markdown.

---

### Task 1: Specify DLL freshness behavior

**Files:**
- Create: `vue-toutiao/build/ensure-dll.test.js`
- Test: `vue-toutiao/build/ensure-dll.test.js`

- [ ] **Step 1: Write the failing test**

Create a dependency-free test that imports `needsDllBuild` and covers missing, current, and stale artifacts:

```js
'use strict'

const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { needsDllBuild } = require('./ensure-dll')

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ensure-dll-'))
const manifest = path.join(tempDir, 'manifest.json')
const vendor = path.join(tempDir, 'vendor.dll.js')
const packageJson = path.join(tempDir, 'package.json')
const packageLock = path.join(tempDir, 'package-lock.json')
const artifacts = [manifest, vendor]
const dependencies = [packageJson, packageLock]

function writeAt(file, time) {
  fs.writeFileSync(file, '{}')
  fs.utimesSync(file, time, time)
}

try {
  const oldTime = new Date('2020-01-01T00:00:00Z')
  const newTime = new Date('2020-01-02T00:00:00Z')

  writeAt(packageJson, oldTime)
  writeAt(packageLock, oldTime)
  assert.strictEqual(needsDllBuild(artifacts, dependencies), true)

  writeAt(manifest, newTime)
  writeAt(vendor, newTime)
  assert.strictEqual(needsDllBuild(artifacts, dependencies), false)

  writeAt(packageLock, new Date('2020-01-03T00:00:00Z'))
  assert.strictEqual(needsDllBuild(artifacts, dependencies), true)

  console.log('ensure-dll tests passed')
} finally {
  artifacts.concat(dependencies).forEach(file => {
    if (fs.existsSync(file)) fs.unlinkSync(file)
  })
  fs.rmdirSync(tempDir)
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd vue-toutiao && node build/ensure-dll.test.js`

Expected: FAIL with `Cannot find module './ensure-dll'`.

- [ ] **Step 3: Commit the behavior specification**

```bash
git add vue-toutiao/build/ensure-dll.test.js
git commit -m "test: specify DLL freshness checks"
```

### Task 2: Implement conditional DLL preparation

**Files:**
- Create: `vue-toutiao/build/ensure-dll.js`
- Modify: `vue-toutiao/package.json`
- Test: `vue-toutiao/build/ensure-dll.test.js`

- [ ] **Step 1: Implement the freshness check and DLL runner**

Create `vue-toutiao/build/ensure-dll.js`:

```js
'use strict'

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const projectRoot = path.resolve(__dirname, '..')
const artifacts = [
  path.resolve(__dirname, 'manifest.json'),
  path.resolve(projectRoot, 'static/js/dll/vendor.dll.js')
]
const dependencies = [
  path.resolve(projectRoot, 'package.json'),
  path.resolve(projectRoot, 'package-lock.json')
]

function needsDllBuild(artifactPaths, dependencyPaths) {
  if (artifactPaths.some(file => !fs.existsSync(file))) {
    return true
  }

  const oldestArtifact = Math.min(...artifactPaths.map(file => fs.statSync(file).mtime.getTime()))
  const newestDependency = Math.max(...dependencyPaths.map(file => fs.statSync(file).mtime.getTime()))
  return newestDependency > oldestArtifact
}

function ensureDll() {
  if (!needsDllBuild(artifacts, dependencies)) {
    console.log('DLL artifacts are up to date; skipping npm run dll.')
    return
  }

  console.log('DLL artifacts are missing or stale; running npm run dll...')
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const result = spawnSync(npmCommand, ['run', 'dll'], {
    cwd: projectRoot,
    stdio: 'inherit'
  })

  if (result.error) {
    throw result.error
  }
  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

if (require.main === module) {
  ensureDll()
}

module.exports = { needsDllBuild }
```

- [ ] **Step 2: Add npm lifecycle and test scripts**

Add these entries to `vue-toutiao/package.json` without changing dependency versions:

```json
"predev": "node build/ensure-dll.js",
"dev": "webpack-dev-server --config build/webpack.dev.conf.js",
"prebuild": "node build/ensure-dll.js",
"build": "node build/build.js",
"test:ensure-dll": "node build/ensure-dll.test.js"
```

- [ ] **Step 3: Run the focused test**

Run: `cd vue-toutiao && npm run test:ensure-dll`

Expected: PASS and print `ensure-dll tests passed`.

- [ ] **Step 4: Check package metadata scope**

Run: `git diff --check && git diff -- vue-toutiao/package.json vue-toutiao/build/ensure-dll.js vue-toutiao/build/ensure-dll.test.js`

Expected: no whitespace errors and no dependency-version changes.

- [ ] **Step 5: Commit the implementation**

```bash
git add vue-toutiao/build/ensure-dll.js vue-toutiao/package.json
git commit -m "fix: prepare DLL artifacts before builds"
```

### Task 3: Document first-run and recovery workflows

**Files:**
- Modify: `README.md`
- Modify: `vue-toutiao/README.md`

- [ ] **Step 1: Expand the root README**

Replace the current root README with a concise project entrypoint containing:

````markdown
# Vue 实战项目

本仓库目前包含一个基于 Vue 2 和 Webpack 3 的移动端仿今日头条项目。

## 项目目录

- `vue-toutiao/`：应用源码、构建配置和独立使用说明。

## 快速开始

进入项目目录后安装依赖并启动开发服务器：

```bash
cd vue-toutiao
npm install
npm run dev
```

详细的构建命令和 DLL 排障说明见 [`vue-toutiao/README.md`](vue-toutiao/README.md)。
````

- [ ] **Step 2: Rewrite the application README**

Use the following content:

````markdown
# Vue 仿今日头条 App

基于 Vue 2、Vue Router、Vuex 和 Webpack 3 的移动端示例项目。

## 环境要求

- Node.js
- npm

## 安装与启动

```bash
npm install
npm run dev
```

开发服务器默认运行在 <http://localhost:8080>。

`npm run dev` 会在启动前检查 Webpack DLL 产物。首次运行、产物缺失，或 `package.json` / `package-lock.json` 更新后，会自动执行 `npm run dll`；产物有效时会跳过重复打包。

## 生产构建

```bash
npm run build
```

构建结果输出到 `dist/`，构建前同样会自动检查 DLL 产物。

## 手动重建 DLL

需要强制刷新第三方依赖 DLL 时执行：

```bash
npm run dll
```

如果遇到 `Cannot find module './manifest.json'`，先运行 `npm run dll`，再重新执行开发或构建命令。

## 相关链接

- [在线预览地址（建议使用 Chrome 移动设备模式）](http://dzblog.cn/cases/vue-toutiao/index.html)
- [SegmentFault 文章](https://segmentfault.com/a/1190000013153782?utm_source=index-newest)
- [博客文章](http://dzblog.cn/article/5a78609ec153997e3417a6d4)
````

- [ ] **Step 3: Check documentation commands against scripts**

Run: `grep -E '"(dev|build|dll|test:ensure-dll)"' vue-toutiao/package.json && grep -n 'npm run' README.md vue-toutiao/README.md`

Expected: every documented npm command exists in `package.json`.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md vue-toutiao/README.md
git commit -m "docs: clarify setup and DLL recovery"
```

### Task 4: Run clean integration verification

**Files:**
- Verify only: `vue-toutiao/build/manifest.json`
- Verify only: `vue-toutiao/static/js/dll/vendor.dll.js`
- Verify only: `vue-toutiao/dist/`

- [ ] **Step 1: Preserve generated files outside the worktree**

Run from `vue-toutiao/`:

```bash
backup_dir=$(mktemp -d /private/tmp/vue-toutiao-dll.XXXXXX)
cp static/js/dll/vendor.dll.js "$backup_dir/vendor.dll.js"
if [ -f build/manifest.json ]; then mv build/manifest.json "$backup_dir/manifest.json"; fi
mv static/js/dll/vendor.dll.js "$backup_dir/generated-vendor.dll.js"
```

Expected: both DLL artifacts are absent from the working tree and preserved in the explicit temporary directory.

- [ ] **Step 2: Verify missing artifacts trigger automatic generation**

With both artifacts moved in Step 1, run: `npm run build`.

Expected: output contains `DLL artifacts are missing or stale; running npm run dll...`, followed by `Build complete.`

- [ ] **Step 3: Verify current artifacts skip regeneration**

Run from `vue-toutiao/`: `npm run build`.

Expected: output contains `DLL artifacts are up to date; skipping npm run dll.`, followed by `Build complete.`

- [ ] **Step 4: Verify the development compile path**

Run `cd vue-toutiao && npm run dev`, wait for the successful compilation message at `http://localhost:8080`, then stop the server with `Ctrl-C`.

Expected: the predev check skips current DLL artifacts and Webpack reports a successful development build.

- [ ] **Step 5: Restore generated-file baseline and inspect scope**

Restore the original tracked vendor bundle, leave ignored build outputs untracked, and run:

```bash
cp "$backup_dir/vendor.dll.js" static/js/dll/vendor.dll.js
git status -sb
git diff --check
git log --oneline upstream/master..HEAD
```

Expected: no generated-file diff, no whitespace errors, and only the design, plan, test, implementation, and documentation commits are ahead of upstream.

- [ ] **Step 6: Push and open a draft PR**

```bash
git push -u origin agent/auto-dll-before-build
gh pr create --repo cd-dongzi/vue-project --base master --head yuanstackai:agent/auto-dll-before-build --draft
```

The PR body must summarize the first-clone failure, automatic missing/stale checks, documentation changes, and the focused/integration commands executed.
