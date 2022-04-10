# Post messages with images in facebook page

## Install

-   In src/config/config.ts you need to put the page_id of your page and access_token from graph api.

-   nodejs 16.14.2 +

    ```bash
    npm i
    npm start
    ```

-   server will run in localhost:3000/post.
    You need to pass an text that will be the message of post and an image url.

    example:

    ```json
    {
    	"text": "Post Message",
    	"image": "imageurl"
    }
    ```

-   You will get the id of photo as id and the id of the post as id_post.

After get this id_post you are able to get metrics using this url:
localhost:3000/post/:id
Passing as a parameter an id_post
