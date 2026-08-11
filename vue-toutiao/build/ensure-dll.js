'use strict'

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const projectRoot = path.resolve(__dirname, '..')
const artifacts = [
  path.join(projectRoot, 'build/manifest.json'),
  path.join(projectRoot, 'static/js/dll/vendor.dll.js')
]
const dependencies = [
  path.join(projectRoot, 'package.json'),
  path.join(projectRoot, 'package-lock.json')
]

function needsDllBuild(artifactPaths, dependencyPaths) {
  if (artifactPaths.some(file => !fs.existsSync(file))) return true

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

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

if (require.main === module) ensureDll()

module.exports = { needsDllBuild }
