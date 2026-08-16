---
title: Coins (1.0)
published: 2026-08-16
category: 算法竞赛
tags: [C++, 概率DP]
---

## 题目描述

设 $N$ 是一个正奇数。

有 $N$ 枚硬币，编号为 $1, 2, \ldots, N$。对于每一枚硬币 $i$（$1 \le i \le N$），当掷出编号为 $i$ 的硬币时，正面朝上的概率是 $p_i$，反面朝上的概率是 $1-p_i$。

太郎已经掷完了所有 $N$ 枚硬币。请你求出正面朝上的硬币数量多于反面朝上的概率。

## 约束条件

- $N$ 是奇数。
- $1 \le N \le 2999$
- $p_i$ 是一个保留两位小数的实数。
- $0 < p_i < 1$

## 输入格式

输入从标准输入读取，格式如下：

```text
N
p_1 p_2 ... p_N
```

## 输出格式

输出正面朝上的硬币数量多于反面的概率。当绝对误差不超过 $10^{-9}$ 时，输出被视为正确。

## 样例 1

### 输入

```text
3
0.30 0.60 0.80
```

### 输出

```text
0.612
```

正面数量多于反面的每种情况的概率如下：

- 正面为 $(Coin1, Coin2, Coin3) = (Head, Head, Head)$ 的概率是 $0.3 \times 0.6 \times 0.8 = 0.144$；
- 正面为 $(Coin1, Coin2, Coin3) = (Tail, Head, Head)$ 的概率是 $0.7 \times 0.6 \times 0.8 = 0.336$；
- 正面为 $(Coin1, Coin2, Coin3) = (Head, Tail, Head)$ 的概率是 $0.3 \times 0.4 \times 0.8 = 0.096$；
- 正面为 $(Coin1, Coin2, Coin3) = (Head, Head, Tail)$ 的概率是 $0.3 \times 0.6 \times 0.2 = 0.036$。

因此，正面多于反面的概率是：

$$
0.144 + 0.336 + 0.096 + 0.036 = 0.612
$$

## 样例 2

### 输入

```text
1
0.50
```

### 输出

```text
0.5
```

像 `0.500`、`0.500000001` 和 `0.499999999` 这样的输出也被认为是正确的。

## 样例 3

### 输入

```text
5
0.42 0.01 0.42 0.99 0.42
```

### 输出

```text
0.3821815872
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 3000;
double p[MAXN];
double dp[MAXN][MAXN];

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    for (int i = 1; i <= n; i ++) {
        cin >> p[i];
    }
    dp[0][0] = 1.0;
    for (int i = 1; i <= n; i ++) {
        for (int j = 0; j <= i; j ++) {
            // 第j个为正面
            if (i - 1 >= 0 && j - 1 >= 0) dp[i][j] += dp[i - 1][j - 1] * p[i];
            // 第j个为反面
            if (i - 1 >= 0) dp[i][j] += dp[i - 1][j] * (1.0 - p[i]);
        }
    }
    
    double ans = 0.0;
    for (int i = n / 2 + 1; i <= n; i ++) {
        ans += dp[n][i];
    }
    cout << fixed << setprecision (11) << ans << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-dp_i#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>
