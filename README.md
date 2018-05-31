# 方圆实验室
一个中规中矩的导航网站，体验地址：http://www.fysys.top/

#### 如何部署
##### linux服务器
架构为linux、amd64：
1. git整个项目；
2. 进入相应文件夹，chmod +x shiyanshi，也就是给该文件赋予可执行权限，如果原生满足，则到下一步；
3. 修改conf文件下app.conf文件的监听端口和mode，dev会显示日志，改为test或者prod即可；
4. 运行程序，./shiyanshi
其它架构服务器：使用go编译器自行编译，具体百度或者Google。
##### Windows服务器
架构为Windows、amd64：
1. git整个项目；
2. 修改conf文件下app.conf文件的监听端口和mode，dev会显示日志，改为test或者其它标签即可；
3. 运行程序，双击shiyanshi.exe即可运行
其它架构服务器：使用go编译器自行编译，具体百度或者Google。

#### 版权说明
如果使用本项目，请加上原始链接，说明来源。
