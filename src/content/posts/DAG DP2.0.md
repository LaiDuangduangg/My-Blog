---
title: Longest Flight Route (2.0)
published: 2026-08-04
category: 算法竞赛
tags: [C++, DAGDP]
---

# 题目描述

Uolevi 赢得了一场比赛，奖品是一次免费的飞行旅行，可以由一次或多次飞行经过城市。当然，Uolevi 想要选择访问尽可能多城市的旅行。

Uolevi 想要从 Syrjälä 飞到 Lehmälä，以便访问尽可能多的城市。给定可能的航班列表，已知飞行网络中没有有向环。

# 输入

第一行输入两个整数 $n$ 和 $m$：城市数量和航班数量。

城市编号为 $1,2,\ldots,n$。城市 $1$ 是 Syrjälä，城市 $n$ 是 Lehmälä。

接下来有 $m$ 行描述航班。每行包含两个整数 $a$ 和 $b$，表示存在一趟从城市 $a$ 到城市 $b$ 的航班。

所有航班均为单程航班。

# 输出

首先输出路线上的最大城市数量，然后按照访问顺序输出这些城市。

如果存在多种有效方案，可以输出任意一种。

如果不存在从城市 $1$ 到城市 $n$ 的路线，输出：

```text
IMPOSSIBLE
```

# 约束条件

- $2 \le n \le 10^5$
- $1 \le m \le 2 \cdot 10^5$
- $1 \le a,b \le n$

# 示例

## 输入

```text
5 5
1 2
2 5
1 3
3 4
4 5
```

## 输出

```text
4
1 3 4 5
```
## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

struct Infoma{
    int dis;
    bool reach;
};

int n, m;
const int MAXN = 1e5 + 10;
vector <int> adj[MAXN];
vector <int> dist (MAXN, -1);
vector <int> later_point (MAXN, -1);

Infoma dfs (int cur) { // 从这个点开始往后走的最长距离, 并且要带上是否经过点n这个状态，如果不带，就不更新该点的dist
    bool rea = false;
    if (cur == n) {
        return {0, 1};
    }
    if (dist[cur] != -1) {
        if (dist[cur] == -100) {
            return {dist[cur], 0};
        }
        return {dist[cur], 1};
    }

    int max_len = -100;
    for (auto nex : adj[cur]) {
        if (max_len < dfs (nex).dis + 1 && dfs (nex).reach == true) {
            max_len = dfs (nex).dis + 1;
            rea = true;
            later_point[cur] = nex;
        }
    }

    dist[cur] = max_len;
    return {dist[cur], rea};
}

int main ()
{
    cin >> n >> m;

    for (int i = 0; i < m; i ++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back (v);
    }
    Infoma ans = dfs (1);
    if (ans.reach == false) {
        cout << "IMPOSSIBLE" << '\n';
        return 0;
    }
    else {
        cout << ans.dis + 1 << '\n';
        int cur_point = 1;
        cout << cur_point << " ";
        while (later_point[cur_point] != -1) {
            cout << later_point[cur_point] << " ";
            cur_point = later_point[cur_point];
        }
    }
    return 0;
}
```

## DP递推做法:
如果定义dfs(u)为：从 u 出发、最终到达 n 的最长路径,这个定义必须不断向后询问“能不能到达 n”，所以需要额外维护 reach。
但是如果定义:dp[v]：从起点 1 到达 v 的最长路径包含多少个城市,这样我们就可以从点1进行递推,然后不是1的分支,就不更新，如果最后dp[n]能更新
就说明他能有最大值.

### 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> adj(n + 1);
    vector<int> indegree(n + 1);

    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        indegree[v]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) q.push(i);
    }

    const int NEG = -1e9;
    vector<int> dp(n + 1, NEG);
    vector<int> pre(n + 1, -1);

    dp[1] = 1;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dp[u] != NEG && dp[u] + 1 > dp[v]) {
                dp[v] = dp[u] + 1;
                pre[v] = u;
            }

            if (--indegree[v] == 0) q.push(v);
        }
    }

    if (dp[n] == NEG) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }

    vector<int> path;
    for (int cur = n; cur != -1; cur = pre[cur]) {
        path.push_back(cur);
    }

    reverse(path.begin(), path.end());

    cout << path.size() << '\n';
    for (int x : path) cout << x << ' ';
    cout << '\n';
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
  <a href="https://vjudge.net/problem/CSES-1680#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>
