echo -n "Please enter a build message:"
read message

git clone https://github.com/tochsner/smart-mirror-deployment.git

cd smart-mirror-display
npx sng build

xcopy dist\smart-mirror-display ..\smart-mirror-deployment\.

cd ..\smart-mirror-deployment
git add .
git commit -m "$message"
git push

cd ..
del smart-mirror-deployment /q