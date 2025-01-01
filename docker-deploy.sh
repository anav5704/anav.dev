#!/bin/bash

set -eu

DOCKER_USER=$1
DOCKER_PASSWD=$2
IMAGE_NAME=$3

docker_login() {
    echo "Logging into Docker..."

    echo $DOCKER_PASSWD | docker login -u $DOCKER_USER --password-stdin || {
        echo "Failed to login to Docker"
        exit 1
    }
}

clear_containers() {
    echo "Clearing containers..."

    docker ps -aq | xargs --no-run-if-empty docker stop || true
    docker ps -aq | xargs --no-run-if-empty docker rm || true 
}

start_container () {
    echo "Starting container..."

    docker run -d -p 4321:4321 $IMAGE_NAME:latest || {
        echo "Failed to start container"
        exit 1
    }
}

docker_deploy () {
    docker_login
    clear_containers
   start_container 
}

docker_deploy

