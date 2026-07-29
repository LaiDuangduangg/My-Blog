---
title: 售货员的难题(1.0)
published: 2026-07-29
category: 算法竞赛
tags: [C++, 状压DP]
---

## Background

数据有更改

## Description

某乡有 $n$ 个村庄，有一个售货员，他要到各个村庄去售货。各村庄之间的路程 $s_{i,j}$ 是已知的，且 $A$ 村到 $B$ 村与 $B$ 村到 $A$ 村的路大多不同。为了提高效率，他从商店出发到每个村庄一次，然后返回商店所在的村，假设商店所在的村庄为 $1$，他不知道选择什么样的路线才能使所走的路程最短。请你帮他选择一条最短的路。

## Input

第一行是一个整数，表示村庄数 $n$。

接下来 $n$ 行，每行 $n$ 个整数，第 $i$ 行的第 $j$ 个整数表示 $i$ 到 $j$ 的单向路径的距离 $s_{i,j}$。

## Output

一行一个整数表示最短的路程。

## Sample 1

### Input

```text
3
0 2 1
1 0 2
2 1 0
```

### Output

```text
3
```

## Hint

对全部的测试数据，保证 $2 \le n \le 20$，$1 \le s_{i,j} < 10^3$。


## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
int dist[20][20];
vector <vector <int>> dp;

long long get_min_dist (int cur, long long status) {// 从cur往后走，并且持有状态为status走到1，的总距离最小是多少
    if (status == 0) {
        return dist[cur][0];
    }
    if (dp[cur][status] != -1) {
        return dp[cur][status];
    }

    long long ans = 2e18;
    for (int nex = 1; nex < n; nex ++) {
        if ((status & (1 << nex)) == 0) {
            continue;
        }
        long long new_status = status ^ (1 << nex);
        ans = min (ans, get_min_dist (nex, new_status) + dist[cur][nex]);
    }

    dp[cur][status] = ans;
    return ans;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);
    cout.tie (0);

    cin >> n;
    dp.assign(n, vector <int> (1 << n, -1));
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < n; j ++) {
            cin >> dist[i][j];
        }
    }
    
    int status = ((1 << n) - 1) ^ 1LL;
    // 从1开始， 当前仍可以选择的村庄, 走了多少个村庄, dp缓存值
    int ans = get_min_dist (0, status);
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P1171" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>