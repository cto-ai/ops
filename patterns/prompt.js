import enquirer from 'enquirer'
import { render } from '@cto.ai/tux'

export async function prompt (info) {
  const { ns, ...opts } = info
  if (info.type === 'confirm') opts.format = (sure) => sure ? 'Yes' : 'No'
  const response = await enquirer.prompt({
    ...opts,
    styles: {
      strong (s) { return render(`{tuxCallOut.bold ${s}}`) }
    }
  })

  return response
}

export default {
  prompt: { ns: 'prompt' }
}
