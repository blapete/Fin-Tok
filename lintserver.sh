#!/bin/bash
echo "linting server ..."
cd backend
eslint ./app --fix
echo "server linted !"