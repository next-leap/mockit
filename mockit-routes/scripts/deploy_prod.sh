#!/usr/bin/env bash

git fetch
LATEST_HASH=$(git rev-parse HEAD)

echo "Deploying latest docker image with git tag "$LATEST_HASH" to EB instance..."
echo "This will take few minutes..."

eb deploy --label "$LATEST_HASH" --message "Deploying latest master"
