# Build Instructions

WIMM is built using the [Node.js](https://nodejs.org/) framework.

* Install the latest stable release of [Node.js](https://nodejs.org/) (currently v0.12.*)
* [Fork](https://help.github.com/articles/fork-a-repo/) the WIMM-ng repository
* Install the required global packages `npm install -g gulp bower`
* Install the development dependencies `npm install`
* Install the runtime dependencies `bower install`
* To build WIMM-ng run `gulp build`
* To create a Kodi add-on file run `gulp dist`

All work should be based on the `develop` branch, the `master` branch is used only for creating new releases.
