import { render } from '@cto.ai/tux'

export function log ({ message, interpolate = [] }) {
  console.log(render(message), ...interpolate)
}

export function warn ({ message, interpolate = [] }) {
  console.log(`⚠️ ${render(message)}`, ...interpolate)
}

export function newline () { console.log() }

export default {
  log: { ns: 'print' },
  warn: { ns: 'print', type: 'warn' },
  newline: { ns: 'print', type: 'newline' }
}
