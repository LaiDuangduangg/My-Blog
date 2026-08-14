---
title: Password (4.0)
published: 2026-08-14
category: 算法竞赛
tags: [C++, Z函数]
---


## 题目描述

Asterix、Obelix 和他们的临时伙伴 Suffix、Prefix，终于找到了和谐神庙。然而，它的大门被牢牢锁住，即使 Obelix 也无法打开。

他们在神庙大门下的一块岩石上发现了一个字符串 $s$。Asterix 认为这是打开神庙的密码，于是大声念了出来。但是什么也没有发生。于是 Asterix 猜测，密码可能是字符串 $s$ 的一个子串 $t$。

Prefix 认为子串 $t$ 应该是字符串 $s$ 的开头；Suffix 认为子串 $t$ 应该是字符串 $s$ 的结尾；Obelix 认为 $t$ 应该位于字符串 $s$ 内部的某个位置，也就是说，$t$ 既不是 $s$ 的开头，也不是 $s$ 的结尾。

Asterix 选择了一个子串 $t$ 来满足所有伙伴的要求。此外，从所有可接受的字符串中，Asterix 选择了最长的一个（因为 Asterix 喜欢长字符串）。当 Asterix 大声念出子串 $t$ 时，神庙的大门打开了。

给定字符串 $s$，请找出满足条件的子串 $t$；如果这样的子串不存在，则说明上面的故事只是一个美丽的传说。

## 输入格式

输入一个字符串 $s$，其长度在 $1$ 到 $10^6$ 之间（包括边界），且仅由小写拉丁字母组成。

## 输出格式

输出满足条件的字符串 $t$。

若不存在合适的字符串 $t$，则输出：

```text
Just a legend
```

## 示例 1

### 输入

```text
fixprefixsuffix
```

### 输出

```text
fix
```

## 示例 2

### 输入

```text
abcdabc
```

### 输出

```text
Just a legend
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e6 + 10;
int Z[MAXN];

void Z_function (const string &s) {
    int n = s.length ();
    int c = 1;
    int r = 1;
    int len;
    Z[0] = n;

    for (int i = 1; i < n; i ++) {
        len = r > i ? min (r - i, Z[i - c]) : 0;
        while (i + len < n && s[len] == s[len + i]) {
            len ++;
        }
        if (i + len > r) {
            r = i + len;
            c = i;
        }
        Z[i] = len;
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    string s;
    cin >> s;

    int n = s.length();
    int ans = 0;
    int mid_string = 0;
    Z_function (s);
    for (int i = 1; i < n; i ++) {
        int cur = n - i;

        if (Z[i] == cur && mid_string >= cur) {
            ans = max (ans, cur);
        }
        mid_string = max (mid_string, Z[i]);
    }
    if (ans == 0) {
        cout << "Just a legend" << '\n';
    } else {
        cout << s.substr (0, ans) << '\n';
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
  <a href="https://vjudge.net/problem/CodeForces-126B#author=user:552012" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>