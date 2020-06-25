---
title: c复习随笔
tags:
  - c++
abbrlink: 9156b09f
date: 2020-05-12 08:43:23
article_type: 0
---

# <br>指针 
## 1.指针的使用 ## 
<!-- more -->
```
//指针的初始化

int p = 5;
int *p_t = &p;
//或
int p = 5;
int *p_t;
p_t = &p;



long *fellow; 
*fellow = 23323;  //不可行，fellow是一个指针，但它指向的是哪里？
//一定要在对指针的应用解除引用运算符（*）之前，将指针初始化为一个确定的、适当的地址。

int *pt = new int;
*pt = 1001;   //使用new为int类型的数据对象分配内存
delete pt;	 //new分配的地址需要释放

```
## 2.指针算术 ## 
```
#include "stdafx.h"
#include<iostream>

int main()
{
	int tacos[10] = {5, 2, 8, 4, 1, 2, 2, 4, 6, 8};
	int *pt = tacos;  //数组名为数组的第一个元素的地址
	pt = pt + 1;
	int *pe = &tacos[9];
	pe = pe - 1;
	int diff = pe - pt;
	printf("diff=%d",diff); //diff=7
	getchar();

}
```
# 运算符 #
## 1.++运算符 ##
```
int x = 5;
int y = ++x; // y = 6, x = 6

int z = 5;
int y = z++; //y = 5, z = 6;
```
## 2.++运算符和指针 ##
```
double arr[5] = {21.1, 32.8, 23.4, 45.2, 37.4};
double *pt = arr;  // pt points to arr[0], to 21.1
++pt;			//pt points toarr[1],to 32.8
double x = *++pt;  //先++用于pt,再将*应用于被递增后的pt。  arr[2],to 23.4
++*p;        //先取pt指向的值再加1，把23.4改成 24.4. pt仍然指向arr[2].
(*pt)++;     //先取得pt的值再加1，把24.4改成25.4，pt仍然指向arr[2]
x = *pt++;   //后缀++优先级高，指针先递增，但是后缀运算符将对原来的地址（&arr[2]）而不是递增后的地址解除引用（*），因此*pt++的
			//	值是arr[2],25.4。在该语句执行完后，pt的值讲师arr[3]的地址
```
前缀递增、前缀递减和*的优先级相同，以从右到左的方式结合。
后缀递增、后缀递减的优先级相同，比前缀运算符优先级高，以从左到右方式结合
