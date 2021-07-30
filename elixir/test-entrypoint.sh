#!/bin/bash
# Docker entrypoint script.

# expose postgres credentials to psql commands below
export PGHOST=$POSTGRES_HOST
export PGUSER=$POSTGRES_USER
export PGPASSWORD=$POSTGRES_PASSWORD

# Wait until Postgres is ready
while ! pg_isready -q -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER
do
  echo pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER
  echo $(pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER)
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $POSTGRES_DATABASE"` ]]; then
  echo "Database $POSTGRES_DATABASE does not exist. Creating..."
  mix ecto.create
  mix ecto.migrate
  echo "Database $POSTGRES_DATABASE created."
fi

exec mix test
