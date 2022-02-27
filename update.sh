cd /home/pi/smart-mirror-deployment
git pull

cp . /var/www/html/.

sudo /etc/init.d/nginx start

xset -dpms # disable DPMS (Energy Star) features.
xset s off # disable screen saver
xset s noblank # don't blank the video device
matchbox-window-manager &
midori -e Fullscreen -a http://localhost/


cd /home/pi/smart-mirror-deployment
git pull
cp . /var/www/html/.

sudo killall midori
midori -e Fullscreen -a http://localhost/
