# Project Overview

This project shows sample configurations for Grunt, Bower, and Bundler.


## Setup


Before running any of the setup steps below, you must have [Grunt](http://gruntjs.com), [Bower](http://bower.io), and [Bundler](http://bundler.io) installed on your machine. These tools are installed globally, not per project, so if you've installed them once already then you're good. If not, here are the commands to install:

Install Grunt:

    npm install -g grunt-cli

Install Bower:

    npm install -g bower

Install Bundler:

    gem install bundler

> Note: Grunt and Bower require that [Node](http://nodejs.org/) be installed installed on your machine. Bundler requires [Ruby](https://www.ruby-lang.org/en/installation/).


### 1. Install Grunt dependencies

Grunt is used to concatenate and minify Javascript, as well as run a local server instance with this website.

To install all needed Grunt plugins, run the following command from the root folder of this project:

    npm install


### 2. Install Javascript dependencies

Bower is used for Javascript dependency management. Run the following command to install all dependencies into the `/bower_components` folder:

    bower install

This installs all libraries specified in the `bower.json` file.

 If you need to add any additional dependencies, you should use Bower to install them as follows:

    bower install [name of plugin] --save

The `--save` flag will add the dependency info to the bower.json config file.


### 3. Install Gem dependencies

Bundler is used for management of Gem dependencies. To install all Gem dependencies for this project, run the following command:

    bundle install --binstubs --path=bin

This will install all Gem dependencies locally within the project in a directory called /bin:

Now when running any commands for Gem dependencies (e.g., Compass), prefix them with bin/, e.g.:
    
    bin/compass watch


### 4. Run the build scripts

Compile CSS:

    bin/compass compile

Compile vendor Javascript to `/js/build/vendor.min.js`:

    grunt buildVendorScripts

Compile custom Javascript to `/js/build/scripts.min.js`:

    grunt build


### 5. Run a local instance of the site:

    grunt server



## Ongoing Development


### Styles/CSS

To compile CSS as you work:
    
    bin/compass watch

To compile CSS one time only:

    bin/compass compile


### Javascript

Run the following watcher while doing any Javascript development:

    grunt watcher

This will watch for changes to your Javascript and re-build minified files. Note that you will still need to refresh
your browser for any changes to take effect.

To do a one-time build, run the following command:

    grunt build

Note that the commands above only build custom Javascript. In order to rebuild 3rd party libraries, run the following:

    grunt buildVendorScripts

You only need to run this command if you're adding new or updated 3rd-party Javascript libraries (e.g., you install a new library using Bower).

**Important:** When adding new 3rd party libraries, you need to add them to the `concat:vendorScripts`
configuration in Gruntfile.js. Read through the comments in [Gruntfile.js](./Gruntfile.js) for more detailed info on the supported commands.


## Configuration Files

#### .bowerrc

Specifies the directory where Bower will install libraries.

#### .gitignore

Specifies files that Git shouldn't commit to repository.

#### .jshintrc

Settings that JSHint should use when validating syntax. View [JSHint configuration options](http://www.jshint.com/docs/options/).

#### bower.json

Bower configuration file. Used to lock versions of installed libraries. When you execute the `bower install` command, Bower installs the libraries specified in this file.

#### config.rb

Compass configuration used to compile SASS to CSS.

#### Gemfile

File used by Bundler to manage Gem dependencies. When you execute the `bundle install` command, Bundler installs the libraries specified here.

#### Gemfile.lock

Snapshot file written by Bundler. **Do not update this file manually.** Shows the exact versions of libraries that were installed by Bundler. 

#### Gruntfile.js

Configuration file for building optimized Javascript files and for running a local instance of the site.

#### package.json

Configuration file for Node dependencies. When you execute the `npm install` command, Node installs the libraries specified in this file.


## Folders

#### bin/

Created when running `bundle install`. Ruby dependencies are stored here.

#### bower_components/

Created when running `bower install`. Dependencies managed by Bower are stored here.

#### css/

Compiled CSS is saved here. Do not edit these files. Make any styles changes in the `scss` folder and compile CSS using `bin/compass` commands.

#### js/

Javascript source files. Optimized Javascript gets compiled into the `js/builds` folder.

#### js/builds/

Compiled, optimized Javascript files are saved here. Do not edit these files directly. Make any Javascript edits in the `js` folder and use the Grunt build scripts to compile and export optimized Javascript to this folder.

#### node_modules/

Created when running `npm install`. Dependencies managed by Node are stored here.

#### scss/

Pre-compiled styles. Make any style edits in this folder. These files will be compiled into CSS and exported into the `css` folder.


