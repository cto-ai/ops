import * as account from '@cto.ai/ops-ctrl-account'
import * as config from '@cto.ai/ops-local-config'
import * as tux from '@cto.ai/tux'

export const mocks = (opsCtrlAccount = {}, opsLocalConfig = {}) => {
  const identity = () => {
    return {
      id: 'xxx',
      username: 'test',
      email: 'test'
    }
  }
  const validate = () => { return true }
  const result = {
    '@cto.ai/ops-local-config': {
      ...config,
      default () {
        return {
          read () {
            return { tokens: {}, user: { username: 'test' }, team: 'test-team' }
          },
          write () { },
          clear () { },
          ...opsLocalConfig
        }
      }
    },
    '@cto.ai/ops-ctrl-account': {
      ...account,
      default () {
        return {
          async refresh (tokens) { return tokens },
          ...opsCtrlAccount
        }
      },
      identity,
      validate
    },
    '@cto.ai/tux': {
      ...tux,
      spinner: {
        ...tux.spinner,
        start () {},
        stop () {}
      }
    }
  }
  result['@cto.ai/ops-ctrl-account'].default.identity = identity
  result['@cto.ai/ops-ctrl-account'].default.validate = validate
  return result
}

export const settings = {
  name: 'test',
  auth: {
    id: 'ops-cli',
    realm: 'ops',
    url: 'https://cto.ai/auth',
    pages: { signup: Buffer.from(''), signin: Buffer.from(''), error: Buffer.from('') }
  },
  api: 'http://api.test',
  registry: 'registry.test'
}
