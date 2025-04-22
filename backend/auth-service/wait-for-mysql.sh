#!/bin/sh
set -e

echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "MySQL is unavailable - sleeping"
  sleep 10
done

echo "✅ MySQL is up - starting app"
exec "$@"
