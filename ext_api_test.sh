#!/bin/bash

curl -v -w "@curl-format.txt" --silent --output /dev/null http://localhost:8080/book?isbn=8535914846