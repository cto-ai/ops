import { Fail } from 'clif'
import { log } from './print.js'

export function general (info) {
  console.log('general failure', info)
  process.exit(1)
}

export function silent ({ exitCode = 0 }) {
  process.exit(exitCode)
}

export function api (info) {
  console.log('api failure', info, info.err && info.err.request)
  process.exit(1)
}

export function print ({ message }) {
  log({ message })
  process.exit(1)
}

export default {
  general: new Fail(),
  silent: new Fail({ silent }),
  api: new Fail({ type: 'api' }),
  print: new Fail({ type: 'print' })
}
