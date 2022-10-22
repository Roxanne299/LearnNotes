```
# 显示根目录 / 下的文件和子目录，绝对路径
hadoop fs -ls /
# 新建文件夹，绝对路径
hadoop fs -mkdir /hello
# 上传文件
hadoop fs -put hello.txt /hello/
# 下载文件
hadoop fs -get /hello/hello.txt
# 输出文件内容
hadoop fs -cat /hello/hello.txt


使用hdfs模块


```