---
title: Matching (2.0)
published: 2026-08-07
category: 算法竞赛
tags: [C++, 状压DP]
---

## 题目描述

有 $N$ 位男士和 $N$ 位女士，他们的编号均为 $1,2,\ldots,N$。

对于每一对 $i,j\ (1\le i,j\le N)$，使用整数 $a_{i,j}$ 表示男士 $i$ 和女士 $j$ 是否匹配：

- 如果 $a_{i,j}=1$，则男士 $i$ 和女士 $j$ 匹配；
- 如果 $a_{i,j}=0$，则他们不匹配。

太郎希望组成 $N$ 对配对，每对由一位男士和一位与其匹配的女士组成。每位男士和每位女士都必须且只能属于一个配对。

请计算太郎组成 $N$ 对配对的方案数，结果对 $10^9+7$ 取模。

## 约束条件

- 输入中的所有数值均为整数。
- $1\le N\le 21$
- $a_{i,j}$ 为 $0$ 或 $1$。

## 输入格式

标准输入包含以下内容：

```text
N
a_{1,1} ... a_{1,N}
...
a_{N,1} ... a_{N,N}
```

## 输出格式

输出太郎组成 $N$ 对配对的方案数，对 $10^9+7$ 取模后的结果。

## 样例 1

### 输入

```text
3
0 1 1
1 0 1
1 1 1
```

### 输出

```text
3
```

共有三种配对方案，其中 $(i,j)$ 表示男士 $i$ 和女士 $j$ 组成一对：

- $(1,2),(2,1),(3,3)$
- $(1,2),(2,3),(3,1)$
- $(1,3),(2,1),(3,2)$

## 样例 2

### 输入

```text
4
0 1 0 0
0 0 0 1
1 0 0 0
0 0 1 0
```

### 输出

```text
1
```

只有一种配对方案：

- $(1,2),(2,4),(3,1),(4,3)$

## 样例 3

### 输入

```text
1
0
```

### 输出

```text
0
```

## 样例 4

### 输入

```text
21
0 0 0 0 0 0 0 1 1 0 1 1 1 1 0 0 0 1 0 0 1
1 1 1 0 0 1 0 0 0 1 0 0 0 0 1 1 1 0 1 1 0
0 0 1 1 1 1 0 1 1 0 0 1 0 0 1 1 0 0 0 1 1
0 1 1 0 1 1 0 1 0 1 0 0 1 0 0 0 0 0 1 1 0
1 1 0 0 1 0 1 0 0 1 1 1 1 0 0 0 0 0 0 0 0
0 1 1 0 1 1 1 0 1 1 1 0 0 0 1 1 1 1 0 0 1
0 1 0 0 0 1 0 1 0 0 0 1 1 1 0 0 1 1 0 1 0
0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 1 1 1 1 1 1
0 0 1 0 0 1 0 0 1 0 1 1 0 0 1 0 1 0 1 1 1
0 0 0 0 1 1 0 0 1 1 1 0 0 0 0 1 1 0 0 0 1
0 1 1 0 1 1 0 0 1 1 0 0 0 1 1 1 1 0 1 1 0
0 0 1 0 0 1 1 1 1 0 1 1 0 1 1 1 0 0 0 0 1
0 1 1 0 0 1 1 1 1 0 0 0 1 0 1 1 0 1 0 1 1
1 1 1 1 1 0 0 0 0 1 0 0 1 1 0 1 1 1 0 0 1
0 0 0 1 1 0 1 1 1 1 0 0 0 0 0 0 1 1 1 1 1
1 0 1 1 0 1 0 1 0 0 1 0 0 1 1 0 1 0 1 1 0
0 0 1 1 0 0 1 1 0 0 1 1 0 0 1 1 1 1 0 0 1
0 0 0 1 0 0 1 1 0 1 0 1 0 1 1 0 0 1 1 0 1
0 0 0 0 1 1 1 0 1 0 1 1 1 0 1 1 0 0 1 1 0
1 1 0 1 1 0 0 1 1 0 1 1 0 1 1 1 1 1 0 1 0
1 0 0 1 1 0 1 1 1 1 1 0 1 0 1 1 0 0 0 0 0
```

### 输出

```text
102515160
```

请记得将答案对 $10^9+7$ 取模。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
const long long MAXMASK = 1 << 21;
const int MOD = 1e9 + 7;
const int MAXN = 25;
bool a[MAXN][MAXN];
long long dp[22][MAXMASK]; // 男性, 与女性匹配状态为mask的时候,方案数量是多少

long long dfs (int man_num ,long long cur_mask) {// 返回从第man_num个男人开始往后挑选,所有的方案数
    if (cur_mask == 0) {
        return 1;
    }
    if (dp[man_num][cur_mask] != -1) {
        return dp[man_num][cur_mask];
    }

    long long ans = 0;
    for (int nex_woman = 0; nex_woman < n; nex_woman ++) {
        if ((cur_mask & (1 << nex_woman)) == 0) {
            continue;
        }
        if (a[man_num][nex_woman] == 0) {
            continue;
        }
        long long new_status = cur_mask ^ (1 << nex_woman);
        ans = (ans + dfs (man_num + 1, new_status)) % MOD;
    }
    dp[man_num][cur_mask] = ans;
    return ans;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    cin >> n;

    for (int i = 0; i < 22; i ++) {
        for (int j = 0; j < MAXMASK; j ++) {
            dp[i][j] = -1;
        }
    }
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < n; j ++) {
            cin >> a[i][j];
        }
    }
    long long origin_mask = (1 << n) - 1;
    long long ans = dfs (0 ,origin_mask);
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
  <a href="https://vjudge.net/problem/AtCoder-dp_o#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>