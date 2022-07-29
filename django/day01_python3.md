**在linux终端编写python的注意：**

* 第一行加上类似`shell`的`#! /usr/bin/env python3`，目的是让python能向命令文件运行
* 第二行最好声明编码`# -*- coding: encoding -*-`
* 按两下`tab`可以自动补全，退出是`exit()`
* `ipython3`有高亮更加高级

#  

**运行python两种方式：**

* 变成可执行文件，用`./`执行
* 使用python3执行`python3 文件名`

#  

**python函数：**

* 参数赋值是按照参数名字赋值而不是位置

  ```python
  def a(a,b,c):
      print(a,b,c)
  
  a(a=2,c=5,b=4)  #2 4 5
  ```

* 参数可以设置默认值，但是第一个参数设置了默认值后面的参数都要设置

* 函数可以直接赋值，函数也是变量

* 函数解包概念

  ```python
  def a(a,b,c):
      print(a,b,c)
  c = [2,4,5]
  a(*c)  #2 4 5 解包数组用*
  
  #解包字典用**
  d = {'a':2,'b':4,'c':5}
  a(**d)
  #解包的时候参数要一一对应
  ```

#  

**数据结构：**

* 集合判重：

  ```python
  a = [1,2,3,1,2,3]
  a = list(set(a))
  print(a)   #[1, 2, 3]
  ```