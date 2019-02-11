#!/usr/bin/env bash

# install deps
#sudo apt-get install jq curl

# check if process is running on 4000
# if so attempt to kill

# run onvif detector server
#nohup node onvif.js &

#curl -X GET \
#  http://localhost:4000 \
#  -H 'cache-control: no-cache' \
#  -o cameras.txt

list=$(curl -X GET http://localhost:4000)
#list='["rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov", "rtsp://localhost:8554/demo1"]'

for row in $(echo "${list}" | jq '.[]'); do
    _jq() {
     echo ${row} | jq -r ${1}
    }

    # start avconv
    link=$(_jq '.')
    echo $link
    # avconv ---- &

done