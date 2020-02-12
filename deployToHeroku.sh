#!bin/bash

cd calendarBackend
rm -rf ./build
cd ../calendar-front
rm -rf ./build
npm run build
cp -r ./build ../calendarBackend/
cd ..
git add *
git commit -m 'new automated build'
git push -u
git subtree push --prefix=calendarBackend heroku master