---
title: 快速求树上距离
published: 2026-04-09
category: 算法竞赛
tags: [C++, 图论, LCA, 倍增]
---


## Description

某景区一共有 $N$ 个景点，编号 $1$ 到 $N$。景点之间共有 $N - 1$ 条双向的摆渡车线路相连，形成一棵树状结构。在景点之间往返只能通过这些摆渡车进行，需要花费一定的时间。

小明是这个景区的资深导游，他每天都要按固定顺序带客人游览其中 $K$ 个景点：$A_1, A_2, \dots, A_K$。今天由于时间原因，小明决定跳过其中一个景点，只带游客按顺序游览其中 $K - 1$ 个景点。具体来说，如果小明选择跳过 $A_i$，那么他会按顺序带游客游览 $A_1, A_2, \dots, A_{i-1}, A_{i+1}, \dots, A_K (1 \le i \le K)$。

请你对任意一个 $A_i$，计算如果跳过这个景点，小明需要花费多少时间在景点


## Input

第一行包含 2 个整数 $N$ 和 $K$。

以下 $N - 1$ 行，每行包含 3 个整数 $u, v, t$，代表景点 $u$ 和 $v$ 之间有摆渡车线路，花费 $t$ 个单位时间。

最后一行包含 $K$ 个整数 $A_1, A_2, \dots, A_K$ 代表原定游览线路。

## Output

输出 $K$ 个整数，其中第 $i$ 个代表跳过 $A_i$ 之后，花费在摆渡车上的时间。

## Sample 1

**Input**
```text
6 4
1 2 1
1 3 1
3 4 2
3 5 2
4 6 3
2 6 5 1
```

**Output**
```text
10 7 13 14
```


## Hint

**【样例说明】**

原路线是 $2 \to 6 \to 5 \to 1$。

当跳过 $2$ 时，路线是 $6 \to 5 \to 1$，其中 $6 \to 5$ 花费时间 $3 + 2 + 2 = 7$，$5 \to 1$ 花费时间 $2 + 1 = 3$，总时间花费 $10$。

当跳过 $6$ 时，路线是 $2 \to 5 \to 1$，其中 $2 \to 5$ 花费时间 $1 + 1 + 2 = 4$，$5 \to 1$ 花费时间 $2 + 1 = 3$，总时间花费 $7$。

当跳过 $5$ 时，路线是 $2 \to 6 \to 1$，其中 $2 \to 6$ 花费时间 $1 + 1 + 2 + 3 = 7$，$6 \to 1$ 花费时间 $3 + 2 + 1 = 6$，总时间花费 $13$。

当跳过 $1$ 时，路线是 $2 \to 6 \to 5$，其中 $2 \to 6$ 花费时间 $1 + 1 + 2 + 3 = 7$，$6 \to 5$ 花费时间 $3 + 2 + 2 = 7$，总时间花费 $14$。

**【评测用例规模与约定】**

对于 $20\%$ 的数据，$2 \le K \le N \le 100$。

对于 $40\%$ 的数据，$2 \le K \le N \le 10^4$。

对于 $100\%$ 的数据，$2 \le K \le N \le 10^5$，$1 \le u, v, A_i \le N$，$1 \le t \le 10^5$。保证 $A_i$ 两两不同。

拿到题目，第一眼看到“$N$ 个景点，$N-1$ 条双向路线，形成一棵树状结构”



### 1. 解析：

拿到题目，第一眼看到“$N$ 个景点，$N - 1$ 条双向路线，形成一棵树状结构”：

*   **目标：** 游客按顺序走 $A_1 \rightarrow A_2 \rightarrow \dots \rightarrow A_K$，这其实就是求树上多段路径的长度之和。
游客按顺序走 $A_1 \to A_2 \to \dots \to A_K$，这其实就是求树上多段路径的长度之和。

题目要求我们输出 $K$ 个答案：依次假设跳过第 $i$ 个景点，求出新的路线总耗时。

遇到这题，一开始的思路可能是：写一个循环，每次跳过一个点，然后用 BFS 或 DFS 把剩下的 $K - 1$ 个点重新走一遍算时间。

*   **时间复杂度：** 每次算两点距离最坏是 $O(N)$，一条路线算下来是 $O(N \times K)$。你要跳过 $K$ 个点，也就是要重复算 $K$ 次。总复杂度逼近 $O(N \times K^2)$。数据范围：$N$ 和 $K$ 高达 $10^5$。这肯定就超时了。

