# shop
使用nodejs和react做的H5商店，开发中。需配置自己的七牛key，云片key(不要用我的)。预览地址http://192.243.114.175:8088/

![Image of Yaktocat](http://obbapcolf.bkt.clouddn.com/5d70eeb210b5157af07b9e3d7323521c.png)

**配置步骤**
1.下载
```
git clone https://github.com/CaiLifeng/shop.git
```

2.配置client端,将会生成build文件夹。

```
cd client
npm install
npm run deploy
```

3.安装mongodb，新建collection shop，进入到server文件夹，运行命令

```
mongoimport -d shop -c areas < area.json
```

4.配置server端。
```
npm install
npm install pm2 -g
cd bin
pm2 start www.js
```

5.配置nginx代理,因为location api必须在https环境下才能使用。这里的证书需要自己生成,可以参考http://www.liaoxuefeng.com/article/0014189023237367e8d42829de24b6eaf893ca47df4fb5e000

```
server {
        listen       443 ssl;
        server_name  localhost;

	ssl_certificate    /etc/nginx/ssl/www.shsf4.com.crt;
	ssl_certificate_key  /etc/nginx/ssl/www.shsf4.com.key;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /root/shop/client/build;
            index  index.html index.htm home.html;
        }
        location /api/ {
            proxy_pass http://localhost:3000;
        }

        
        
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```










