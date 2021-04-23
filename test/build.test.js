import fs from 'fs'
import { PassThrough } from 'stream'
import { basename } from 'path'
import { rigging } from 'clif-dev'
import { test, mockalicious } from 'tapx'
import AggregateError from 'es-aggregate-error'
import * as forge from '@cto.ai/ops-ctrl-forge'
import * as common from './common.js'
const load = mockalicious(import.meta.url)
const harness = rigging.cli(import.meta.url, load)

const buildMocks = (opts = {}) => {
  const mocks = {
    ...common.mocks(opts.ctrlAccountInstance),
    dockerode: {
      default: class Docker {
        constructor (...args) {
          if (opts.dockerCtor) return opts.dockerCtor.call(this, ...args)
        }

        async ping () { if (opts.ping) return opts.ping() }
        async buildImage (...args) {
          if (opts.buildImage) return opts.buildImage.call(this, ...args)
          const stream = new PassThrough()
          process.nextTick(() => {
            stream.write(JSON.stringify({ stream: 'stream output' }) + '\n')
            stream.write(JSON.stringify({ status: 'status update' }) + '\n')
            stream.end()
          })
          return stream
        }
      }
    },
    fs: {
      ...fs,
      promises: {
        ...fs.promises,
        async stat () {
          if (opts.stat) return opts.stat()
        },
        async readFile (path, options) {
          if (basename(path) === 'ops.yml') {
            return opts.manifest || `
            version: "1"
            commands:
              - name: TEST
                version: "0.1.0"
                public: false
                description: test desc
                run: bash /ops/main.sh
                remote: true
                sdk: "2"
                sourceCodeURL: ""
                mountCwd: false
                mountHome: false
          `
          }
          if (opts.readFile) return opts.readFile(path, options)
          return fs.promises.readFile(path, options)
        }
      }
    },
    '@cto.ai/ops-ctrl-forge': {
      ...forge,
      default (...args) {
        const instance = forge.default(...args)
        return {
          ...instance,
          async * build (options) {
            // load forge with current mocks:
            const forge = await load('@cto.ai/ops-ctrl-forge', mocks)
            const instance = forge.default(...args)
            if (opts.build) {
              yield * opts.build.call(instance, options)
              return
            }
            yield * instance.build(options)
          }
        }
      }
    }
  }
  return mocks
}

test('ops build (--op is required)', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops build', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (cwd, success)', async ({ is, matchSnapshot, teardown }) => {
  teardown(() => {
    process.cwd = cwd
  })
  const { cwd } = process
  process.cwd = () => {
    if (/commands\/build/.test(Error().stack)) {
      return '/--dummy--/ops'
    }
    return cwd()
  }
  const mocks = buildMocks()
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build ./ops-dir --op "TEST" (success)', async ({ is, matchSnapshot, teardown }) => {
  teardown(() => {
    process.cwd = cwd
  })
  const { cwd } = process
  process.cwd = () => {
    if (/commands\/build/.test(Error().stack)) {
      return '/--dummy--/ops'
    }
    return cwd()
  }
  const mocks = buildMocks()
  const cli = await harness('ops build ./ops-dir --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (success with warnings)', async ({ is, matchSnapshot, teardown }) => {
  teardown(() => {
    process.cwd = cwd
  })
  const { cwd } = process
  process.cwd = () => {
    if (/commands\/build/.test(Error().stack)) {
      return '/--dummy--/ops'
    }
    return cwd()
  }
  const mocks = buildMocks()
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --nocache --op "TEST" (success)', async ({ is, matchSnapshot, teardown }) => {
  teardown(() => {
    process.cwd = cwd
  })
  const { cwd } = process
  process.cwd = () => {
    if (/commands\/build/.test(Error().stack)) {
      return '/--dummy--/ops'
    }
    return cwd()
  }
  const mocks = buildMocks()
  const cli = await harness('ops build --nocache --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --nocache --op "TEST1" --op "TEST2" (success)', async ({ is, matchSnapshot, teardown }) => {
  teardown(() => {
    process.cwd = cwd
  })
  const { cwd } = process
  process.cwd = () => {
    if (/commands\/build/.test(Error().stack)) {
      return '/--dummy--/ops'
    }
    return cwd()
  }
  const mocks = buildMocks({
    manifest: `
      version: "1"
      commands:
        - name: TEST1
          version: "0.1.0"
          public: false
          description: test one desc
          run: bash /ops/main.sh
          remote: true
          sdk: "2"
          sourceCodeURL: ""
          mountCwd: false
          mountHome: false
        - name: TEST2
          version: "0.1.0"
          public: false
          description: test two desc
          run: bash /ops/main.sh
          remote: true
          sdk: "2"
          sourceCodeURL: ""
          mountCwd: false
          mountHome: false
  `
  })
  const cli = await harness('ops build --nocache --op "TEST1" --op "TEST2"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_NAME_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_NAME_INVALID'), { code: 'ERR_NAME_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_DESC_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_DESC_INVALID'), { code: 'ERR_DESC_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_VERSION_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_VERSION_INVALID'), { code: 'ERR_VERSION_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_NO_PUBLIC)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_NO_PUBLIC'), { code: 'ERR_NO_PUBLIC' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_NO_RUN)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_NO_RUN'), { code: 'ERR_NO_RUN' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_PIPELINE_JOBS_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_PIPELINE_JOBS_INVALID'), { code: 'ERR_PIPELINE_JOBS_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_PIPELINE_JOB_NAME_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_PIPELINE_JOB_NAME_INVALID'), { code: 'ERR_PIPELINE_JOB_NAME_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_PIPELINE_JOB_DESC_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_PIPELINE_JOB_DESC_INVALID'), { code: 'ERR_PIPELINE_JOB_DESC_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_ENV_VAR_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_ENV_VAR_INVALID'), { code: 'ERR_ENV_VAR_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: ERR_SERVICE_DOMAIN_INVALID)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw new AggregateError([Object.assign(Error('ERR_SERVICE_DOMAIN_INVALID'), { code: 'ERR_SERVICE_DOMAIN_INVALID' })])
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: WRN_DOCKER_NOT_FOUND)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async stat () {
      throw Error()
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = ['n']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async ping () {
      throw Error()
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = ['n']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING, 1 retry)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async ping () {
      throw Error()
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = ['y', 'n']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING, 4 retries)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async ping () {
      throw Error()
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = ['y', 'y', 'y', 'y', 'n']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops build --op "TEST" (failure: unknown error)', async ({ is, matchSnapshot }) => {
  const mocks = buildMocks({
    async * build (opts) {
      throw Error('test')
    }
  })
  const cli = await harness('ops build --op "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})
