#!/usr/bin/env bash

npm install && node_modules/knex/bin/cli.js migrate:latest

exec "$@"
