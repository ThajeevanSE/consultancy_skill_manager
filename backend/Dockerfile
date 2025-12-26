# 1. Choose the base image (like buying a laptop with Node pre-installed)
FROM node:18-alpine

# 2. Set the working directory inside the container (create a folder named 'app')
WORKDIR /app

# 3. Copy package files first (to install dependencies)
# We do this separate from the rest of the code for efficiency
COPY package*.json ./

# 4. Install the dependencies inside the container
RUN npm install

# 5. Copy the rest of your backend code into the container
COPY . .

# 6. Expose the port your app runs on (5000)
EXPOSE 5000

# 7. The command to start your app when the container spins up
CMD ["npm", "run", "dev"]