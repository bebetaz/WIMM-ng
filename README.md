# Web Interface Media Manager (WIMM) for [Kodi](http://kodi.tv/)

WIMM is a web interface add-on for [Kodi](http://kodi.tv/) that allows you to modify the metadata for movies, tv shows and music from a standard browser.

* [Support Thread and Discussion](http://forum.kodi.tv/showthread.php?tid=188839&action=lastpost)
* [Releases](https://github.com/fyfe/WIMM-ng/releases)
* [Issues](https://github.com/fyfe/WIMM-ng/issues)
* [WIMM IRC Channel](https://webchat.freenode.net/?channels=##wimm) @ freenode

___

### Installation Instructions

* Install WIMM-ng (_no automatic updates_)
  - Download the [latest release](https://github.com/fyfe/WIMM-ng/releases)
  - Go to System > Add-ons
  - Select [Install from a zip file](http://kodi.wiki/view/HOW-TO:Install_an_Add-on_from_a_zip_file "HOW-TO: Install an Add-on from a zip file")
* Install the WIMM repository (_for automatic updates_):
  - Download the [WIMM repository](http://kodi.neptune-one.net/repository.wimm-1.0.0.zip)
  - Go to System > Add-ons
  - Select [Install from a zip file](http://kodi.wiki/view/HOW-TO:Install_an_Add-on_from_a_zip_file "HOW-TO: Install an Add-on from a zip file")
 - Go to System > Add-ons > Get Add-ons > WIMM Repository > Web interfaces
 - Select the WIMM-ng add-on
* Enable web interface:
 - Go to System > Services > Webserver > Services
 - Enable Allow control Kodi via HTTP
 - Set Web Interface to WIMM (_optional_)
* Access WIMM:
 - If you made WIMM the default web interface open your browser to http://`WIMM_ip`:`port`/
 - Otherwise open your browser to http://`WIMM_ip`:`port`/addons/webinterface.WIMM-ng/
 
___

### Development & Build Instructions

All work is done against the `develop` branch and the `master` branch contains the latest release.

For build instructions and development related documentation see the [docs](https://github.com/fyfe/WIMM-ng/tree/develop/docs) folder.
