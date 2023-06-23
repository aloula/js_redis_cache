#!/bin/bash

echo "Stopping and removing Redis container..."
CONTAINER_ID=$(docker ps | awk ' /redis/ { print $1 }')
docker container stop $CONTAINER_ID
#docker container rm $CONTAINER_ID
echo "Done!"

