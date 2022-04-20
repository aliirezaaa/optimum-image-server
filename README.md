
# Optimum image server

Boost your website/application speed by serving your online images with optimum size and quality.

The optimum image server receives online image requests and serves the optimum image using the compression method.
It saves a copy of the optimized image in the image directory to minimize compression time for other requests.

It could boost your website/application speed by serving your images with 80 percent reduced size.
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
* Set the directory where the photos are stored and the port you want the server listens to.

```
  docker-compose run -d
```
* Proxy your image requests in your web server like Nginx or Apache to the port you set in the previous step.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`IMAGES_DIRECTORY ` the directory where the photos are stored

`PORT` the port you want the server listens to


## Image request example


#### Get image

```http
  GET /:folder/:scope/:image
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `folder`      | `string` | **Required**. folder of image to fetch |
| `scope`      | `string` | **Required**. scope of image to fetch |
| `image`      | `string` | **Required**. image name to fetch |




## Roadmap

- Migrate to Typescript

- Add more customizable features.


## Feedback

If you have any feedback, please reach out to us at javaheri.manesh@gmail.com

