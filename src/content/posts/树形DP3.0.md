---
title: Tree Diameter (3.0)
published: 2026-08-06
category: 算法竞赛
tags: [C++, 树形DP]
---

## 题目描述:
给你一棵有 $n$ 个节点的树。

树的**直径**是指两个节点之间的最长距离。你的任务是计算出这棵树的直径。

## 输入

第一行输入一个整数 $n$，表示节点数。节点编号为 $1, 2, \ldots, n$。

接下来有 $n-1$ 行，每行包含两个整数 $a$ 和 $b$，表示节点 $a$ 和节点 $b$ 之间有一条边。

## 输出

输出一个整数：这棵树的直径长度。

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
3
```

**解释：**直径对应的路径是 $2 \to 1 \to 3 \to 5$。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 2e5 + 10;
vector <int> adj[MAXN];

long long answer = 0;

long long dfs (int fa, int cur) { // 返回从该点cur往下的最长深度
    vector <long long> ans;
    for (auto it : adj[cur]) {
        if (it == fa)  continue;
        ans.push_back (dfs (cur, it) + 1);
    }
    sort (ans.rbegin (), ans.rend ());
    if (ans.size () == 1) {
        answer = max (answer, ans[0]);
    }
    else if (ans.size () >= 2) {
        answer = max (answer, ans[0] + ans[1]);
    }

    if (!ans.empty ()) return ans[0];
    return 0;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    for (int i = 1; i < n; i ++) {
        int u, v;
        cin >> u >> v;

        adj[u].push_back (v);
        adj[v].push_back (u);
    }
    vector <long long> ans;
    if (n == 1) {
        cout << 0 << '\n';
        return 0;
    }
    for (auto it : adj[1]) {
        ans.push_back (dfs (1, it) + 1); // 从it往下的最长路
    }
    if (ans.size () == 1) {
        answer = max (answer, ans[0]) ;
    }
    else if (ans.size () >= 2){
        sort (ans.rbegin (), ans.rend ());
        answer = max (answer, ans[0] + ans[1]);
    }
    cout << answer << '\n';
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
  <a href="https://vjudge.net/problem/CSES-1131#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>