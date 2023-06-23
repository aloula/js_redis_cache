#!/bin/bash

echo "Starting Redis container..."
#docker run -d --name redis -p 6379:6379 redis
docker run -d -p 6379:6379 -v data:/data --name redis redis
echo "Done!"
