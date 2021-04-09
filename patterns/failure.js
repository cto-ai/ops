import { Fail } from 'clif'
import { render } from '@cto.ai/tux'
import createDebug from 'debug'
import { log } from './print.js'

const debug = createDebug('ops')

export function general ({ message, ...info }) {
  debug('general failure', info)
  if (!message && info.err) {
    if (Array.isArray(info.err.errors)) {
      for (const { message } of info.err.errors) {
        console.log(render(`{tuxError ›} Error: ${message}`))
      }
    } else {
      console.log(render(`{tuxError ›} Error: ${info.err.message}`))
    }
    process.exit(1)
  }
  console.log(render(`{tuxError ›} Error: ${message}`))
  process.exit(1)
}

export function silent ({ exitCode = 0, ...info }) {
  debug('silent failure', info)
  process.exit(exitCode)
}

export function api ({ err, ...info }) {
  debug('api failure', info, err && err.request)
  process.exit(1)
}

export function print ({ message, ...info }) {
  debug('print failure message', info)
  log({ message })
  process.exit(1)
}

export default {
  general: new Fail(),
  silent: new Fail({ type: 'silent' }),
  api: new Fail({ type: 'api' }),
  print: new Fail({ type: 'print' })
}
