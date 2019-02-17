#!/usr/bin/env bash
# sleep, till network init
echo "sleeping for 1m"
sleep 1m

echo "resuming"

# install deps
#sudo apt-get install jq curl

# check if process is running on 4000
# if so attempt to kill
echo "starting onvif detector server"


# run onvif detector server
nohup node onvif.js > onvif.log 2>&1 &

echo "waiting till server stabalize"
sleep 10

out_dir="/media/pi/wathmal (portable)/cctv"
segment_time=900

echo "init ffmpeg"
#nohup ffmpeg -i rtsp://192.168.8.100:554/onvif1 -vcodec h264_omx -b:v 2000k -map 0:v -f segment -segment_time 900 -reset_timestamps 1 -segment_format mp4 -strftime 1 "CAM1_%Y-%m-%d_%H-%M-%S.mp4" > nohup.log 2>&1 &
list=$(curl -X GET http://localhost:4000)

for row in $(echo "${list}" | jq '.[]'); do
    _jq() {
     echo ${row} | jq -r ${1}
    }

    # start avconv
    link=$(_jq '.')
    cmd="nohup ffmpeg -err_detect ignore_err ffmpeg -i $link -vcodec h264_omx -b:v 1800k  -map 0:v -f segment -segment_time $segment_time -reset_timestamps 1 -segment_format mp4 -strftime 1 \"$out_dir/CAM1_%Y-%m-%d_%H-%M-%S.mp4\" > nvr.log 2>&1 &"
    echo ${cmd}
    eval ${cmd}

done