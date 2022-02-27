echo -n "Please enter a build message:"
read message

npx ng build

xcopy dist\\smart-mirror-display ..\\smart-mirror-deployment\\.

cd ..\\smart-mirror-deployment
git add .
git commit -m "$message"
git push