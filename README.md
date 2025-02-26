## Running the API with PostgreSQL

This API works with **PostgreSQL**. To set up a development environment and run a Docker container locally, use the following command:


```bash
docker run --name postgres-container -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=your_database -p 5432:5432 -d postgres:latest
```

Once the container is running, you can connect to PostgreSQL using:

```bash
psql -h localhost -U myuser -d mydatabase
```

## Running PostgreSQL with Persistent Data

### Prerequisites

Before running the container, make sure to create a directory on your machine to store the PostgreSQL data and set the correct permissions:

```bash
mkdir -p [a path on your local machine]/postgres-data
chmod 777 [a path on your local machine]/postgres-data
```

Then run you container with this command:

```bash
docker run --name my-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -v [a path on your local machine]/postgres-data:/var/lib/postgresql/data \
  -d postgres