*   **转换一下思路：** 那我们每次基本上都是在重复统计，我们其实可以先按照题目要求的路线先把总的游玩的路程total_ways算出来，然后中间每次删掉点我们再对total_ways进行操作。 那么现在中间会删掉K个点，删掉的点我们就把他左右两条路断掉，再接上两边。

如果我们要跳过中间的景点 $A_i$，游客原本是怎么走的？是 $A_{i-1} \rightarrow A_i \rightarrow A_{i+1}$。现在 $A_i$ 不去了，直接变成了 $A_{i-1} \rightarrow A_{i+1}$。

*   新总耗时 = `Total` - (旧的两段路) + (新的路)
*   公式表达：$Ans = Total - dist(A_{i-1}, A_i) - dist(A_i, A_{i+1}) + dist(A_{i-1}, A_{i+1})$

### 2.操作思路:
也就是说现在需要快速的找两点之间的距离，最强兵器就是 LCA（最近公共祖先）。
* 但是因为LCA的常规操作是一步一步往祖先走的,步长太短了，我们必须在很快的时间内找到他们的公共祖先，所以我们用倍增法，预处理一个表。
$fa[u][j]$,表示节点$u$往上走 $2^j$步

*那现在就有两个距离的处理思路：
* 第一种就是，我用一个$dist[]$数组，预处理每个点到根节点的距离,这样两点之间的距离就满足:
$$距离 = dist[u] + dist[v] - 2 \times dist[LCA(u, v)]$$
(那这个LCA这个公共祖先怎么求呢，一样的，我们在LCA函数内部，用倍增的步数在$O(\log N)$的时间范围内找出最近公共祖先)
* 第二种就是,我不需要这个$dist[ ]$数组预处理,我在LCA函数内部每次倍增的时候就记录一下当前倍增的步数,然后加起来，最后返回一个总步数,当然也是可以,只是平时操作我们更prefer前面的 $dist[ ]$ 数组预处理



### 核心代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 10;
int dist[MAXN]; // 每个点到起始点的距离
int depth[MAXN]; // 每个点深度
int fa[MAXN][20]; // 每个点走2的j次方步所到达的祖先点

struct infoma{
    int to;
    int dis;
};
vector <infoma> adj [MAXN];
vector <int> b (MAXN);

void dfs (int cur, int pre, int way) {
    depth[cur] = depth[pre] + 1;
    dist[cur] = way;
    fa[cur][0] = pre;

    // 倍增数组
    for (int i = 1; i < 20; i ++) {
        int mid = fa[cur][i - 1];
        fa[cur][i] = fa[mid][i - 1];
    }

    for (auto it : adj[cur]) {
        int nei = it.to;
        int w = it.dis;

        if (nei == pre) continue;
        dfs (nei, cur, way + w);
    }
}   

int LCA (int x, int y) {// 找两个点的最近公共祖先
    if (depth[x] < depth[y]) {
        swap (x, y);
    }// 令x更深
    
    // 统一深度
    for (int i = 19; i >= 0; i --) {
        if (depth[fa[x][i]] >= depth[y]) {
            x = fa[x][i];
        }
    }
    if (x == y) return x;
    // 共同往上走
    for (int i = 19; i >= 0; i --) {
        if (fa[x][i] != fa[y][i]) {
            x = fa[x][i];
            y = fa[y][i];
        }
    }

    // 现在两者差一步就找到公共祖先了
    return fa[x][0];
}

long long get_dis (int a, int b) {
    return dist[a] + dist[b] - dist[LCA(a, b)] * 2;
}

int main ()
{
    int n, k;
    cin >> n >> k;

    for (int i = 1; i < n; i ++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back ({v, w});
        adj[v].push_back ({u, w});
    }
    for (int i = 0; i < k; i ++) {
        cin >> b[i];
    }
    // cur， fa， dist
    dfs (1, 0, 0);

    // 先算出原先的总长度再来减
    long long total_ways = 0;
    for (int i = 0; i < k - 1; i ++) {
        total_ways += get_dis (b[i], b[i + 1]);
    }
    long long Copi = total_ways;
    for (int i = 0; i < k; i ++) {
        if (i == 0) {
            Copi -= get_dis (b[i], b[i + 1]);
        }
        else if (i == k - 1) {
            Copi -= get_dis (b[i], b[i - 1]);
        }
        else {
            Copi -= get_dis (b[i], b[i - 1]);
            Copi -= get_dis (b[i], b[i + 1]);
            Copi += get_dis (b[i - 1], b[i + 1]);
        }
        cout << Copi << " ";
        Copi = total_ways;
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P9245" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>