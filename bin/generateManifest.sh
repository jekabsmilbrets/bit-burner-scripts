#!/bin/sh

rm -rf ./build/resources
mkdir ./build/resources
touch ./build/resources/manifest.txt

nsFile=$(find ./build/ -type f -name "*.js" -not -name "*Bitburner.t*")

echo "$nsFile" | while read -r line; do
  echo "$line" | sed 's/.\/build/./g' | sed 's/\/\//\//g' >> ./build/resources/manifest.txt
done
