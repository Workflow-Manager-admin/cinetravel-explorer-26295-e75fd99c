#!/bin/bash
cd /home/kavia/workspace/code-generation/cinetravel-explorer-26295-e75fd99c/cinetravel_explorer
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

