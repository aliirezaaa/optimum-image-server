
# Optimum image server

A brief description of what this project does and who it's for


## Features

- Compressing and serving images  
- Dockerized
- Three image formats supported  [ png, jpeg, webp ]
- Three quality levels supported [ low, medium, high ]
- Storing compressed images for the subsequent requests and serving them


## Deployment

To deploy this project run

```
  git clone https://github.com/aliirezaaa/optimum-image-server.git
```

```
  cd optimum-image-server/
```
Set the directory where the photos are stored and the port you want the server listens to.
```
  edit .env and set IMAGES_DIRECTORY and PORT
```
```
  docker-compose run -d
```
## Feedback

If you have any feedback, please reach out to us at javaheri.manesh@gmail.com

