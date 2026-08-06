---
title: Tree Distances I (1.0)
published: 2026-08-06
category: 算法竞赛
tags: [C++, 换根DP]
---

给定一棵包含 $n$ 个节点的树。

你的任务是确定每个节点到另一个节点的最大距离。

## 输入

第一行输入一个整数 $n$：节点的数量。节点编号为 $1, 2, \ldots, n$。

接下来有 $n-1$ 行描述树的边。每行包含两个整数 $a$ 和 $b$，表示节点 $a$ 和节点 $b$ 之间有一条边。

## 输出

输出 $n$ 个整数：对于每个节点 $1, 2, \ldots, n$，输出它到另一个节点的最大距离。

## 约束

- $1 \le n \le 2 \cdot 10^5$
- $1 \le a,b \le n$

## 示例

### 输入

```text
5
1 2
1 3
3 4
3 5
```

### 输出

```text
2 3 2 3 3
```

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 2e5 + 10;
vector <int> adj[MAXN];
vector <int> down_max; // 从i往下走的最长距离
vector <int> up_max; // 从i往父亲方向走的最长距离
vector <int> long1; // 最大子儿子
vector <int> long2; // 次大子儿子
vector <int> longest_child;

void dfs_down (int fa, int cur) { // 填当前位置的down_max, up_max
    long1[cur] = 0;
    long2[cur] = 0;
    longest_child[cur] = -1;

    for (auto v : adj[cur]) {
        if (v == fa)  continue;
        dfs_down (cur, v);

        long long walk_down = down_max[v] + 1;

        if (walk_down > long1[cur]) {
            long2[cur] = long1[cur];
            long1[cur] = walk_down;
            longest_child[cur] = v;
        }
        else if (walk_down > long2[cur]) {
            long2[cur] = walk_down;
        }
    }

    down_max[cur] = long1[cur];
}

// 每个点依赖自己父亲的值，因此在每个点的父亲的时候
// 就去更新这个点
void dfs_up (int fa, int cur) {
    int walk_other_child = 0;

    for (auto v : adj[cur]) {
        if (fa == v) continue;

        if (v == longest_child[cur]) {
            walk_other_child = long2[cur];
        }
        else {
            walk_other_child = long1[cur];
        }

        up_max[v] = max(up_max[cur], walk_other_child) + 1;

        dfs_up (cur, v);
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    down_max.assign (n + 1, 0);
    up_max.assign (n + 1, 0);
    long1.assign (n + 1, 0);
    long2.assign (n + 1, 0);
    longest_child.assign (n + 1, 0);

    for (int i = 1; i < n; i ++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back (v);
        adj[v].push_back (u);
    }
    up_max[1] = 0;  
    dfs_down (0, 1);
    dfs_up (0, 1);

    for (int i = 1; i <= n; i ++) {
        cout << max(up_max[i], down_max[i]) << " ";
    }
    cout << '\n';
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
  <a href="https://vjudge.net/problem/CSES-1132#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>