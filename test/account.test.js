import { rigging } from 'clif-dev'
import { test, mockalicious } from 'tapx'
import * as common from './common.js'
const harness = rigging.cli(import.meta.url, mockalicious(import.meta.url))

test('ops account reset', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      reset () {},
      endpoints: (function * () { yield 'http://example.url' })()
    })
  }
  const cli = await harness('ops account reset', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account reset (signed in)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      reset () {},
      endpoints: (function * () { yield 'http://example.url' })()
    })
  }
  const cli = await harness('ops account reset', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account reset (failure)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      reset () { throw Error('reset test failure') },
      endpoints: (function * () { yield 'http://example.url' })()
    })
  }
  const cli = await harness('ops account reset', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signin', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --user "TEST" --password "TEST" --interactive', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --user "TEST" --password "TEST" --interactive', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -u "TEST" -p "TEST" -i', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST" -i', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --password "TEST" --interactive', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --password "TEST" --interactive', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -p "TEST" -i', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -p "TEST" -i', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --user "TEST" --interactive', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --user "TEST" --interactive', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -u "TEST" -i', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -i', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --interactive', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --interactive', mocks)

  const interactions = ['un-test', 'pw-test']

  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -i', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -i', mocks)
  const interactions = ['un-test', 'pw-test']

  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --user "TEST" --password "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --user "TEST" --password "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -u "TEST" -p "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --password "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --password "TEST"', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -p "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -p "TEST"', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin --user "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin --user "TEST"', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin -u "TEST"', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () { return {} }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST"', mocks)
  const interactions = ['test']
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signin (failure: unauthorized)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        const err = Error('unauthorized')
        err.code = 'ERR_UNAUTHORIZED'
        throw err
      }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signin (failure: auth api error)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        throw Error('signin test error')
      }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signin (failure: teams api upstream error)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        return { accessToken: 'at' }
      }
    }),
    got () {
      return {
        async json () {
          return { error: 'test error' }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signin (failure: teams api error)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        return { accessToken: 'at' }
      }
    }),
    got () {
      return {
        async json () {
          throw Error('test error')
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signin (failure: teams api unauthorized)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        return { accessToken: 'at' }
      }
    }),
    got () {
      return {
        async json () {
          const err = Error('401 Unauthorized')
          err.response = { statusCode: 401 }
          throw err
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signin (failure: no teams from teams apis)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        return { accessToken: 'at' }
      }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: null }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signin (failure: empty teams array from teams api)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signin () {
        return { accessToken: 'at' }
      }
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [] }
        }
      }
    }
  }
  const cli = await harness('ops account signin -u "TEST" -p "TEST"', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signout', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops account signout', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signup', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signout () { },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signup (signout failure)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signout () { throw Error('signout test error') },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signup (not signed in)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signout () { },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})

test('ops account signup (tokens missing)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return null },
      async signout () { },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signup (invalid tokens)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signout () { },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [{ name: 'test' }] }
        }
      }
    }
  }
  mocks['@cto.ai/ops-ctrl-account'].validate = () => {
    throw Error('invalid test')
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signup (failure: teams api error)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signin () {
        return { accessToken: 'at' }
      },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          throw Error('test error')
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signup (failure: teams api unauthorized)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signin () {
        return { accessToken: 'at' }
      },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          const err = Error('401 Unauthorized')
          err.response = { statusCode: 401 }
          throw err
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output.replace(/file:\/\/.+[0-9]+:[0-9]+/, 'file://-removed-'))
})

test('ops account signup (failure: no teams from teams apis)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signin () {
        return { accessToken: 'at' }
      },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: null }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account signup (failure: empty teams array from teams api)', async ({ is, matchSnapshot }) => {
  const mocks = {
    ...common.mocks({
      async signup () { return {} },
      async signin () {
        return { accessToken: 'at' }
      },
      endpoints: (function * () { yield 'http://signup.test' }())
    }),
    got () {
      return {
        async json () {
          return { error: null, data: [] }
        }
      }
    }
  }
  const cli = await harness('ops account signup', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 1)
  matchSnapshot(output)
})

test('ops account support', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('ops account support', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})
