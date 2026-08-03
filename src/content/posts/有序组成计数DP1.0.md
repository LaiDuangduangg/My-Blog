---
title: Redistribution (1.0)
published: 2026-08-03
category: 算法竞赛
tags: [C++, 有序组成计数DP]
---

# Redistribution

## 题目描述

给定一个整数 \(S\)。

求满足以下条件的整数序列数量：

- 序列中的每个整数都大于等于 \(3\)；
- 序列中所有整数之和等于 \(S\)。

答案可能非常大，请输出答案对 \(10^9+7\) 取模后的结果。

## 输入格式

输入一个整数 \(S\)。

```text
S
```

## 输出格式

输出满足条件的序列数量对 \(10^9+7\) 取模后的结果。

## 数据范围

\[
1\le S\le 2000
\]

输入的所有数都是整数。

## 样例 1

### 输入

```text
7
```

### 输出

```text
3
```

### 说明

共有 \(3\) 个序列满足条件：

\[
(3,4)
\]

\[
(4,3)
\]

\[
(7)
\]

## 样例 2

### 输入

```text
2
```

### 输出

```text
0
```

### 说明

不存在满足条件的序列。

## 样例 3

### 输入

```text
1729
```

### 输出

```text
294867501
```


## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

long long dp[3000];
constexpr int MOD = 1e9 + 7;

int main ()
{
    int s;
    cin >> s;

    dp[0] = 1;
    for (int sum = 1; sum <= s; sum ++) {
        for (int pre = 3; pre <= sum; pre ++) {
            dp[sum] = (dp[sum] + dp[sum - pre]) % MOD;
        }
    } 
    cout << dp[s] << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-abc178_d#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>