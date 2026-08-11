---
title: Prefixes and Suffixes (2.0)
published: 2026-08-10
category: 算法竞赛
tags: [C++, Z函数]
---

## 题目描述:
给你一个字符串 $s=s_1s_2\ldots s_{|s|}$，其中 $|s|$ 是字符串 $s$ 的长度，$s_i$ 是它的第 $i$ 个字符。

先来几个定义：

- 字符串 $s$ 的子串 $s[i..j]$（$1\le i\le j\le |s|$）就是字符串 $s_is_{i+1}\ldots s_j$。
- 字符串 $s$ 长度为 $l$ 的前缀（$1\le l\le |s|$）是字符串 $s[1..l]$。
- 字符串 $s$ 长度为 $l$ 的后缀（$1\le l\le |s|$）是字符串 $s[|s|-l+1..|s|]$。

你的任务是：找出所有既是字符串 $s$ 的前缀又是字符串 $s$ 的后缀的部分，统计它们在字符串 $s$ 中作为子串出现的次数，并打印出来。

## 输入格式

输入只有一行，包含一个由大写英文字母组成的字符串 $s_1s_2\ldots s_{|s|}$（$1\le |s|\le 10^5$）——也就是字符串 $s$。

## 输出格式

第一行输出一个整数 $k$（$0\le k\le |s|$）——表示有多少个前缀同时匹配后缀。

接下来输出 $k$ 行，每行两个整数 $l_i\ c_i$。这两个数字分别代表长度为 $l_i$ 的前缀和长度为 $l_i$ 的后缀相同，并且这个前缀在字符串 $s$ 中作为子串出现了 $c_i$ 次。

请按 $l_i$ 从小到大的顺序输出这些对。

## 样例

### 输入

```text
ABACABA
```

### 输出

```text
3
1 4
3 2
7 1
```

### 输入

```text
AAA
```

### 输出

```text
3
1 3
2 2
3 1
```


## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 10;
int z[MAXN];
long long sum[MAXN];
bool vis[MAXN];

void Z_function (const string &s) {
    int n = s.length();
    int len;
    int r = 0;
    int c = 0;
    z[0] = n;

    for (int i = 1; i < n; i ++) {
        len = r > i ? min (r - i, z[i - c]) : 0;
        while (i + len < n && s[len] == s[i + len]) {
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
    
    int n = s.length();
    Z_function (s);
    int cnt = 0;
    for (int i = 0; i < s.length(); i ++) {
        int cur_len = n - i;
        if (z[i] == cur_len) {
            vis[cur_len] = true;
            cnt ++;
        }
    }
    cout << cnt << '\n';
    for (int i = 0; i < n; i ++) {
        if (z[i] > 0) {
            sum[1] ++;
            sum[z[i] + 1] --;
        }
    }
    for (int i = 1; i <= n; i ++) {
        sum[i] += sum[i - 1];
    }
    for (int i = 1; i <= n; i ++) {
        if (vis[i]) {
            cout << i << " " << sum[i] << '\n';
        }
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
  <a href="https://vjudge.net/problem/CodeForces-432D#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>