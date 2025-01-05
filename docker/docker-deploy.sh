#!/bin/bash

set -eu

IMAGE_NAME=$1
IMAGE_TAG=$2

clear_containers() {
    echo "Stopping containers..."
    docker ps -aq | xargs --no-run-if-empty docker stop

    echo "Removing containers..."
    docker ps -aq | xargs --no-run-if-empty docker rm
}

start_container () {
    echo "Starting container..."

    OPTIONS="-d --restart unless-stopped -p 4321:4321 --env-file .env.production"

    docker run $OPTIONS $IMAGE_NAME:$IMAGE_TAG || {
        echo "Failed to start container"
        exit 1
    }
}

docker_deploy () {
    clear_containers
   start_container 
}

docker_deploy

