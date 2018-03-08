title: Collection of work notes \o/
layout: not defined yet :D
---
***

# CheatSheet

---

<br><br>
> [Design Patterns in Back-end Development](https://github.com/binhnguyennus/awesome-scalability)  
[Free Software Network Services](https://github.com/Kickball/awesome-selfhosted)  
[Curated list of awesome lists](https://github.com/sindresorhus/awesome)  
[The official Exploit Database repository](https://github.com/offensive-security/exploit-database)  
[Path to a free self-taught education in Computer Science!](https://github.com/ossu/computer-science)  
[Scan for open S3 buckets and dump](https://github.com/sa7mon/S3Scanner)  
[A multi-threaded tool for resumable Wordpress bruteforcing](https://github.com/sa7mon/press)  
[Welcome to the NetSPI SQL Injection Wiki!](https://sqlwiki.netspi.com/)

<br><br>

---

> Shell
======

---

<br><br>

***# Rsync***
> ``` bash
rsync -alPvz $PWD/folderOrFileToSend [USER@]HOST:DEST
```

***# Checking things***
> ``` bash
sudo lsof -P | grep TCP | grep LISTEN
ss -tapn
nmap -p 1-65535 -T4 -A -v ip_found
sudo tailf /var/log/syslog
du -hs .
w
tailf /var/log/mongodb/mongodb.log
sudo tailf /var/log/nginx/error.log
```

***# Goaccess launch live report***
> ``` bash
goaccess /home/log/nginx/access.log -o /path/to/static/folder/report.html \
-m --with-mouse \
-i --hl-header \
-d --with-output-resolver \
--ignore-crawlers \
--all-static-files \
--log-format=COMBINED \
--real-time-html \
--sort-panel=VISITORS,BY_DATA,DESC \
--sort-panel=REQUESTS,BY_VISITORS,DESC \
--ssl-cert=/etc/letsencrypt/live/website.com/fullchain.pem \
--ssl-key=/etc/letsencrypt/live/website.com/privkey.pem \
--ws-url=wss://website.com
```

***# Var to pm2***
> ``` bash
NODE_ENV=production pm2 start server.js -n app_name
```

***# Mongodb collections***
> ``` bash
mongodump --db=my_db --collection=my_collection --out=my_new_folder
mongorestore --db=<new_db_name> --collection=<new_collection_name> [my_new_folder|<db_name>|<collection_name>.bson]
```

<br><br>

---

> Nginx
======

---

<br><br>

***# Request to php-fpm***
> ``` bash
location / {
	try_files $uri $uri/ /index.php?$args;
	include fastcgi_params;
	fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
	fastcgi_split_path_info ^(.+\.php)(/.+)$;
	fastcgi_index public/index.php;
	fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	allow 127.0.0.1;
	fastcgi_param HTTPS on;
}
```

***# Request to nodejs***
> ``` bash
location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_redirect off;
}
```

<br><br>

---
