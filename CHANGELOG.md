### 5.0.3 (2015-04-17)


#### Bug Fixes

* **app:** controller names need to be unique over modules ([638e466e](https://github.com/fyfe/WIMM-ng/commit/638e466ee75e2ce484fde8742093bcf975a703d1))


### 5.0.2 (2015-04-17)


#### Features

* **movies:**
  * add recently added view ([272f5dc7](https://github.com/fyfe/WIMM-ng/commit/272f5dc772c310f2727be714b79729d021d30993))
  * refactor movies view and add view by genre, tag and set ([0f86d21f](https://github.com/fyfe/WIMM-ng/commit/0f86d21fd47cc0cd1dae376192543f2baed299be))
* **tv-shows:** refactor tv shows view and add view by genre, tag and set ([609f30cf](https://github.com/fyfe/WIMM-ng/commit/609f30cf8eb5d4b4bfe36da7b80368d0db6e8735))


### 5.0.1 (2015-04-15)


#### Bug Fixes

* **app:**
  * increase genre and tag field sizes ([c1475d58](https://github.com/fyfe/WIMM-ng/commit/c1475d5859b6ca3fc1831719d9d40f9875b640e2))
  * increase maximum width for large screens ([18d3e6f8](https://github.com/fyfe/WIMM-ng/commit/18d3e6f83a1cd8a5d30310641da9307004251e1d))


## 5.0.0 (2015-04-14)


#### Bug Fixes

* **app:** make the under construction pages look the same as the other pages ([87fbcaf0](https://github.com/fyfe/WIMM-ng/commit/87fbcaf0eec30e0794bfceee10d0b2920cfc0f17))


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
