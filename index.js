import fs from 'fs'
import path from 'path'
import { join } from 'desm'
import { commands as structure } from '@cto.ai/ops-cmd'
import fallthrough from '@cto.ai/ops-fallthrough'
import clif from 'clif'
import { configDir } from './lib/config.js'
import { loadSettings } from './lib/settings.js'

const { mkdir, readFile, writeFile, symlink } = fs.promises

const patterns = join(import.meta.url, 'patterns')

const profiles = path.join(configDir, 'profiles')

export default async function cli () {
  try {
    await mkdir(profiles, { recursive: true })
    await ensureDefaultProfile()
    const settings = { configDir, ...(await loadSettings()) }
    if (settings.auth) {
      settings.auth.pages = settings.auth.pages || {
        signup: await readFile(join(import.meta.url, 'pages', 'signup.html')),
        signin: await readFile(join(import.meta.url, 'pages', 'signin.html')),
        error: await readFile(join(import.meta.url, 'pages', 'error.html'))
      }
    }
    return await clif({ structure, patterns, settings, fallthrough: fallthrough(settings) })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

async function ensureDefaultProfile () {
  try {
    const dir = path.join(profiles, 'default')
    // if dir already exits, this will reject and skip the rest
    await mkdir(dir)
    const file = path.join(dir, 'settings.json')
    const { name, api, registry, ...settings } = await import('./settings.js')
    const profile = { name, api, registry, ...settings }
    await writeFile(file, JSON.stringify(profile))
    await writeFile(path.join(dir, 'config.json'), '{}')
    try {
      await symlink(file, path.join(configDir, 'settings.json'))
    } catch {}
    return profile
  } catch {}
}
