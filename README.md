# Quote It
> Read, Watch, Listen and quote all that you like!

[Russian version](README.ru.md)

## Project Overview

Quote Keeper is a full stack multi-page web application designed to store and organize quotes from various sources like movies, books, speeches, etc. It allows users to add quotes along with their respective details, such as source information, cover images, tags, and categories. The project includes a comprehensive implementation of CRUD (Create, Read, Update, Delete) operations, authorization, persistent data storage, and deployment strategies.

### Features

- CRUD operations for quote management.
- User authentication with JWT.
- Ability to add a cover image, source information, tags and categories for each quote.
- Data validation and checks implemented for all the requests.
- Password hashing for user security.

#### Technology Stack

- Frontend: React, Tailwind, SASS
- Backend: Node.js, Express, Apollo Server
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Deployment: Docker, Docker Compose, Reverse Proxy (including Certbot for SSL)

#### Database

This project uses MongoDB with entities including:

- User (for user profiles)
- Box (for grouping quotes)
- Quote (quotes themselves)

## Getting Started

#### Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)

#### Project Setup

Clone the repository to your local machine:

```sh
    git clone https://github.com/shanth1/quote-book.git
    cd quote-book
```

#### Environment Configuration

For the proper functioning of the application, it is necessary to set up an environment configuration file. To do this, create a .env file in the root directory of your project and include the following fields:

```env
NODE_ENV=<environment mode>
MONGO_URI=<MongoDB connection URI>
PORT=<port on which the server will run>
MONGO_USERNAME=<MongoDB username>
MONGO_PASSWORD=<MongoDB password>
CLIENT_VERSION=<client application version>
SERVER_VERSION=<server application version>
SECRET=<secret key for signing tokens or other purposes>
PUBLIC_IP=<public IP address of the server>
```

Where: 

- NODE_ENV - The environment mode, typically development for development and production for deploying the finished application.
- MONGO_URI - Your MongoDB connection URI. Example: mongodb://localhost:27017/mydatabase.
- PORT - The port on which the server will run. For example, 4040.
- MONGO_USERNAME - The username for your MongoDB database.
- MONGO_PASSWORD - The password for your MongoDB database.
- CLIENT_VERSION - The version of your client application, if applicable.
- SERVER_VERSION - The version of your server application.
- SECRET - The secret key used for hashing passwords
- PUBLIC_IP - The public IP address of the server where the application is hosted.


#### Start project

To start the project, use Docker Compose:

```sh
    docker-compose up -d
```

This command will setup and run all the necessary containers.

> After successful startup, the application will be accessible at `http://localhost:3000` for the front-end and the GraphQL API at `http://localhost:4040/graphql`.

## Future Enhancements

- Implementation of advanced filters and search functions.
- Introduction of data encryption for enhanced data security.
- Development of a recommendation system.
- Launching a social networking feature where users can exchange and comment on quotes.

## How to Contribute

Contributions are always welcome! Please feel free to fork the repository, make your changes and create a pull request to submit improvements.

## Contact

If you have any questions or suggestions regarding this project, please open an issue or contact me at [shanthi.bunch@gmail.com](mailto:shanthi.bunch@gmail.com).