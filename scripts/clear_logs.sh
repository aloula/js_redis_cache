#!/bin/bash

echo "Removing load test logs..."
find . -type d -name '202*-*' -exec rm -rf {} +
echo "Done!"