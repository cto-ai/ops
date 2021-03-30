const readme = `
# __name__

> __description__

## Get Started

\`\`\`sh
$ npm install -g __name__
$ __bin__ -h
\`\`\`

__docs__## Engines

* Node 12.4+
* Node 14.0+

## Development

Test:

\`\`\`sh
npm test
\`\`\`

Visual coverage report (run after test):

\`\`\`sh
npm run cov
\`\`\`

Lint:

\`\`\`sh
npm run lint
\`\`\`

Autoformat:

\`\`\`sh
npm run lint -- --fix
\`\`\`

## Releasing

For mainline releases:

\`\`\`sh
npm version <major|minor|patch>
git push --follow-tags
\`\`\`

For prereleases:

\`\`\`sh
npm version prerelease
git push --follow-tags
\`\`\`

### License

MIT

`

export const docs = { readme }

const file = `import { rigging } from 'clif-dev'
import { test, mockalicious } from 'tapx'
import common from './common.js'
const harness = rigging.cli(import.meta.url, mockalicious(import.meta.url))
__tests__
`

export const test = `
test('__command__', async ({ is, matchSnapshot }) => {
  const mocks = { ...common.mocks() }
  const cli = await harness('__command__', mocks)
  const interactions = []
  const opts = { settings: { ...common.settings } }
  const { exitCode, output } = await cli(interactions, opts)
  is(exitCode, 0)
  matchSnapshot(output)
})
`

export const tests = { file, test }
