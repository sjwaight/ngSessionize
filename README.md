# ngSessionize

This is a solution which takes session and speaker data from [Sessionize's](https://sessionize.com/) standard APIs and displays it in an AngularJS application. It adds filtering which Sessionize dos not provide and may be enhanced to provide additional functionality as well.

## Using this project
Please fork this repository and use as you need :)
There's a few steps you need to be aware of to make changes:
* Go to Sessionize and generate a new api key, update line 11 of `./services/ngSessionizeService.js` with that key
* Update line 17 of `webpack.config.js` to use an absolute path that matches to `./build` in this project
* Run `yarn` or `npm install`
* Run `yarn build` or `npm run build` to have webpack regenerate the `./build/ngSessionize.js` file with your changed code.
* If you make changes to the `scss` files these are not currently watched so you will need to make a change to a javascript file to trigger a regeneration of the `./build/ngSessionize.js`
* If you are deploying to a SharePoint site you will need to leverage the pnp-ww library. Take a look at `./build/ngSessionize.html` to see an example usage. You can put that html fragment into a Script Editor web part to with updated URLs to make use of this AngularJS application
* You will need to self host the `./build/ngSessionize.js` somewhere as Rawgit is shutting down and using the Raw view url in github won't work as it doesn't respond with the correct mime type.
