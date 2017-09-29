# Production: Hosted VPS
[Using PM2](http://pm2.keymetrics.io/)


## Start the Server
Start a server cluster, one per processing core:

```shell
bash server.sh
```

Start a `3` server cluster for load balancing:

```shell
bash server.sh 3
```

The number `3` can be replaced with any number. The default is `0`: equal to the number of CPU cores.

Once the server is running, you don't need to run the server start script again; only update.


## Update from Git and Restart
```shell
bash update.sh
```

If you update the `update.sh` file, make sure to run `git pull` prior to running the update script.


## Stop the Server
```shell
bash stopServer.sh
```
