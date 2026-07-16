#!/usr/bin/env bash
# Builds and publishes the @lpc-lang/core npm package from ./lib.
#
# Run this locally (not in CI) since npm requires an interactive OTP
# for this account/package. Bump the version in lib/package.json before
# running. Any extra args are passed through to `npm publish`, e.g.:
#   ./scripts/publish-lib.sh --otp=123456
#   ./scripts/publish-lib.sh --dry-run
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [[ -n "$(git status --porcelain)" ]]; then
    echo "Warning: working tree has uncommitted changes." >&2
fi

npm whoami >/dev/null || { echo "Not logged in to npm. Run 'npm login' first." >&2; exit 1; }

npm ci
npm run compile
npm run lib

cd lib
npm publish --access public "$@"
