# Use a Node base image
FROM node:slim

# Skip downloading Chromium as we're using Google Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Update and install dependencies for Google Chrome
RUN apt-get update && apt-get install -y gnupg wget \
    && wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy your application files
COPY . /app

RUN chmod +x start_browser.sh

# Install app dependencies
COPY package*.json ./
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
