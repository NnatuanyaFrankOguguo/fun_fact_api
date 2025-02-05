# Fun Fact API

## Overview

The **Fun Fact API** provides interesting facts about numbers. Users can query the API with a number as a query parameter, and it returns a fun fact related to that number.

## Features

- Retrieve fun facts about numbers
- Simple and easy-to-use API
- Built using Node.js, Express, and TypeScript
- Dockerized for easy deployment

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/nnatuanyafrankoguguo/fun_fact_api.git
   cd fun_fact_api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the development server:

   ```sh
   npm run dev
   ```

4. To build and run the production server:

   ```sh
   npm run build
   npm start
   ```

## Using Docker

To build and run the API using Docker:

1. Build the Docker image:
   ```sh
   docker build -t fun_fact_api .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 fun_fact_api
   ```

## API Usage

### Endpoint: `/api/classify-number`

#### Method: `GET`

#### Query Parameter:

- `number` (required): The number for which you want to get a fun fact.

#### Example Request:

```
GET http://localhost:3000/api/classify-number?number=7
```

#### Example Response:

```json
{
  "number": 7,
  "fact": "7 is considered a lucky number in many cultures."
}
```

## Contribution

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
