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
```



# Enabling HTTPS with Self-Signed Certificate for Local Development

If you are developing a Web API in .NET and want to use HTTPS locally, you can set up a self-signed certificate for local development. This guide will help you resolve the **"Your connection is not private"** and **"net::ERR_CERT_AUTHORITY_INVALID"** errors when accessing your Web API via `https://localhost`.

## Prerequisites

- .NET SDK installed on your system.
- A Web API project created using .NET Core or .NET 5+.
- Administrative permissions to trust the certificate on your local machine.

## Step 1: Generate and Trust a Self-Signed Certificate

To create and trust a self-signed certificate for your development environment, run the following command in your terminal:

```bash
dotnet dev-certs https --trust
```

This command generates a self-signed certificate and trusts it for your local development environment.
You may be prompted to allow the certificate to be trusted. Follow the on-screen instructions to approve it (administrative permissions may be required).
## Step 2: Verify the Certificate Installation
To confirm that the certificate has been correctly installed and trusted, use the following command:

```bash
dotnet dev-certs https --check
```

If the certificate is trusted, you should see a success message. If not, repeat the steps or consult the troubleshooting section below.

## Step 3: Ensure Your Web API Uses HTTPS
By default, .NET Core projects are configured to use HTTPS. To make sure your project is set up correctly:

Open the launchSettings.json file located in the Properties folder of your project.

Ensure the https profile is configured like this:

```json

"profiles": {
  "https": {
    "commandName": "Project",
    "environmentVariables": {
      "ASPNETCORE_ENVIRONMENT": "Development"
    },
    "applicationUrl": "https://localhost:5001"  // Ensure HTTPS is used
  }
}

```
If the URL doesn’t include https://localhost:5001 (or the port your application runs on), you can manually add or modify it.

## Step 4: Clean and Regenerate Certificates (if needed)
If you're still experiencing issues, it's possible that an old certificate is causing conflicts. You can clean up existing certificates and regenerate them by running the following commands:

```bash
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

This will remove any old certificates and create new ones that are trusted for your local development.

## Step 5: Restart Your Application

Once the certificate is generated and trusted, restart your Web API to apply the changes. You can do this with the following command:

```bash
dotnet run
Step 6: Access Your Web API
```

After completing the previous steps, you should be able to access your Web API via HTTPS at:

```bash
https://localhost:5001
```

The browser should no longer show the "Your connection is not private" warning, and you should be able to make secure connections to your local development server.

## Troubleshooting
Browser Cache: If you are still seeing the certificate warning, try clearing your browser cache or open the page in an Incognito/Private window.

Operating System Trust Store: On Linux or macOS, the certificate might not be added automatically to your system’s trust store. If needed, follow the instructions for adding the certificate manually:

- For macOS:
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.dotnet/core/sdk/{version}/https/localhost.crt
```
- For Windows:

Use the "Manage Computer Certificates" utility and import the .crt file under Trusted Root Certification Authorities.

## Conclusion
By following these steps, you can generate, trust, and configure a self-signed certificate for your local development environment, enabling HTTPS for your Web API. This will eliminate the "Your connection is not private" error while working locally.