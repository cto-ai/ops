import * as account from '@cto.ai/ops-ctrl-account'
import * as config from '@cto.ai/ops-local-config'

export const mocks = (opsCtrlAccount = {}, opsLocalConfig = {}) => ({
  '@cto.ai/ops-local-config': {
    ...config,
    default () {
      return {
        read () {
          return { tokens: {}, user: { username: 'test' } }
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
    identity () {
      return {
        id: 'xxx',
        username: 'test',
        email: 'test'
      }
    },
    validate () { return true }
  }
})

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
