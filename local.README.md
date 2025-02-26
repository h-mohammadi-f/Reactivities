## Running the API with PostgreSQL

This API works with **PostgreSQL**. To set up a development environment and run a Docker container locally, use the following command:


```bash
docker run --name postgres-container -e POSTGRES_USER=admn -e POSTGRES_PASSWORD=admin@1234 -e POSTGRES_DB=reactivities -p 5432:5432 -d postgres:latest
```

Once the container is running, you can connect to PostgreSQL using:

```bash
psql -h localhost -U admn -d reactivities
```

## Running PostgreSQL with Persistent Data

### Prerequisites

Before running the container, make sure to create a directory on your machine to store the PostgreSQL data and set the correct permissions:

```bash
mkdir -p /home/hooman/workarea/reactivities-postgres-data
chmod 777 /home/hooman/workarea/reactivities-postgres-data
```

Then run you container with this command:

```bash
docker run --name my-postgres \
  -e POSTGRES_USER=admn \
  -e POSTGRES_PASSWORD=admin@1234 \
  -e POSTGRES_DB=reactivities \
  -p 5432:5432 \
  -v /home/hooman/workarea/reactivities-postgres-data:/var/lib/postgresql/data \
  -d postgres

```

### Managing the Container

You can stop and start the PostgreSQL container while ensuring that the data persists across container restarts.

To **stop** the running PostgreSQL container, use the following command:
```bash
docker stop my-postgres
```

To **start** the PostgreSQL container again and resume using the same data, run the following command:
```bash
docker start my-postgres
```
