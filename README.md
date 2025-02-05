# Fun Fact API

## Overview
Fun Fact API is a simple RESTful API that provides random fun facts on various topics. It is built with TypeScript and designed to be lightweight, fast, and easy to deploy using Docker.

## Features
- Provides random fun facts.
- Supports multiple categories of facts.
- Built with TypeScript for type safety.
- Dockerized for easy deployment.
- Uses Express.js for handling API requests.

## Installation
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Clone the Repository
```sh
git clone https://github.com/yourusername/fun_fact_api.git
cd fun_fact_api
```

### Install Dependencies
```sh
npm install
```

## Running the API
### Using Node.js
```sh
npm run dev
```

### Using Docker
#### Build the Docker Image
```sh
docker build -t fun_fact_api .
```

#### Run the Container
```sh
docker run -p 3000:3000 fun_fact_api
```

The API should now be running at: [http://localhost:3000](http://localhost:3000)

## Using Docker Compose
To manage dependencies and run the API more efficiently, you can use Docker Compose:

```sh
docker-compose up -d
```

## API Endpoints
### Get a Random Fun Fact
```http
GET /fact
```
**Response:**
```json
{
  "fact": "Bananas are berries, but strawberries aren't."
}
```

### Get Fun Facts by Category
```http
GET /fact/:category
```
**Example:**
```http
GET /fact/science
```

**Response:**
```json
{
  "fact": "Water can boil and freeze at the same time."
}
```

## Environment Variables
You can configure the API using a `.env` file:
```env
PORT=3000
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
