---
title: Fish (2.0)
published: 2026-08-16
category: 算法竞赛
tags: [C++, 概率DP]
---

## 题目描述:

有 $n$ 条鱼，编号从 $1$ 到 $n$，生活在一个湖里。每天都会有一对鱼相遇，每对鱼相遇的概率相同。

如果编号为 $i$ 和 $j$ 的两条鱼相遇，鱼 $i$ 吃掉鱼 $j$ 的概率是 $a_{ij}$，而鱼 $j$ 吃掉鱼 $i$ 的概率是：

$$
a_{ji} = 1 - a_{ij}
$$

这个过程一直持续，直到湖里只剩下一条鱼。请你计算每条鱼成为最后幸存者的概率。

## 输入

第一行包含一个整数 $n$（$1 \le n \le 18$），表示湖中鱼的数量。

接下来有 $n$ 行，每行包含 $n$ 个实数，组成矩阵 $a$。其中，$a_{ij}$（$0 \le a_{ij} \le 1$）表示编号为 $i$ 的鱼吃掉编号为 $j$ 的鱼的概率。

保证主对角线上的元素全为零，且其他元素满足：

$$
a_{ij} = 1 - a_{ji}
$$

所有实数最多保留六位小数。

## 输出

输出 $n$ 个用空格分隔的实数，精确到至少六位小数。

第 $i$ 个数字表示编号为 $i$ 的鱼成为最后幸存者的概率。

## 样例 1

### 输入

```text
2
0 0.5
0.5 0
```

### 输出

```text
0.500000 0.500000
```

## 样例 2

### 输入

```text
5
0 1 1 1 1
0 0 0.5 0.5 0.5
0 0.5 0 0.5 0.5
0 0.5 0.5 0 0.5
0 0.5 0.5 0.5 0
```

### 输出

```text
1.000000 0.000000 0.000000 0.000000 0.000000
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXMASK = 1 << 18;
const int MAXN = 20;
double a[MAXN][MAXN];
double dp[MAXMASK];

int cnt_fish (long long mask) {
    int ans = 0;
    for (int i = 0; i <= 30; i ++) {
        if (mask & (1LL << i)) {
            ans ++;
        }
    }
    return ans;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    long long mask = (1 << n) - 1;
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < n; j ++) {
            cin >> a[i][j];
        }
    }
    dp[mask] = 1.0;
    for (int ms = mask; ms >= 0; ms --) {
        long long fish_num = cnt_fish (ms);
        if (fish_num <= 1 || dp[ms] == 0) {
            continue;
        }
        for (int i = 0; i < n; i ++) {
            if ((ms & (1LL << i)) == 0) {
                continue;
            }
            for (int j = i + 1; j < n; j ++) {
                if ((ms & (1LL << j)) == 0) {
                    continue;
                }
                long long new_mask1 = ms ^ (1LL << i); // i被eat
                long long new_mask2 = ms ^ (1LL << j); // j被eat
                double meet = 1.0 / (fish_num * (fish_num - 1) / 2.0);
                dp[new_mask1] += dp[ms] * meet * a[j][i];
                dp[new_mask2] += dp[ms] * meet * a[i][j];
            }
        }
    }
    for (int i = 0; i < n; i ++) {
        cout << fixed << setprecision (7) << dp[1 << i] << " ";
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
  <a href="https://vjudge.net/problem/CodeForces-16E#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>

