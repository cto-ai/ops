import { render } from '@cto.ai/tux'

export function log ({ message, interpolate = [] }) {
  console.log(render(message), ...interpolate)
}

export function warn ({ message, interpolate = [] }) {
  console.log(`⚠️ ${render(message)}`, ...interpolate)
}

export function raw ({ message }) {
  process.stdout.write(message)
}

export function newline () { console.log() }

export default {
  log: { ns: 'print' },
  warn: { ns: 'print', type: 'warn' },
  raw: { ns: 'print', type: 'raw' },
  newline: { ns: 'print', type: 'newline' }
}
