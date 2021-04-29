import createDebug from 'debug'
import got from 'got'
import Analytics from 'analytics-node'
import config from '../lib/config.js'

const debug = createDebug('ops:analytics')

const {
  OPS_SEGMENT_KEY = 'kskyrGqdnuvMZCE0V2kMrzS9Gfrl8J0y'
} = process.env

const segment = new Analytics(OPS_SEGMENT_KEY)

export function track ({ event, ...properties }, { api, analytics }) {
  if (analytics === false) return

  fireAndForget()

  async function fireAndForget () {
    try {
      const cfg = await config.read()
      const {
        user: { email, username },
        team: { name: activeTeam },
        version,
        tokens: { accessToken }
      } = cfg

      for (const [k, v] of properties) {
        if (typeof v === 'function') properties[k] = v(cfg)
      }

      properties.username = username
      properties.runtime = 'CLI'
      properties.team = activeTeam
      properties.email = email
      if (version) properties.version = version

      if (email && activeTeam && accessToken) {
        try {
          await got.post(`${api}/analytics-service/private/events`, {
            json: {
              metadata: { userId: email, event, properties },
              tags: ['track']
            },
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        } catch (err) {
          debug(
            'Unable to send analytics request to %s. %O',
            `${api}/analytics-service/private/events`,
            err
          )
        }
      }

      segment.track({
        userId: email,
        team: activeTeam,
        event,
        properties
      }, (err) => {
        debug('Unable to send analytics to Segment. %O', err)
      })
    } catch (err) {
      debug('Analytics failure %O', err)
    }
  }
}

export default {
  track: { ns: 'analytics' }
}
