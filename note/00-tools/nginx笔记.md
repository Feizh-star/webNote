# nginx笔记

## 1.nginx
......

## \*.杂项(待整理)

### 1.2022.05.03
- 安装nginx教程 https://zhuanlan.zhihu.com/p/425790769 第三种可用
- 启动nginx：systemctl start nginx
- 停止nginx：systemctl stop nginx
- 重新加载配置nginx -s reload
- 直接停止 nginx -s stop
- 从容停止 nginx -s quit
- 查看nginx默认的配置文件路径 nginx -t
- nginx https代理codeserver  偶现502
    ＋ 是因为没有开启http1.1的长连接，导致nginx与codeserver（相当于后端）的连接很快就断掉了，于是再打开网站时，nginx找不到codeserver了
    ＋ 解决办法，在于server块同级的地方增加upstream块，开启长连接
    ```
    # HTTPS server
    #
    upstream codeserver {
        server localhost:8085;  # 这个就是后台服务的地址
        keepalive 256;
    }
    server {
        #SSL 访问端口号为 443
        listen       443 ssl;
        #绑定证书的域名
        server_name  www.mycodeserver.top;
        # 略

        location / {
            proxy_pass http://codeserver; #这个codeserver要跟upstream 后面的那个一致
            # 略
        }
    }
    ```
