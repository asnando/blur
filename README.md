# Blur
`Blur` is a serverless image processing service which takes an input url and returns the image with blur filter.

## Usage
```bash
curl https://serverless-blur.herokuapp.com?image=$image_url
```

### Params

<b>image</b> `required`

The url of the image that will be blured.

<b>blur</b>

The blur filter factor to apply. If not defined it will use the default value of `5`.
