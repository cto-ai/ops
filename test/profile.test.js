import fs from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { rigging } from 'clif-dev'
import { test, mockalicious, teardown } from 'tapx'
import * as common from './common.js'
const harness = rigging.cli(import.meta.url, mockalicious(import.meta.url))

const { mkdtemp, mkdir, writeFile, readdir, chmod, symlink, unlink } = fs.promises
const tmp = tmpdir()

teardown(() => {
  // an unknown interaction between tap and *probably* enquirer
  // leads to a socket (pointing to fd0) being created, this only happens
  // when executed with the tap runner but this open socket prevents
  // the test from exiting. This solves that issue:
  const socket = process._getActiveHandles().find(({ fd }) => fd === 0)
  if (socket) socket.destroy()
})

test('ops profile create', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile create', mocks)
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  const opts = {
    complex: true,
    settings: {
      ...common.settings
    }
  }
  delete opts.settings.auth.pages
  const interactions = ['test-name\t', 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']
  await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
  opts.settings.configDir = configDir

  const { exitCode, output } = await cli(interactions, opts)

  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile create --prefab "staging"', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile create --prefab "staging"', mocks)
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  const opts = {
    settings: {
      ...common.settings
    }
  }
  delete opts.settings.auth.pages
  const interactions = []

  await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
  opts.settings.configDir = configDir
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile create -p "staging"', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile create -p "staging"', mocks)
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  const opts = {
    settings: {
      ...common.settings
    }
  }
  delete opts.settings.auth.pages
  const interactions = []

  await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
  opts.settings.configDir = configDir
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile create (error: exists)', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile create', mocks)
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  const opts = {
    complex: true,
    settings: {
      ...common.settings
    }
  }
  delete opts.settings.auth.pages
  const interactions = ['test-name\t', 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

  try {
    await mkdir(join(configDir, 'profiles', 'test'))
    await writeFile(join(configDir, 'profiles', 'test', 'settings.json'), JSON.stringify(opts.settings))
    await symlink(join(configDir, 'profiles', 'test', 'settings.json'), join(configDir, 'settings.json'))
  } catch {}
  opts.settings.configDir = configDir
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile list', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']
    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile list', mocks)
  const interactions = []
  const opts = {
    settings: {
      ...common.settings,
      configDir
    }
  }

  await unlink(join(configDir, 'settings.json'))
  await symlink(join(configDir, 'profiles', 'test1', 'settings.json'), join(configDir, 'settings.json'))
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile select', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await symlink(join(configDir, 'profiles', 'test1', 'config.json'), join(configDir, 'config.json'))
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']
  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile select (backup read failure mode)', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await writeFile(join(configDir, 'config.json'), '{}')
  await unlink(join(configDir, 'settings.json'))
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']
  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile select (backup->upgrade)', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await writeFile(join(configDir, 'config.json'), '{}')
  await unlink(join(configDir, 'settings.json'))
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']
  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile select (backup->fail->restore->restore fail)', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await writeFile(join(configDir, 'config.json'), '{}')
  await chmod(join(configDir, 'config.json'), 0x000)
  await unlink(join(configDir, 'settings.json'))
  await symlink(join(configDir, 'profiles', 'test1', 'settings.json'), join(configDir, 'settings.json'))
  const mocks = {
    ...common.mocks(),
    fs: {
      ...fs,
      promises: {
        ...fs.promises,
        async readFile () { return Buffer.from('{}') }
      }
    }
  }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']
  const opts = {
    settings: {
      complex: true,
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile select (backup->fail->restore->restore fail (config is symlinked))', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await unlink(join(configDir, 'settings.json'))
  await symlink(join(configDir, 'profiles', 'test1', 'settings.json'), join(configDir, 'settings.json'))
  await symlink(join(configDir, 'profiles', 'test1', 'config.json'), join(configDir, 'config.json'))
  const mocks = {
    ...common.mocks(),
    fs: {
      ...fs,
      promises: {
        ...fs.promises,
        async readFile () { return Buffer.from('{}') },
        async unlink () {}
      }
    }
  }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']

  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(RegExp(configDir, 'g'), ''))
})

test('ops profile select (backup->fail->restore->restore fail (no current))', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  await writeFile(join(configDir, 'config.json'), '{}')
  await chmod(join(configDir, 'config.json'), 0x000)
  const mocks = {
    ...common.mocks(),
    fs: {
      ...fs,
      promises: {
        ...fs.promises,
        async readFile () { return Buffer.from('{}') },
        async unlink () {
          throw Error()
        }
      }
    }
  }
  const cli = await harness('ops profile select', mocks)
  const interactions = ['\t', '\n']
  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(
    output
      .replace(RegExp(configDir, 'g'), '')
      .replace(RegExp(`[0-9]{${Date.now().toString().length}}`), '')
  )
})

test('ops profile remove', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    try {
      await mkdir(join(configDir, 'profiles', 'test1'))
      await writeFile(join(configDir, 'profiles', 'test1', 'settings.json'), JSON.stringify(opts.settings))
      await symlink(join(configDir, 'profiles', 'test1', 'settings.json'), join(configDir, 'settings.json'))
    } catch {}
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile remove', mocks)
  const interactions = ['\t', '\n', 'y', '\n']

  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops profile remove (disconfirm)', async ({ is, matchSnapshot }) => {
  const configDir = await mkdtemp(join(tmp, 'ops-cmd-profile-'))
  await mkdir(join(configDir, 'profiles'))
  for (const name of ['test1', 'test2']) {
    const mocks = { ...common.mocks() }
    const cli = await harness('ops profile create', mocks)

    const opts = {
      complex: true,
      settings: {
        ...common.settings
      }
    }
    delete opts.settings.auth.pages
    const interactions = [`${name}\t`, 'test-auth-id\t', 'test-realm\t', 'test-url\t', 'test-api\t', 'test-reg\t', '\n']

    await writeFile(join(configDir, 'settings.json'), JSON.stringify(opts.settings))
    opts.settings.configDir = configDir
    await cli(interactions, opts)
  }
  const mocks = { ...common.mocks() }
  const cli = await harness('ops profile remove', mocks)
  const interactions = ['\t', '\n', 'n', '\n']

  const opts = {
    complex: true,
    settings: {
      ...common.settings,
      configDir
    }
  }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
  matchSnapshot(await readdir(join(configDir, 'profiles')))
})
