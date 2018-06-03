# www.alternativet.party
The web site of The Alternative in Norway (alternativet.party).


## Setting up a local development environment

### Step 1: Install the dependencies
This will install the dependencies of this starter website. It will pull in several packages like Vue, Vueify, vue-router, gulp and Laravel Elixir (this is just magic syntactical sugar for gulp, basically).

```
npm install
```

### Step 2: Decide on the environment
In resources/assets/js/config you will find configuration files for the various environments you may have. By default, the "development" environment file will be loaded. If you want to load another configuration, you need to export the environment variable APP_ENV to be what you want to want the configuration to be. To do so easily you can precede the command gulp (or gulp watch) from the next step with APP_ENV=production if you want to build for production.

### Step 3: Run Gulp
Gulp will compile the Sass stylesheets and run browserify. All the source files are in the 'resources' folder and will publish the results to the 'public' folder.

```
gulp
```

As discussed in Step 2, you can opt to build for another environment, for example:

```
APP_ENV=production gulp
```

### Step 4: Serve it
You can now serve the files using your webserver of choice.
If you would like to start a simple ad-hoc webserver to test this out, you can use the following one-liner:
```
cd public/
python -m SimpleHTTPServer 8888
```
and then hit http://localhost:8888

## License
The web site is licensed under the terms of the MIT License.