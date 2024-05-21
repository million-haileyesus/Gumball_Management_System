# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001
EXPOSE 3001

# Define environment variables
ENV MONGO_URI=mongodb://mongo:27017/Gundam
#ENV JWT_KEY=15e281e043b9e4f4b2ee0073e2635eba4fab2f237e82a63a766578ff6d7de345

# Define the command to run the Express app
CMD ["npm", "start"]