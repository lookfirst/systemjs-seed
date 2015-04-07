#!/bin/bash

# Holy shit batman!
# https://github.com/travis-ci/travis-ci/issues/938
# https://github.com/travis-ci/travis-ci/issues/2555

#sudo apt-get install -y python-software-properties
#sudo apt-add-repository "deb http://dl.google.com/linux/chrome/deb/ stable main"
#sudo sed -i s/deb-src.*google.*//g /etc/apt/sources.list
#wget -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
#sudo apt-get update -qq
#sudo apt-get install -y google-chrome-stable
#
#chmod 1777 /dev/shm

echo `pwd`
ls -la /dev/shm

curl -Lo chrome.zip https://download-chromium.appspot.com/dl/Linux_x64
unzip chrome.zip
