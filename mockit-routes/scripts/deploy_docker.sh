#!/usr/bin/env bash

if [ -n "$(git status --porcelain)" ]; then
  echo "Please commit and push your local changes before deployment"
  exit 1
fi

echo "Creating docker image..."
docker build --tag=yournextleap/mockit-routes .

echo "Pushing image to DockerHub..."
docker push yournextleap/mockit-routes