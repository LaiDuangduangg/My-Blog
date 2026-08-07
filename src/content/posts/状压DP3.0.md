---
title: Hamiltonian Flights (3.0)
published: 2026-08-07
category: 算法竞赛
tags: [C++, 状压DP]
---

## 题目描述

有 $n$ 个城市，城市之间有 $m$ 条航班连接。

你想从 Syrjälä 前往 Lehmälä，并且每个城市都恰好访问一次。请问共有多少条可能的路线？

## 输入格式

第一行包含两个整数 $n$ 和 $m$，分别表示城市数量和航班数量。

城市的编号为 $1,2,\ldots,n$。城市 $1$ 是 Syrjälä，城市 $n$ 是 Lehmälä。

接下来 $m$ 行描述所有航班。每行包含两个整数 $a$ 和 $b$，表示存在一条从城市 $a$ 飞往城市 $b$ 的单程航班。

## 输出格式

输出一个整数，表示满足条件的路线数量对 $10^9+7$ 取模后的结果。

## 约束条件

- $2\le n\le 20$
- $1\le m\le n^2$
- $1\le a,b\le n$

## 示例

### 输入

```text
4 6
1 2
1 3
2 3
3 2
2 4
3 4
```

### 输出

```text
2
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
const int MOD = 1e9 + 7;
const long long MAXMASK = 1 << 20;
const int MAXN = 22;
long long dp[MAXN][MAXMASK];
vector <int> adj[MAXN];

long long dfs (int cur, long long status) {
    if (cur == n - 1 && status != 0) {
        return 0;
    }
    if (status == 0) {
        return 1;
    }
    if (dp[cur][status] != -1) {
        return dp[cur][status];
    }

    long long ans = 0;
    for (auto v : adj[cur]) {
        if ((status & (1 << v)) == 0) {
            continue;
        }
        long long new_status = status ^ (1 << v);
        ans = (ans + dfs (v, new_status)) % MOD;
    }

    dp[cur][status] = ans;
    return ans;
}

int main ()
{   
    ios::sync_with_stdio (false);
    cin.tie (0);
    
    cin >> n >> m;

    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < (1 << n); j ++) {
            dp[i][j] = -1;
        }
    }
    for (int i = 0; i < m; i ++) {
        int u, v;
        cin >> u >> v;
        u --; v --;
        
        adj[u].push_back (v);
    }
    long long cur_status = (1 << n) - 1;
    cur_status ^= 1;
    long long ans = dfs (0, cur_status);
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
  <a href="https://vjudge.net/problem/CSES-1690#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>