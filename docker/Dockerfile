# Use the base image with Node.js
FROM node:10.24.0

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

# Copy the current directory into the Docker image
COPY . /mfe-header

# Set working directory for future use
WORKDIR /mfe-header

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
