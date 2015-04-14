### 5.0.0-alpha.3 (2015-04-14)


#### Bug Fixes

* **tv-shows:** pass limits to VideoLibraryService.getTVShows for pagination ([5fc46c21](https://github.com/fyfe/WIMM-ng/commit/5fc46c2123cff62d35606e111c8acda62c55ae1a))


### 5.0.0-alpha.2 (2015-04-14)


#### Bug Fixes

* **common:** we only want the hostname/ip not the port number when creating the web socket ad ([05feb627](https://github.com/fyfe/WIMM-ng/commit/05feb627a01d1670613a8623a86a3d199caa505c))


#### Features

* **movies:** add pagination to movies list ([74887979](https://github.com/fyfe/WIMM-ng/commit/748879796bf8ee84b8f95688803804a46b23f98d))
* **tv-shows:** add pagination to TV show list ([0cfa1e29](https://github.com/fyfe/WIMM-ng/commit/0cfa1e29b2e0191b6dec9face28d47085e1cd189))


### 5.0.0-alpha.1 (2015-04-13)


#### Bug Fixes

* ***:** add missing step attribute to input[number] fields that contain float values ([2367d82b](https://github.com/fyfe/WIMM-ng/commit/2367d82b9889039c3afbc4bb81f731c3050971db))
* **app:** add favicon ([312f1f8c](https://github.com/fyfe/WIMM-ng/commit/312f1f8c8a098a97c931833879bb7df3bf7bb61e))
* **common:**
  * votes are stored as strings ([47538a73](https://github.com/fyfe/WIMM-ng/commit/47538a73ceca7f1b29d473b50dd3af2695805dbf))
  * pass value to error message when unable to parse integer or float values ([d45cd793](https://github.com/fyfe/WIMM-ng/commit/d45cd7934bb1e61ce3c4d155d3cd2529738b1416))
* **movies:**
  * fix typo in movie.html template ([7ff0deba](https://github.com/fyfe/WIMM-ng/commit/7ff0deba27ab5b14636913667ab072ff7241d842))
  * add missing translate attributes ([47321e2e](https://github.com/fyfe/WIMM-ng/commit/47321e2ea386e1f5a900a50728a8536562ec400b))
* **tv-shows:** add missing translate attributes ([c1350ec7](https://github.com/fyfe/WIMM-ng/commit/c1350ec7f99e9e92b9ef04a3140c24451e64d1ee))


#### Features

* **app:**
  * retrieve Kodi and API version when connection is opened ([5ad40d66](https://github.com/fyfe/WIMM-ng/commit/5ad40d66a94964aa0d7b38ecaa0d41edb113ce1b))
  * create a basic skeleton application ([e6845c2f](https://github.com/fyfe/WIMM-ng/commit/e6845c2f157c1fb829b26d09e19d9ae2a9e76a35))
* **common:** implement kodi websocket service ([e760c659](https://github.com/fyfe/WIMM-ng/commit/e760c659a21ab0c707477944e5c41169bbe4c9a7))
* **movies:** implement movies section ([31c13c66](https://github.com/fyfe/WIMM-ng/commit/31c13c66f24d0d9b9e61a72b50327bc1fc72bd70))
* **translation:** add en_GB language ([213ff1c4](https://github.com/fyfe/WIMM-ng/commit/213ff1c4de46df9a618de236fdf7d1ee245a909c))
* **tv-shows:** implement tv show section ([7cfa5993](https://github.com/fyfe/WIMM-ng/commit/7cfa5993f6bfaefbaa0d0e96748c2b57e7cabe1d))
