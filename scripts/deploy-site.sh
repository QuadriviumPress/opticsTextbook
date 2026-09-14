#!/usr/bin/env bash
# Optics deploy body: PDF/DOCX exports, then HTML + PWA packaging.
# Invoked by Bindery's reusable deploy workflow as the build-command.
set -euo pipefail

echo "Building PDF and DOCX exports in parallel"
(npx myst build --pdf 2>&1 | tee /tmp/pdf-build.log; echo $? > /tmp/pdf-exit-code) &
PDF_PID=$!
(npx myst build --docx 2>&1 | tee /tmp/docx-build.log; echo $? > /tmp/docx-exit-code) &
DOCX_PID=$!
wait "$PDF_PID"
wait "$DOCX_PID"

PDF_EXIT=$(cat /tmp/pdf-exit-code 2>/dev/null || echo "1")
DOCX_EXIT=$(cat /tmp/docx-exit-code 2>/dev/null || echo "1")
if [ "$PDF_EXIT" != "0" ] || [ "$DOCX_EXIT" != "0" ]; then
  echo "PDF exit=$PDF_EXIT DOCX exit=$DOCX_EXIT"
  [ "$PDF_EXIT" = "0" ] || cat /tmp/pdf-build.log
  [ "$DOCX_EXIT" = "0" ] || cat /tmp/docx-build.log
  exit 1
fi

npx myst build --md 2>/dev/null || echo "No MD exports configured"
npx myst build --jats 2>/dev/null || echo "No JATS exports configured"

npm run generate-icons
npx myst build --html
npm run inject-scripts
npm run setup-pwa

mkdir -p _build/html/exports/chapters
[ -f exports/textbook.pdf ] && cp exports/textbook.pdf _build/html/exports/ || true
[ -f exports/textbook.docx ] && cp exports/textbook.docx _build/html/exports/ || true
if [ -d exports/chapters ]; then
  cp exports/chapters/*.pdf _build/html/exports/chapters/ 2>/dev/null || true
  cp exports/chapters/*.docx _build/html/exports/chapters/ 2>/dev/null || true
fi
touch _build/html/.nojekyll
