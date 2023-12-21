#!/bin/bash

CHROMIUM_PATH="/usr/bin/google-chrome"

nohup "$CHROMIUM_PATH" --remote-debugging-port=9222 \
--start-maximized \
--autoplay-policy=user-gesture-required \
--disable-background-networking \
--disable-background-timer-throttling \
--disable-backgrounding-occluded-windows \
--disable-breakpad \
--disable-client-side-phishing-detection \
--disable-component-update \
--disable-default-apps \
--disable-dev-shm-usage \
--disable-domain-reliability \
--disable-extensions \
--disable-features=AudioServiceOutOfProcess \
--disable-hang-monitor \
--disable-ipc-flooding-protection \
--disable-notifications \
--disable-offer-store-unmasked-wallet-cards \
--disable-popup-blocking \
--disable-print-preview \
--disable-prompt-on-repost \
--disable-renderer-backgrounding \
--disable-speech-api \
--disable-sync \
--hide-scrollbars \
--ignore-gpu-blacklist \
--metrics-recording-only \
--mute-audio \
--no-default-browser-check \
--no-first-run \
--no-pings \
--no-zygote \
--no-sandbox \
--password-store=basic \
--use-gl=swiftshader \
--use-mock-keychain \
--start-maximized \
--headless > /dev/null 2>&1 &

exit 0