---
title: MC0571 母终诺赴义(1.0)
published: 2026-08-03
category: 算法竞赛
tags: [C++, 放置计数DP]
---

## 题目描述

后来聂政母亲去世，他料理丧事已毕，自觉再无牵挂，便主动去见严仲子，说愿以一死报知遇之恩。此回他当面应诺，事即定下，不再反复。

严仲子见他心意已决，便把行事的“落脚点”一一排开，写成一张 \(2\) 行 \(n\) 列的表格：起初全是白格。如今既要赴义，便可在表中挑若干格作记号染成黑色（也可以不选），只是聂政行事要干净利落，落点之间必须隔开，免得牵连暴露——要求任意两格黑色记号之间的曼哈顿距离都不小于 \(d\)。

问满足这条规矩的染黑方案一共有多少种？答案可能很大，只需对 \(10^9+7\) 取模。

曼哈顿距离：若两个格子分别是第 \(x_1\) 行第 \(y_1\) 列和第 \(x_2\) 行第 \(y_2\) 列，那么这两个格子的曼哈顿距离为

\[
|x_1-x_2|+|y_1-y_2|。
\]

## 输入格式

一行两个整数 \(n,d\)（\(1\le n\le 10^6,\ 1\le d\le n\)）。

## 输出格式

一行一个整数，表示答案对 \(10^9+7\) 取模的结果。

## 样例 1

### 输入

```text
2 2
```

### 输出

```text
7
```

## 样例 2

### 输入

```text
100 3
```

### 输出

```text
713413448
```

## 备注

对于样例 1，选择 \(0\) 个格子的方案数是 \(1\)，选择 \(1\) 个格子的方案数是 \(4\)，选择 \(2\) 个格子的方案数是 \(2\)（两个对角线）。最多只能选择 \(2\) 个格子，故答案为 \(7\)。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int MOD = 1e9 + 7;
constexpr int MAXN = 1e6 + 5;
long long dp[MAXN][2]; // 最后一个黑色块放到i列的上 / 下面的方案数量
long long pre[MAXN][2]; // 对于方案数的前缀和

long long qpow (long long a, long long b) {
    long long res = 1;
    while (b) {
        if (b & 1) {
            res = (res * a) % MOD;
        }
        a = a * a % MOD;
        b = b >> 1;
    }
    return res;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n, d;
    cin >> n >> d;

    if (d == 1) {
        long long ans = qpow (4, n);
        cout << ans << '\n';
        return 0;
    }

    for (int i = 0; i < n; i ++) {
        for (int row = 0; row < 2; row ++) {
            dp[i][row] = 1; // 前面什么都不要接，自己作为全局第一个黑色块

            if (i - d >= 0) {
                dp[i][row] =  (dp[i][row] + pre[i - d][row]) % MOD; // += 最后一个块在i - d处的方案数
            }
            if (i - d + 1 >= 0) {
                dp[i][row] = (dp[i][row] + pre[i - d + 1][1 - row]) % MOD; // += 最后一块在i - d + 1处的方案数
            }

            pre[i][row] = dp[i][row]; // 先继承该点的情况
            if (i > 0) {// 再继承前点的情况
                pre[i][row] = (pre[i][row] + pre[i - 1][row]) % MOD; 
            }
        }
    }
    long long ans = (pre[n - 1][0] + pre[n - 1][1]) % MOD;
    ans ++;
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
  <a href="https://www.matiji.net/exam/brushquestion/58/4777/C98C14523F069FECB0DEED64F00CEAB0" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>