---
title: Independent Set (1.0)
published: 2026-08-05
category: 算法竞赛
tags: [C++, 树形DP]
---

# 问题描述

给你一棵有 $N$ 个顶点的树，顶点编号从 $1, 2, \ldots, N$ 开始。

对于每条边 $i$（$1 \le i \le N-1$），第 $i$ 条边连接了顶点 $x_i$ 和 $y_i$。

太郎决定给每个顶点涂成白色或黑色，但有一个限制：不能让两个相邻的顶点都涂成黑色。

请计算所有满足条件的涂色方案数，结果对 $10^9+7$ 取模。

# 约束条件

- 输入中的所有数值均为整数。
- $1 \le N \le 10^5$
- $1 \le x_i,y_i \le N$
- 给定的图是一棵树。

# 输入格式

输入从标准输入读入，格式如下：

```text
N
x_1 y_1
x_2 y_2
⋮
x_{N-1} y_{N-1}
```

# 输出格式

输出满足条件的涂色方案数对 $10^9+7$ 取模后的结果。

# 样例 1

## 输入

```text
3
1 2
2 3
```

## 输出

```text
5
```

共有五种涂色方案。
## 如图所示:
![操作示意图](/images/5d8a0a6b2f1a78c776229ef32a1cc353.png)

# 样例 2

## 输入

```text
4
1 2
1 3
1 4
```

## 输出

```text
9
```

共有九种涂色方案。
## 如图:
![操作示意图](/images/c5cc8c4bcecdc24872a3f94df051ab99.png)

# 样例 3

## 输入

```text
1
```

## 输出

```text
2
```

# 样例 4

## 输入

```text
10
8 5
10 8
6 5
1 5
4 8
2 10
3 6
9 2
1 7
```

## 输出

```text
157
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;
const int MAXN = 1e5 + 10;
long long dp[MAXN][2];
vector <int> adj[MAXN];

pair <long long, long long> dfs (int fa, int cur) {
    long long white = 1;
    long long black = 1;

    for (auto it : adj[cur]) {
        if (it == fa)  continue;

        auto [child_white, child_black] = dfs (cur, it);
        white = ((child_black + child_white) * white) % MOD;
        black = (child_white * black) % MOD;
    }
    
    return {white, black};
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
    pair <long long, long> ans =  dfs (0, 1);
    long long res = (ans.first + ans.second) % MOD;
    cout << res << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-dp_p#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>
