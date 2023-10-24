#!/bin/bash

docker compose up -d --build

sleep 5

docker exec -it mongo1 /scripts/rs-init.sh