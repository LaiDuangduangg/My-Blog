---
title: Game Routes (3.0)
published: 2026-08-05
category: 算法竞赛
tags: [C++, DAGDP]
---

# Game Routes

一个游戏有 $n$ 个关卡，由 $m$ 个传送点连接。你的任务是从关卡 $1$ 到达关卡 $n$。

游戏被设计成底层图中没有有向环。你完成游戏的方式有多少种？

## 输入

第一行输入两个整数 $n$ 和 $m$：关卡数和传送点数。关卡编号为 $1,2,\ldots,n$。

接下来有 $m$ 行描述传送点。每行包含两个整数 $a$ 和 $b$，表示从关卡 $a$ 到关卡 $b$ 有一个传送点。

## 输出

输出一个整数：完成游戏的方式数。

由于结果可能很大，请将答案对 $10^9+7$ 取模。

## 约束

- $1 \le n \le 10^5$
- $1 \le m \le 2 \cdot 10^5$
- $1 \le a,b \le n$

## 示例

### 输入

```text
4 5
1 2
2 4
1 3
3 4
1 4
```

### 输出

```text
3
```


```cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;
const int MAXN = 1e5 + 10;
vector <long long> adj[MAXN];
vector<long long> indegree(MAXN);
vector<long long> dp(MAXN);
// 到这个点i的通关方案
// 依赖关系是,某个点要更新dp，只需要更新他所有点前驱即可

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; i ++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back (v);
        indegree[v] ++;
    }
    queue <int> que;
    dp[1] = 1;
    for (int i = 1; i <= n; i ++) {
        if (indegree[i] == 0) {
            que.push (i);
        }
    }
    
    while (!que.empty ()) {
        int cur = que.front ();
        que.pop ();

        for (auto nex : adj[cur]) {
            indegree[nex] --;
            if ((indegree[nex]) == 0) {
                que.push (nex);
            }
                
            dp[nex] = (dp[nex] + dp[cur]) % MOD;
        } 
    }
    cout << dp[n] << '\n';
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
  <a href="https://vjudge.net/problem/CSES-1681#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>