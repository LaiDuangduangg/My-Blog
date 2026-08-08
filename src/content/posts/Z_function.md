---
title: Z函数模板
published: 2026-08-08
category: 算法竞赛
tags: [C++, Z函数]
---

## 问题描述

给定一个长度为 $N$ 的字符串 $S$。

按照以下方式计算数组 $a_0,a_1,\ldots,a_{N-1}$：

- $a_i$ 表示字符串 $S$ 与后缀 $S[i\ldots N-1]$ 的最长公共前缀（LCP）的长度。

## 约束条件

- $1 \le N \le 5 \times 10^5$
- $S$ 中的每个字符都是小写英文字母。

## 输入

输入一个字符串：

```text
S
```

## 输出

输出数组中的所有元素：

```text
a_0 a_1 a_2 ... a_{N-1}
```

## 示例 1

### 输入

```text
abccbca
```

### 输出

```text
7 0 0 0 0 0 1
```

## 示例 2

### 输入

```text
mississippi
```

### 输出

```text
11 0 0 0 0 0 0 0 0 0 0
```

## 示例 3

### 输入

```text
ababacaca
```

### 输出

```text
9 0 3 0 1 0 1 0 1
```

## 示例 4

### 输入

```text
aaaaa
```

### 输出

```text
5 4 3 2 1
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 5e5 + 10;
int z[MAXN];

void Z_function (const string &s) {
    int n = s.length ();
    int c = 1;
    int r = 1;
    int len;
    z[0] = n;

    for (int i = 1; i < n; i ++) {
        len = r > i ? min (r - i, z[i - c]) : 0;
        while (i + len < n && s[len] == s[len + i]) {
            len ++;
        }
        if (i + len > r) {
            r = i + len;
            c = i;
        }
        z[i] = len;
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    string s;
    cin >> s;

    Z_function (s);
    for (int i = 0; i < s.length (); i ++) {
        cout << z[i] << " ";
    }
    return 0;
}
```


<style>
.problem-link {
  display: inline-block;
  width: 280px;
  padding: 12px 24px;
  background-color: #FFB366;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.problem-link:hover {
  background-color: #E65100;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

</style>
<div style="text-align: center; margin: 20px 0;">
  <a href="https://vjudge.net/problem/Yosupo-zalgorithm#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>
