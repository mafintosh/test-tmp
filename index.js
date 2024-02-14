const os = require('os')
const path = require('path')
const fs = require('fs')

module.exports = tmp

async function tmp (t, name = null) {
  if (!valid(name)) name = Math.random().toString(16).slice(2)

  const tmpdir = path.join(await fs.promises.realpath(os.tmpdir()), 'tmp-test-' + name)

  try {
    await gc(tmpdir)
  } catch {}

  await fs.promises.mkdir(tmpdir, { recursive: true })

  if (t) t.teardown(gc)
  return tmpdir

  async function gc () {
    await fs.promises.rm(tmpdir, { recursive: true, force: true })
  }

  function valid (name) {
    if (typeof name !== 'string') return false

    const chars = /[<>:/\\|?*]/
    const max = 64

    return !chars.test(name) && name.length <= max
  }
}
