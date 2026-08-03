---
title: Between Two Arrays (3.0)
published: 2026-08-03
category: 算法竞赛
tags: [C++, 计数DP]
---

以下是可直接复制的 Markdown 源码：

````markdown
# 问题陈述

一个数字序列 $s$ 被称为**非递减序列**，当且仅当对于每个 $i$（$1 \le i \le n-1$），都有：

$$
s_i \le s_{i+1}
$$

给定两个非递减整数序列：

$$
A=(a_1,a_2,\ldots,a_N)
$$

和

$$
B=(b_1,b_2,\ldots,b_N)
$$

考虑满足以下条件的非递减整数序列：

$$
C=(c_1,c_2,\ldots,c_N)
$$

- 对于每个 $i$（$1 \le i \le N$），都有 $a_i \le c_i \le b_i$。

求满足条件的序列 $C$ 的数量，并对 $998244353$ 取模。

# 约束条件

- $1 \le N \le 3000$
- $0 \le a_i \le b_i \le 3000$（$1 \le i \le N$）
- 序列 $A$ 和 $B$ 均为非递减序列。
- 输入中的所有值均为整数。

# 输入

输入按照以下格式从标准输入给出：

```text
N
a_1 a_2 ... a_N
b_1 b_2 ... b_N
```

# 输出

输出满足条件的序列 $C$ 的数量，并对 $998244353$ 取模。

# 示例 1

## 输入

```text
2
1 1
2 3
```

## 输出

```text
5
```

可行的序列 $C$ 共有五个：

- $(1,1)$
- $(1,2)$
- $(1,3)$
- $(2,2)$
- $(2,3)$

注意，$(2,1)$ 不满足条件，因为它不是非递减序列。

# 示例 2

## 输入

```text
3
2 2 2
2 2 2
```

## 输出

```text
1
```

可行的序列 $C$ 只有一个：

- $(2,2,2)$

# 示例 3

## 输入

```text
10
1 2 3 4 5 6 7 8 9 10
1 4 9 16 25 36 49 64 81 100
```

## 输出

```text
978222082
```

请确保计算结果对 $998244353$ 取模。
````


```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int MOD = 998244353;
constexpr int MAXN = 3005;
long long dp[MAXN][MAXN]; // 到第pos个位置，并且当前位置天j的方案数量
long long pre[MAXN][MAXN]; // 第pos个位置，并且pos填的值小于等于j的方案总数

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    vector <int> a (n);
    vector <int> b (n);
    for (int i = 0; i < n; i ++)  cin >> a[i];
    for (int i = 0; i < n; i ++)  cin >> b[i];
    for (int pos = 0; pos < n; pos ++) {
        long long sum = 0;
        for (int j = 0; j <= 3000; j ++) {
            if (j >= a[pos] && j <= b[pos]) {
                if (pos - 1 >= 0) {
                    dp[pos][j] = (dp[pos][j] + pre[pos - 1][j]) % MOD;
                }
                else if (pos == 0) {
                    dp[pos][j] = 1;
                }
            }
            sum = (sum + dp[pos][j]) % MOD;
            pre[pos][j] = sum;
        }
    }
    cout << pre[n - 1][b[n - 1]] << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-abc222_d#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>