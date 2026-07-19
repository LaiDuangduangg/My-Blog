---
title: Range Flip(2.0)
published: 2026-07-19
category: 算法竞赛
tags: [C++, 分段DP]
---

# 题目描述

有 $N$ 张牌排成一排，牌的编号是 $1,2,\ldots,N$。

第 $i$ 张牌正面写着一个整数 $A_i$，背面写着一个整数 $B_i$。一开始，所有牌都是正面朝上。

你最多可以执行以下操作 $K$ 次：

- 选择满足 $1 \le l \le r \le N$ 的整数 $l$ 和 $r$，将区间内的每张牌 $i$（满足 $l \le i \le r$）翻面。翻面就是把之前朝下的那一面翻到朝上。

操作结束后，求所有正面朝上的牌上数字之和的最大可能值。

## 约束条件

- $1 \le N \le 2 \times 10^5$
- $1 \le K \le 10$
- $1 \le A_i, B_i \le 10^9$
- 所有输入均为整数。

## 输入格式

输入从标准输入中读取，格式如下：

```text
N K
A_1 B_1
A_2 B_2
.....
A_N B_N
```

## 输出格式

输出一个整数，表示操作结束后所有正面朝上的牌上数字之和的最大可能值。

## 样例 1

### 输入

```text
7 2
2 1
6 9
3 5
9 2
4 8
7 4
5 6
```

### 输出

```text
45
```

如果第一次操作选择 $l=2,r=5$，第二次操作选择 $l=4,r=4$，那么牌面朝上的数字依次变为：

```text
2, 9, 5, 9, 8, 7, 5
```

它们的和是 $45$。

## 样例 2

### 输入

```text
5 6
9 6
3 2
8 1
7 5
8 4
```

### 输出

```text
35
```

也可以选择不进行任何操作。

## 样例 3

### 输入

```text
9 1
2 7
9 4
1 1
6 1
3 4
8 9
1 2
7 5
3 9
```

### 输出

```text
47
```


## 题解思路

一张牌最终朝向哪一面，只取决于它被翻转次数的奇偶性：

- 翻转偶数次，仍然是正面；
- 翻转奇数次，最终是背面。

假设我一开始选择一个大区间翻转,然后再选择大区间内部的一个小区间翻转,那最后就会变成两段翻转区间。
这样和我分开翻转是一样的,因此无论如何翻转,翻转几下就对应几个不连续区间

由于最多操作 `K` 次，所以问题等价于：

> 选择最多 `K` 个不相交连续区间，使这些区间中的牌翻到背面，其他牌保持正面，最大化总和。

---

## 状态设计

从左到右处理每张牌，定义：

```text
dp[i][j][state]
```

1. 首先为什么要这么定义,由于是线性推导的，后面每个点翻转或者不翻转，首先我得之前前一个点翻转没翻转，因此翻转与否要作为一个维度记录下来。
2. 那后面要翻转多少次，肯定也不是自由的，它受到k的限制，所以目前翻转多少段也是需要记录下来。因此翻转段数要作为另一个维度记录下来。
3. 目前走到哪个`pos `也要记录下来。

`pos` 是 `DP`的“阶段”；
`j `和`state` 是描述当前状态的“信息”。
处理第 i 个位置时，我们只能根据前 i-1 个位置的结果来决定当前怎么做，所以要有`dp[pos][......][.....]`,表示考虑到第pos个位置的时候的最优解是多少。
所以`pos`这个维度是要在`for`循环的最外层,并且由第pos层转移到第pos + 1 层

4. 为什么需要 j？
当我们处理到前 pos 个位置时，后面还能不能继续选择，取决于前面已经用了多少个区间。
同样处理到第pos个位置，但是由于剩余的区间不同，能翻转的次数也不同。


表示：

> 考虑前 `i` 张牌，恰好使用 `j` 个翻转区间，并且第 `i` 张牌处于 `state` 状态时的最大总和。

其中：

```text
state=0：第 i 张牌没有翻转
state=1：第 i 张牌翻转了
```

三个维度分别用于记录：

- `i`：当前处理进度；
- `j`：已经使用的区间数量；
- `state`：当前是否处在一个翻转区间中。

必须记录 `state`，因为它决定下一个翻转位置是在继续原区间，还是需要新开一个区间。

---

## 状态转移

### 当前牌不翻转

当前贡献 `A_i`。

前一张牌可以不翻转，也可以翻转并在 `i-1` 结束区间：

```text
dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j][1]) + A_i
```

### 当前牌翻转

当前贡献 `B_i`。

有两种情况：

1. 前一张牌也翻转：继续原区间，区间数不变；
2. 前一张牌没有翻转：从当前位置新开区间，区间数增加一。

因此：

```text
dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j-1][0]) + B_i
```
只有从“不翻转”进入“翻转”时，才会新开一个区间。

---

## 初始化与答案

没有处理任何牌时：

```text
dp[0][0][0] = 0
```

其他状态均不合法，初始化为负无穷。

题目要求最多使用 `K` 个区间，所以最终答案为：

```text
max(dp[N][j][state])
```

其中：

```text
0 <= j <= K
state ∈ {0,1}
```

---

## 代码如下:

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int MAXK = 11;
constexpr int MAXN = 2e5 + 10;
long long dp[MAXN][MAXK][2]; // 到第pos个位置，并且当前状态为state，并且仅有j个区间需要翻转

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);
    cout.tie (0);

    int n, k;
    cin >> n >> k;

    vector <int> a (n + 1);
    vector <int> b (n + 1);
    memset (dp, -0x3f3f3f3f, sizeof (dp));
    dp[0][0][0] = 0;

    
    for (int i = 1; i <= n; i ++)  cin >> a[i] >> b[i];
    for (int pos = 1; pos <= n; pos ++) { // 到第pos个位置
        for (int j = 0; j <= k; j ++) { // 并且考虑翻转j个区间
            // 当前这个点不翻转
            dp[pos][j][0] = max (dp[pos - 1][j][0], dp[pos - 1][j][1]) + a[pos];
            // 当前这个点翻转
            if (j > 0) 
            dp[pos][j][1] = max (dp[pos - 1][j - 1][0], dp[pos - 1][j][1]) + b[pos];
        }
    }
    long long ans = 0;
    for (int i = 0; i <= k; i ++) {
        for (int j = 0; j < 2; j ++) {
            ans = max (ans, dp[n][i][j]);
        }
    }
    cout << ans << '\n';
    return 0;
}
```

---

## 复杂度

状态数量为 `O(NK)`，每个状态进行常数次转移：

```text
时间复杂度：O(NK)
空间复杂度：O(NK)
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
  <a href="https://vjudge.net/problem/AtCoder-abc466_e#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>