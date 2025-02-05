#use Node.js LTS image
FROM node:18-alpine

#set the working directory
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install 

# copy the rest of the project files
COPY . .

#Build the Typescript files
RUN npm run build 

#Expose the application port
EXPOSE 3000

#start the app
CMD ["node", "dist/index.js"]