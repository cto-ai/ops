import createAccount, { validate } from '@cto.ai/ops-ctrl-account'
import { Fail } from 'clif'
import { read, update, clear } from './config.js'
import { start, stop } from './spinner.js'

const MSG_LOGIN_REQUIRED = `
✋ Sorry you need to be logged in to do that.
🎳 You can sign up with {tuxCallOut ops account:signup}

❔ Please reach out to us with questions anytime!
⌚️ We are typically available {tuxEmphatic Monday-Friday 9am-5pm PT}
📬 You can always reach us by {tuxUrl email mailto:support@cto.ai} {dim support@cto.ai}

🖖 We'll get back to you as soon as we possibly can.
`

const MSG_SESSION_EXPIRED = `
⚠️  Sorry your session has expired. \n\n 👨‍💻 You can sign in with {tuxTerm ops account:signin}
`

function check (tokens) {
  try {
    const valid = validate(tokens)
    if (valid === false) return 'expired'
    return true
  } catch {
    return false
  }
}

export async function auth (info, settings) {
  try {
    start(info)
    const config = await read()
    const { tokens, user, team } = config
    const validity = check(tokens)
    const signedIn = !!(user && team && validity)

    if (signedIn === false) {
      throw new Fail({ type: 'print' }, MSG_LOGIN_REQUIRED)
    }
    if (validity === 'expired') {
      await clear()
      throw new Fail({ type: 'print' }, MSG_SESSION_EXPIRED)
    }

    const account = createAccount(settings.auth)

    try {
      return await update({ tokens: await account.refresh(tokens) })
    } catch (err) {
      if (err.code === 'ERR_UNAUTHORIZED') {
        throw new Fail({ type: 'print' }, MSG_LOGIN_REQUIRED)
      }
      throw new Fail({ err, type: 'api' }, 'Auth attempt failed')
    }
  } finally {
    stop(info)
  }
}

export default {
  auth: { ns: 'auth' }
}
