# 4 SSH-SCP传文件

### 基本用法

命令格式：

```sh
scp source destination
```

将`source`路径下的文件复制到`destination`中

#  

一次复制多个文件：

```sh
scp source1 source2 destination
```

#  

复制文件夹：

```shell
scp -r ~/tmp myserver:/home/acs/
```

将本地家目录中的`tmp`文件夹复制到`myserver`服务器中的`/home/acs/`目录下。

```shell
scp -r ~/tmp myserver:homework/
```

将本地家目录中的`tmp`文件夹复制到`myserver`服务器中的`~/homework/`目录下。

```shell
scp -r myserver:homework .
```

将`myserver`服务器中的`~/homework/`文件夹复制到本地的当前路径下。

#  

指定服务器的端口号：

```shell
scp -P 22 source1 source2 destination
```

#  

**注意**：` scp`的`-r -P`等参数尽量加在`source`和`destination`之前。

#  

使用`scp`配置其他服务器的`vim`和`tmux`

```shell
scp ~/.vimrc ~/.tmux.conf myserver:
```

