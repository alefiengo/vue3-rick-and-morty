const fs = require('fs')
const path = require('path')

function resolveDefaultsPath () {
  try {
    return require.resolve('node-ipc/entities/Defaults.js', { paths: [process.cwd()] })
  } catch {
    return path.join(process.cwd(), 'node_modules', 'node-ipc', 'entities', 'Defaults.js')
  }
}

function patchNodeIpcDefaults (filePath) {
  if (!fs.existsSync(filePath)) {
    return { patched: false, reason: `missing: ${filePath}` }
  }

  const original = fs.readFileSync(filePath, 'utf8')
  if (original.includes('patched: tolerate os.networkInterfaces errors')) {
    return { patched: false, reason: 'already patched' }
  }

  const needle = 'const networkInterfaces = os.networkInterfaces();'
  if (!original.includes(needle)) {
    return { patched: false, reason: 'unexpected Defaults.js format' }
  }

  const replacement = [
    "let networkInterfaces;",
    "    try {",
    "        networkInterfaces = os.networkInterfaces();",
    "    } catch (e) {",
    "        return '';",
    "    }",
    "    /* patched: tolerate os.networkInterfaces errors */"
  ].join('\n')

  const next = original.replace(needle, replacement)
  fs.writeFileSync(filePath, next, 'utf8')
  return { patched: true }
}

const defaultsPath = resolveDefaultsPath()
const result = patchNodeIpcDefaults(defaultsPath)
if (result.patched) {
  process.stdout.write(`patched node-ipc Defaults.js (${defaultsPath})\n`)
} else {
  process.stdout.write(`node-ipc patch skipped (${result.reason})\n`)
}
