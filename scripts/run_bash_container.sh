#!/bin/bash

echo "Runing bash inside container..."
#CONTAINER_ID=$(docker ps | awk ' /redis/ { print $1 }')
#echo $CONTAINER_ID
docker exec -it redis bash
