#!/bin/bash
echo "linting frontend ..."
cd frontend
eslint ./src --fix
echo "frontend linted !"