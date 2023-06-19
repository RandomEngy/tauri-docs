import fs from 'node:fs'
import os from 'node:os'

import TOML from '@iarna/toml'

const cargoPath = new URL('../../tauri/core/tauri/Cargo.toml', import.meta.url)
const tauriConfig = TOML.parse(fs.readFileSync(cargoPath, 'utf8'))

const [major, ..._] = tauriConfig.package.version.split('.')

const output = process.env['GITHUB_OUTPUT']

if (!output) throw '$GITHUB_OUTPUT env var not set.'

fs.appendFileSync(output, `TAURI_MAJOR=${major}${os.EOL}`)
