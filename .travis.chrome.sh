#!/bin/bash

# Holy shit batman!
# https://github.com/travis-ci/travis-ci/issues/938
# https://github.com/travis-ci/travis-ci/issues/2555

apt-get install -y python-software-properties
apt-add-repository "deb http://dl.google.com/linux/chrome/deb/ stable main"
sudo sed -i s/deb-src.*google.*//g /etc/apt/sources.list
wget -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
apt-get update -qq
apt-get install -y google-chrome-stable

chmod 1777 /dev/shm
