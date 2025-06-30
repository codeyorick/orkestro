#!/bin/bash
set -a
source .env
set +a

if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    exit 1
fi

supabase db $1 --db-url="$DATABASE_URL"
