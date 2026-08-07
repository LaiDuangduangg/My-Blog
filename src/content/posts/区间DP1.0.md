---
title: Slimes (1.0)
published: 2026-08-06
category: 算法竞赛
tags: [C++, 区间DP]
---

## 题目描述

有 $N$ 只史莱姆排成一排。起初，从左数第 $i$ 只史莱姆的体型是 $a_i$。

小太郎想把所有史莱姆合成一个更大的史莱姆。他会反复执行以下操作，直到只剩下一只史莱姆为止：

- 选择两个相邻的史莱姆，把它们合成一个新的史莱姆。新史莱姆的体型是 $x+y$，其中 $x$ 和 $y$ 是合并前两个史莱姆的体型。合并时会产生 $x+y$ 的代价。合并过程中史莱姆的位置顺序不会改变。

请计算合并所有史莱姆所需的最小总代价。

## 约束条件

- 输入的所有数值都是整数。
- $2 \le N \le 400$
- $1 \le a_i \le 10^9$

## 输入格式

输入从标准输入读入，格式如下：

```text
N
a_1 a_2 ... a_N
```

## 输出格式

输出合并所有史莱姆所需的最小总代价。

## 样例 1

### 输入

```text
4
10 20 30 40
```

### 输出

```text
190
```

小太郎的操作步骤如下（合并的史莱姆用粗体表示）：

- (**10, 20**, 30, 40) → (30, 30, 40)
- (**30, 30**, 40) → (60, 40)
- (**60, 40**) → (100)

## 样例 2

### 输入

```text
5
10 10 10 10 10
```

### 输出

```text
120
```

小太郎可以这样合并：

- (**10, 10**, 10, 10, 10) → (20, 10, 10, 10)
- (20, **10, 10**, 10) → (20, 20, 10)
- (20, **20, 10**) → (20, 30)
- (**20, 30**) → (50)

## 样例 3

### 输入

```text
3
1000000000 1000000000 1000000000
```

### 输出

```text
5000000000
```

答案可能超出 32 位整数的范围。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 450;
long long dp[MAXN][MAXN];
long long sum[MAXN];
int a[MAXN];

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    for (int i = 1; i <= n; i ++) {
        for (int j = 1; j <= n; j ++) {
            dp[i][j] = 1e18;
        }
    } 
    for (int i = 1; i <= n; i ++) {
        cin >> a[i];
        dp[i][i] = 0;
    }
    for (int i = 1; i <= n; i ++) {
        sum[i] = sum[i - 1] + a[i];
    }
    for (int len = 1; len <= n; len ++) {
        for (int i = 1; i <= n - len + 1; i ++) {
            int j = i + len - 1;
            for (int mid = i; mid <= j - 1; mid ++) {
                dp[i][j] = min (dp[i][j], dp[i][mid] + dp[mid + 1][j] + sum[j] - sum[i - 1]);
            }
        }
    }
    cout << dp[1][n] << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-dp_n#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>