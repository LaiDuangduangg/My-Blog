---
title: 被3整除的子序列 (2.0)
published: 2026-08-03
category: 算法竞赛
tags: [C++, 子序列计数DP]
---

# 被 3 整除的子序列

## 题目描述

给你一个长度为 \(50\) 的数字串，问有多少个子序列构成的数字可以被 \(3\) 整除。

答案对 \(10^9+7\) 取模。

## 输入格式

输入一个由数字构成的字符串，长度小于等于 \(50\)。

## 输出格式

输出一个整数。

## 样例 1

### 输入

```text
132
```

### 输出

```text
3
```

## 样例 2

### 输入

```text
9
```

### 输出

```text
1
```

## 样例 3

### 输入

```text
333
```

### 输出

```text
7
```

## 样例 4

### 输入

```text
123456
```

### 输出

```text
23
```

## 样例 5

### 输入

```text
00
```

### 输出

```text
3
```

## 备注

\(n\) 为字符串长度。

- 子任务 1：\(n\le 5\)
- 子任务 2：\(n\le 20\)
- 子任务 3：无限制

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int MOD = 1e9 + 7;

// 要考虑能不能接在后面形成一种新的方案
// 状态要包括，前面每种余数的方案数量是多少
// 可以考虑定义dp[i]表示以该点为结尾，余数为i的方案数
// 但是实际上，如果只有一维，那三种模数之间会相互依赖，因此要新开一个维度，记录数据的历史新旧,新数据只能由前一个点的老数据转移过来
long long dp[50][3];

int main ()
{
    string s;
    cin >> s;

    int n = s.length ();
    for (int i = 0; i < n; i ++) {
        int digit = s[i] - '0';
        int mod = digit % 3;

        dp[i][mod] = 1;
        if (i - 1 >= 0) {
            for (int j = 0; j <= i - 1; j ++) {
                dp[i][(0 + mod) % 3] = (dp[i][(0 + mod) % 3] + dp[j][0]) % MOD;
                dp[i][(1 + mod) % 3] = (dp[i][(1 + mod) % 3] + dp[j][1]) % MOD;
                dp[i][(2 + mod) % 3] = (dp[i][(2 + mod) % 3] + dp[j][2]) % MOD; 
            }   
        }
    }
    long long ans = 0;
    for (int i = 0; i < n; i ++) {
        ans = (ans + dp[i][0]) % MOD;
    }
    cout << ans << '\n';
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
  <a href="https://vjudge.net/problem/%E7%89%9B%E5%AE%A2-21302" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>