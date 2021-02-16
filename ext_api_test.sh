#!/bin/bash

#curl -v -w "@curl-format.txt" --silent --output /dev/null http://localhost:8080/book?isbn=8535914846
curl -v -w "@curl-format.txt" http://localhost:8080/location?cep=03641040