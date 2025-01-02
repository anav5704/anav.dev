#!/bin/bash

set -eu

IMAGE_NAME=$1

clear_containers() {
    echo "Clearing containers..."

    docker ps -aq | xargs --no-run-if-empty docker stop || true
    docker ps -aq | xargs --no-run-if-empty docker rm || true 
}

start_container () {
    echo "Starting container..."

    OPTIONS="-d --restart unless-stopped -p 4321:4321 --env-file .env.production"

    docker run $OPTIONS $IMAGE_NAME:latest || {
        echo "Failed to start container"
        exit 1
    }
}

docker_deploy () {
    clear_containers
   start_container 
}

docker_deploy

