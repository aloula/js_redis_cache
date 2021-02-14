#!/bin/bash

echo "Stopping and removing all containers..."
docker container rm $(docker container ls -aq)
echo "Done!"

