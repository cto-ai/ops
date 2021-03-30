import os from 'os'
import { render } from '@cto.ai/tux'

const helpify = {
  positionals (definitions) {
    if (definitions.length === 0) return ''
    return definitions.map(({ required, name }) => {
      return required ? `<${name}>` : `[${name}]`
    }).join(' ')
  },
  flags (definitions) {
    if (definitions.length === 0) return ''
    const processed = definitions.map(({ required, name, alias, type, describe }) => {
      alias = Array.isArray(alias) ? alias.join(' | ') : alias
      const alt = alias ? ` | ${alias} ` : ' '
      const flag = `${name}${alt}`
      describe = required ? `${describe} (required)` : describe
      return { flag, describe, type }
    })
    const flagPad = 2 + processed.map(({ flag }) => flag.length).reduce((a, b) => a >= b ? a : b, 0)
    const descPad = 8 + processed.map(({ describe }) => describe.length).reduce((a, b) => a >= b ? a : b, 0)
    return '\n' + processed
      .map(({ flag, describe, type }) => `  ${flag.padEnd(flagPad)}${describe.padEnd(descPad)}[${type}]`)
      .join('\n') + '\n'
  },
  command (name) {
    return name ? name + ' ' : ''
  },
  subcommands (definitions, { bin, command, breadcrumb }) {
    if (definitions.length === 0) return ''
    const pad = 2 + definitions.map(({ name }) => name.length).reduce((a, b) => a >= b ? a : b, 0)
    return '\n' + definitions.map(({ name, describe }) => {
      const cmd = helpify.command(command.name)
      return `  ${bin}${helpify.breadcrumb(breadcrumb)}${cmd}${name.padEnd(pad)}${describe}`
    }).join('\n') + '\n'
  },
  breadcrumb (definitions) {
    return definitions.length > 0 ? ` ${definitions.join(' ')} ` : ' '
  },
  unrecognized (argv, { bin, breadcrumb, command }) {
    if (argv.length === 0) return ''
    const cmd = helpify.command(command.name)
    return `\n{tuxError Command not recognized:} {tuxTerm ${bin}${helpify.breadcrumb(breadcrumb)}${cmd}${argv.join(' ')}}\n\n`
  }
}

const template = ({ pre, banner, signature, flags, commands }) => `${pre}
${banner}
{bold USAGE}
  $ ${signature}
${flags}${commands}`

async function cliDetails () {
  const { default: pkg } = await import('../package.cjs')
  const { name, version } = pkg
  return { name, version }
}

export const usage = async ({ bin, command, subcommands, breadcrumb, unrecognized }) => {
  let pre = helpify.unrecognized(unrecognized, { bin, breadcrumb, command })
  pre += command.describe
  let banner = ''
  if (command.name === '') {
    const { name, version } = await cliDetails()
    banner = `\n{bold VERSION}\n  ${name}/${version} ${os.platform} node-${process.version}\n`
  }
  const signature = `${bin}${helpify.breadcrumb(breadcrumb)}${helpify.command(command.name)}${helpify.positionals(command.positionals)}`
  const flags = command.flags.length > 0 ? `\n{bold OPTIONS}${helpify.flags(command.flags)}` : ''
  const commands = subcommands.length > 0 ? `\n{bold COMMANDS}${helpify.subcommands(subcommands, { bin, command, breadcrumb })}` : subcommands
  console.log(render(template({ pre, banner, signature, flags, commands })))
}

export const version = async () => {
  const details = await cliDetails()
  console.log(details.version)
}

export default {
  usage: { ns: 'help' },
  version: { ns: 'version' }
}
