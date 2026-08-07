---
title: Deque (2.0)
published: 2026-08-07
category: 算法竞赛
tags: [C++, 区间DP]
---


## 题目描述

太郎和次郎要玩一个游戏，规则如下：

一开始给出一个序列 $a=(a_1,a_2,\ldots,a_N)$。

从太郎开始，两人轮流操作，直到序列 $a$ 变为空。每次操作为：

- 从序列 $a$ 的开头或结尾拿走一个元素，玩家获得该元素对应的分数 $x$，其中 $x$ 是被拿走的数字。

游戏结束时，太郎和次郎获得的总分分别为 $X$ 和 $Y$。

太郎希望让 $X-Y$ 尽可能大，而次郎希望让 $X-Y$ 尽可能小。

假设双方都采取最优策略，求最终的 $X-Y$。

## 约束条件

- 输入中的所有数值均为整数。
- $1 \le N \le 3000$
- $1 \le a_i \le 10^9$

## 输入格式

标准输入包含以下内容：

```text
N
a_1 a_2 ... a_N
```

## 输出格式

输出双方都采取最优策略时，最终得到的 $X-Y$。

## 样例 1

### 输入

```text
4
10 80 90 30
```

### 输出

```text
10
```

双方的最优操作过程如下（拿走的元素使用粗体表示）：

- 太郎：$(10,80,90,\mathbf{30})\rightarrow(10,80,90)$
- 次郎：$(10,80,\mathbf{90})\rightarrow(10,80)$
- 太郎：$(10,\mathbf{80})\rightarrow(10)$
- 次郎：$(\mathbf{10})\rightarrow()$

此时：

$$
X=30+80=110,\qquad Y=90+10=100
$$

因此：

$$
X-Y=10
$$

## 样例 2

### 输入

```text
3
10 100 10
```

### 输出

```text
-80
```

双方的最优操作过程如下：

- 太郎：$(\mathbf{10},100,10)\rightarrow(100,10)$
- 次郎：$(\mathbf{100},10)\rightarrow(10)$
- 太郎：$(\mathbf{10})\rightarrow()$

此时：

$$
X=10+10=20,\qquad Y=100
$$

因此：

$$
X-Y=-80
$$

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 3005;
int a [MAXN];
long long dp[MAXN][MAXN];// 先手在这段区间能获取到的最大值
long long sum[MAXN];

int main ()
{
    int n;
    cin >> n;

    for (int i = 1; i <= n; i ++) {
        for (int j = 1; j <= n; j ++) {
            dp[i][j] = -2e13;
        }
    }
    for (int i = 1; i <= n; i ++) {
        cin >> a[i];
        dp[i][i] = a[i];
        sum[i] = sum[i - 1] + a[i];
    }
    for (int len = 2; len <= n; len ++) {
        for (int i = 1; i <= n - len + 1; i ++) {
            int j = i + len - 1;
            long long opponent_min = min (dp[i][j - 1], dp[i + 1][j]);
            dp[i][j] = sum[j] - sum[i - 1] - opponent_min;
        }
    }
    long long X = dp[1][n];
    long long Y = sum[n] - X;
    cout << X - Y << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-dp_l#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>