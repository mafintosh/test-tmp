const os = require('os')
const path = require('path')
const fs = require('fs')

module.exports = tmp

async function tmp (t) {
  const tmpdir = path.join(os.tmpdir(), 'tmp-test-' + Math.random().toString(16).slice(2))

  try {
    await gc(tmpdir)
  } catch {}

  await fs.promises.mkdir(tmpdir, { recursive: true })

  if (t) t.teardown(gc)
  return tmpdir

  async function gc () {
    await fs.promises.rm(tmpdir, { recursive: true })
  }
}
