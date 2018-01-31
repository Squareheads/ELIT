#!/bin/bash

if [ -z "$GA_TRACKING_CODE" ]; then
  echo 'GA_TRACKING_CODE variable not set, skipping...'
else
  echo 'Found GA_TRACKING_CODE, Injecting "'$GA_TRACKING_CODE'"'
  SED="s/GATrackingCode: '.*'/GATrackingCode: '"$GA_TRACKING_CODE"'/g"
  sed -e "$SED" src/Keys.ts > src/Keys_new.ts
  mv src/Keys_new.ts src/Keys.ts
fi

if [ -z "$SENTRY_URL" ]; then
  echo 'SENTRY_URL variable not set, skipping...'
else
  echo 'Found SENTRY_URL, Injecting "'$SENTRY_URL'"'
  SED="s/SentryURL: '.*'/SentryURL: '"$SENTRY_URL"'/g"
  sed -e "$SED" src/Keys.ts > src/Keys_new.ts
  mv src/Keys_new.ts src/Keys.ts
fi

