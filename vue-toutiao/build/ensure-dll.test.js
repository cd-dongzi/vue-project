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
