# WETA Proxy Service for Engaging Networks
## Google Cloud Function Proxy
This repo is a custom proxy service for [WETA](https://weta.org) to connect to an external API, Engaging Networks.

# Getting started for local testing
1. Clone down the repo.

1. Install dependencies:
    ```
    $ npm install
    ```
1. In your console, start the service:
    ```
    $ npm run start
    ```

    >**NOTE**: the service will start on `localhost:8001` by default. You can change the port in `package.json` under `scripts/start`.
1. Issue a test request:
    ```
    $ curl localhost:8001/authenticate
    ```

# Creating a local domain
When running locally (`npm run start`), a localhost service is running, but this address can't be used in Drupal to ping requests to, and you will run into a `Connection Refused` error. To bypass this, we need to give the service an actual domain. To do this easily, we can utilize [Ngrok](https://ngrok.com/) to set up a temporary tunnel.

1. Install Ngrok:
  ```
  brew cask install ngrok
  ```

1. Ensure the local service is running (i.e `localhost:8001`):
  ```
  npm run start
  ```

1. In a new terminal session, pipe the localhost to Ngrok:
  ```
  ngrok http http://localhost:8001
  ```

1. Ngrok will provide forwarding addresses than can then be used for testing in Drupal:
  ```
  Forwarding                    http://dc1b6c7f.ngrok.io -> http://localhost:8001
  Forwarding                    https://dc1b6c7f.ngrok.io -> http://localhost:8001
  ```

# Environment variables
There is a single environment variable utilized in the `.env` file in the root of the project:
  ```
  PROXY_URL='https://us.e-activist.com/ens/service'
  ```
