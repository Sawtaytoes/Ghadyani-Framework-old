#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
export NODE_ENV=production

rm -r web/*
git reset --hard HEAD
git pull
npm prune
npm install
coffee index.coffee compile
chown -R www-data:www-data .
pm2 gracefulReload ${PWD##*/}
