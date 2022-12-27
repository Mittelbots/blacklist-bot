#!/bin/sh
 
type=$1


if [ -z $type ]:
then
    echo "Please specify a type"
    exit 1
fi

if [ $type = "dev" ]; 
then
    echo "Starting in dev mode"
    nodemon --exec python3 main.py
fi

if [ $type = "prod" ]; 
then
    echo "Starting in prod mode"
    pm2 start main.py --interpreter=python3 --name=BlacklistBot
fi