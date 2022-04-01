# pull node image for building
FROM node:alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install 

COPY . ./
RUN npm run build

#Stage 2
#pull nginx
FROM nginx:1.19.0
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]