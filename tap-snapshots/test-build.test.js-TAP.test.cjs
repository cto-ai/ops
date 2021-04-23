/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/build.test.js TAP ops build (--op is required) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ The --op flag is required\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --nocache --op "TEST" (success) > must match snapshot 1`] = `
"🛠  Building: \\u001b[38;2;13;224;207mTEST:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops\\u001b[22m\\u001b[23m to test your op.\\n\\n"
`

exports[`test/build.test.js TAP ops build --nocache --op "TEST1" --op "TEST2" (success) > must match snapshot 1`] = `
"🛠  Building: \\u001b[38;2;13;224;207mTEST1:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST1\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops\\u001b[22m\\u001b[23m to test your op.\\n\\n🛠  Building: \\u001b[38;2;13;224;207mTEST2:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST2\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops\\u001b[22m\\u001b[23m to test your op.\\n\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (cwd, success) > must match snapshot 1`] = `
"🛠  Building: \\u001b[38;2;13;224;207mTEST:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops\\u001b[22m\\u001b[23m to test your op.\\n\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_DESC_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_DESC_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_ENV_VAR_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_ENV_VAR_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_NAME_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_NAME_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_NO_PUBLIC) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_NO_PUBLIC\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_NO_RUN) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_NO_RUN\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_PIPELINE_JOBS_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_PIPELINE_JOBS_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_PIPELINE_JOB_DESC_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_PIPELINE_JOB_DESC_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_PIPELINE_JOB_NAME_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_PIPELINE_JOB_NAME_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_SERVICE_DOMAIN_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_SERVICE_DOMAIN_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: ERR_VERSION_INVALID) > must match snapshot 1`] = `
"\\u001b[38;2;255;255;255m❗ Sorry, we have difficulty parsing your ops.yml. ERR_VERSION_INVALID\\u001b[39m\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: WRN_DOCKER_NOT_FOUND) > must match snapshot 1`] = `
"\\n\\u001b[38;2;13;224;207mUh-oh! You'll just need to install Docker for CTO.ai ops to run properly - go here to install it now.\\u001b[39m\\n\\n\\u001b[38;2;76;246;121m→\\u001b[39m https://docs.docker.com/install/\\n\\u001b[38;2;114;120;172m You'll need to create an account with Docker in order to start the download \\u001b[39m\\n\\nOnce installed, make sure you start the Docker app, then come back to this terminal and type \\u001b[38;2;13;224;207m'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\n\\u001b[1B\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING) > must match snapshot 1`] = `
"\\n\\u001b[38;2;13;224;207mIt looks like you have Docker installed, but it's not currently running.\\",\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease start Docker to continue\\u001b[39m\\n\\nOnce Docker is running, come back to this terminal and type \\u001b[38;2;13;224;207m 'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\n\\u001b[1B\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING, 1 retry) > must match snapshot 1`] = `
"\\n\\u001b[38;2;13;224;207mIt looks like you have Docker installed, but it's not currently running.\\",\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease start Docker to continue\\u001b[39m\\n\\nOnce Docker is running, come back to this terminal and type \\u001b[38;2;13;224;207m 'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\n\\u001b[1B\\n⚠️ Docker not running\\n\\n\\u001b[38;2;13;224;207mPlease check that Docker is running again and come back here when ready.\\u001b[39m\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\n\\u001b[1B\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: WRN_DOCKER_NOT_RUNNING, 4 retries) > must match snapshot 1`] = `
"\\n\\u001b[38;2;13;224;207mIt looks like you have Docker installed, but it's not currently running.\\",\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease start Docker to continue\\u001b[39m\\n\\nOnce Docker is running, come back to this terminal and type \\u001b[38;2;13;224;207m 'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\n\\u001b[1B\\n⚠️ Docker not running\\n\\n\\u001b[38;2;13;224;207mPlease check that Docker is running again and come back here when ready.\\u001b[39m\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\n\\u001b[1B\\n⚠️ Docker not running\\n\\n\\u001b[38;2;13;224;207mIt looks like you have Docker installed, but it's not currently running.\\",\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease start Docker to continue\\u001b[39m\\n\\nOnce Docker is running, come back to this terminal and type \\u001b[38;2;13;224;207m 'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\n\\u001b[1B\\n⚠️ Docker not running\\n\\n\\u001b[38;2;13;224;207mIt looks like you have Docker installed, but it's not currently running.\\",\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease start Docker to continue\\u001b[39m\\n\\nOnce Docker is running, come back to this terminal and type \\u001b[38;2;13;224;207m 'Y'\\u001b[39m\\nWe'll be waiting right here when you're ready 👍\\n\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m Yes\\u001b[2D\\n\\u001b[1B\\n⚠️ Docker not running\\n\\n\\u001b[38;2;13;224;207mHmm. Docker still doesn't seem to be running.\\u001b[39m\\n\\u001b[38;2;13;224;207mPlease check again, or run, \\"ops account support\\" and we'll be happy to help you out.\\u001b[39m\\n\\u001b[?25l\\u001b[36m?\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m›\\u001b[22m No\\u001b[7D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\u001b[2K\\u001b[1G\\u001b[32m✔\\u001b[39m \\u001b[38;2;13;224;207m\\u001b[1mReady to continue?\\u001b[22m\\u001b[39m \\u001b[2m(y/N)\\u001b[22m \\u001b[2m·\\u001b[22m No\\u001b[1D\\n\\u001b[1B\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (failure: unknown error) > must match snapshot 1`] = `
"\\u001b[38;2;220;100;103m›\\u001b[39m Error: test\\n"
`

exports[`test/build.test.js TAP ops build --op "TEST" (success with warnings) > must match snapshot 1`] = `
"🛠  Building: \\u001b[38;2;13;224;207mTEST:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops\\u001b[22m\\u001b[23m to test your op.\\n\\n"
`

exports[`test/build.test.js TAP ops build ./ops-dir --op "TEST" (success) > must match snapshot 1`] = `
"🛠  Building: \\u001b[38;2;13;224;207mTEST:0.1.0\\u001b[39m\\nstream output\\n💻 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops run TEST\\u001b[22m\\u001b[23m to test your op.\\n📦 Run \\u001b[38;2;76;246;121m$\\u001b[39m \\u001b[3m\\u001b[2mops public /--dummy--/ops/ops-dir\\u001b[22m\\u001b[23m to test your op.\\n\\n"
`
