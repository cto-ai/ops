import fs from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { rigging } from 'clif-dev'
import { test, mockalicious } from 'tapx'
import * as forge from '@cto.ai/ops-ctrl-forge'
import * as common from './common.js'
const { mkdtemp } = fs.promises
const prefix = join(tmpdir(), 'ops-cli-init-')
const load = mockalicious(import.meta.url)
const harness = rigging.cli(import.meta.url, load)

const buildMocks = (opts = {}) => {
  const mocks = {
    ...common.mocks(opts.ctrlAccountInstance),
    '@cto.ai/ops-ctrl-forge': {
      ...forge,
      default (...args) {
        opts.onForgeLoad()
        const instance = forge.default(...args)
        return {
          ...instance,
          async * init (options) {
            // load forge with current mocks:
            const forge = await load('@cto.ai/ops-ctrl-forge', mocks)
            const instance = forge.default(...args)
            if (opts.init) {
              const iter = opts.init.call(instance, options)
              yield * iter
              const { value } = await iter.next()
              return value
            }
            const iter = instance.init(options)
            yield * iter
            const { value } = await iter.next()
            return value
          }
        }
      }
    }
  }
  return mocks
}

test('ops init (template flag required)', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops init', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }

  const { exitCode, output } = await cli(interactions, opts)

  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops init --template "node" --kind "service" dest', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init --template "node" --kind "service" dest', mocks)
  const interactions = ['test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops init -t "node" -k "service" dest', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init -t "node" -k "service" dest', mocks)
  const interactions = ['test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops init --kind "service" (template flag required)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks()
  const cli = await harness('ops init --kind "service"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops init -k "service" (template flag required)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks()
  const cli = await harness('ops init -k "service"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops init --template "node" (kind defaults to command)', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init --template "node"', mocks)
  const interactions = ['test', 'test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops init --template "https://github.com/org/template"', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      yield { label: 'downloading' }
      yield { label: 'ops initialized', dir }
    }
  })

  const cli = await harness('ops init --template "https://github.com/org/template"', mocks)
  const interactions = ['test', 'test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops init --template "https://github.com/org/template" (Download failed)', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init --template "https://github.com/org/template"', mocks)
  const interactions = ['test', 'test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops init --template "node" --kind "unknown" dest', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init --template "node" --kind "unknown" dest', mocks)
  const interactions = ['test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops init --template "unknown" --kind "unknown" dest', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      const iter = this.init(opts)
      yield * this.init(opts)
      const { value } = await iter.next()
      yield value
    }
  })

  const cli = await harness('ops init --template "unknown" --kind "unknown" dest', mocks)
  const interactions = ['test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('unexpected error handling', async ({ is, teardown, matchSnapshot }) => {
  const dir = await mkdtemp(prefix)
  const { cwd } = process
  teardown(() => {
    process.cwd = cwd
  })
  const mocks = buildMocks({
    onForgeLoad () {
      process.cwd = () => dir
    },
    async * init (opts) {
      throw Error('unexpected')
    }
  })

  const cli = await harness('ops init --template "node" --kind "service" dest', mocks)
  const interactions = ['test desc']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})
