---
title: Tree Matching (2.0)
published: 2026-08-05
category: 算法竞赛
tags: [C++, 树形DP]
---

# 树上匹配（Tree Matching）

给定一棵包含 $n$ 个节点的树。

所谓**匹配**，是指一组边，并且每个节点最多只能与其中一条边相连。

请计算该树的匹配中最多可以包含多少条边。

# 输入格式

第一行包含一个整数 $n$，表示节点数量。节点编号为 $1,2,\ldots,n$。

接下来有 $n-1$ 行，每行包含两个整数 $a$ 和 $b$，表示节点 $a$ 与节点 $b$ 之间存在一条边。

```text
n
a_1 b_1
a_2 b_2
...
a_{n-1} b_{n-1}
```

# 输出格式

输出一个整数，表示匹配中边的最大数量。

# 约束条件

- $1 \le n \le 2 \cdot 10^5$
- $1 \le a,b \le n$

# 样例

## 输入

```text
5
1 2
1 3
3 4
3 5
```

## 输出

```text
2
```

## 解释

一种可能的匹配是选择边 $(1,2)$ 和 $(3,4)$。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 2e5 + 10;
long long dp[MAXN][2];
vector <long long> adj[MAXN];

// 那我们可以知道,每个点可以选择与自己其中一个儿子匹配或者不匹配
// 假设我们要与其中一个儿子匹配, 就要加上其他儿子与其子树的max以及其他没有跟他匹配的儿子与其子树的max的总和
// 假设我们不与任何儿子进行匹配, 就加上所有儿子与其子树的max的总和

// 那可以定义dp[i][0] dp[i][1]分别为该点与他的儿子匹配,该子树最终能获得的最大匹配数???
// 但是这样看来,自己儿子的状态就很不好转移了,因为他的儿子就不知道自己的父亲是否有与他结合到一起.

// 因此不妨设dp[i][0] dp[i][1] 分别为该点与他的父亲(没)匹配,该子树最终能获得的最大匹配数, 这样父亲要不要与他结合的信息
// 就可以传下来

void dfs (int fa, int cur) { // dfs的任务就是填写当前的dp[cur][0] dp[cur][1]
    long long no_match = 0; // 不与任何孩子匹配的总max

    for (auto it : adj[cur]) {
        if (it == fa)  continue;
        dfs (cur, it);
        no_match = no_match + dp[it][0];
    }
    // 已经和自己的父亲匹配了
    dp[cur][1] = no_match;

    // 没有和自己父亲匹配, 还有选择和孩子匹配的机会
    dp[cur][0] = no_match;
    for (auto it : adj[cur]) {
        if (it == fa)  continue;
        long long new_val = no_match - dp[it][0] + dp[it][1] + 1;
        dp[cur][0] = max (dp[cur][0], new_val);
    }
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
    
    dfs (0, 1);
    cout << dp[1][0] << '\n';
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
  <a href="https://vjudge.net/problem/CSES-1130#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>