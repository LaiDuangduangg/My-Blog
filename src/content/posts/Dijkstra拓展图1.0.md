---
title: 孤岛营救问题(1.0)
published: 2026-05-22
category: 算法竞赛
tags: [C++, 图论, 最短路, Dijkstra]
---

## 题目描述

1944 年，特种兵麦克接到国防部的命令，要求立即赶赴太平洋上的一个孤岛，营救被敌军俘虏的大兵瑞恩。

瑞恩被关押在一个迷宫里。迷宫地形复杂，但幸运的是，麦克得到了一张迷宫的地形图。

迷宫的外形是一个长方形，其南北方向被划分为 $N$ 行，东西方向被划分为 $M$ 列，于是整个迷宫被划分为 $N \times M$ 个单元。

每一个单元的位置可用一个有序数对表示，即：

```txt
单元的行号，单元的列号
```

南北或东西方向相邻的 $2$ 个单元之间可能互通，也可能有一扇锁着的门，或者是一堵不可逾越的墙。

迷宫中有一些单元存放着钥匙，并且所有的门被分成 $P$ 类。打开同一类门的钥匙相同，不同类门的钥匙不同。

大兵瑞恩被关押在迷宫的东南角，即 $(N, M)$ 单元里，并且已经昏迷。迷宫只有一个入口，在西北角。也就是说，麦克可以直接进入 $(1, 1)$ 单元。

另外，麦克从一个单元移动到另一个相邻单元的时间为 $1$，拿取所在单元的钥匙的时间以及用钥匙开门的时间可以忽略不计。

试设计一个算法，帮助麦克以最快的方式到达瑞恩所在单元，营救大兵瑞恩。

## 输入格式

第 $1$ 行有 $3$ 个整数，分别表示 $N, M, P$ 的值。

第 $2$ 行是 $1$ 个整数 $K$，表示迷宫中门和墙的总数。

第 $I + 2$ 行，满足 $1 \le I \le K$，有 $5$ 个整数，依次为 $X_{i1}, Y_{i1}, X_{i2}, Y_{i2}, G_i$：

- 当 $G_i \ge 1$ 时，表示 $(X_{i1}, Y_{i1})$ 单元与 $(X_{i2}, Y_{i2})$ 单元之间有一扇第 $G_i$ 类的门。
- 当 $G_i = 0$ 时，表示 $(X_{i1}, Y_{i1})$ 单元与 $(X_{i2}, Y_{i2})$ 单元之间有一堵不可逾越的墙。

其中：

$$
|X_{i1} - X_{i2}| + |Y_{i1} - Y_{i2}| = 1
$$

并且：

$$
0 \le G_i \le P
$$

第 $K + 3$ 行是一个整数 $S$，表示迷宫中存放的钥匙总数。

第 $K + 3 + J$ 行，满足 $1 \le J \le S$，有 $3$ 个整数，依次为 $X_{i1}, Y_{i1}, Q_i$，表示第 $J$ 把钥匙存放在 $(X_{i1}, Y_{i1})$ 单元里，并且第 $J$ 把钥匙是用来开启第 $Q_i$ 类门的。

其中：

$$
1 \le Q_i \le P
$$

输入数据中，同一行各相邻整数之间用一个空格分隔。

## 输出格式

输出麦克营救大兵瑞恩所需的最短时间。

如果问题无解，则输出：

```txt
-1
```

## 样例 1

### 输入

```txt
4 4 9
9
1 2 1 3 2
1 2 2 2 0
2 1 2 2 0
2 1 3 1 0
2 3 3 3 0
2 4 3 4 1
3 2 3 3 0
3 3 4 3 0
4 3 4 4 0
2
2 1 2
4 2 1
```

### 输出

```txt
14
```

## 数据范围

$$
|X_{i1} - X_{i2}| + |Y_{i1} - Y_{i2}| = 1
$$

$$
0 \le G_i \le P
$$

$$
1 \le Q_i \le P
$$

$$
N, M, P \le 10
$$

$$
K < 150
$$

$$
S \le 14
$$


## 题解思路

### 1. 分析题意

这道题本质上是一道 **BFS 最短路**。

普通 BFS 的状态一般只需要记录当前位置：

    (x, y)

但是这道题不一样，因为走到某个位置时，能不能继续走，不仅取决于当前位置，还取决于当前手里有哪些钥匙。

所以这里的状态应该是：

    当前位置 + 当前拥有的钥匙集合

也就是：

    (x, y, cur_keys)

其中 `cur_keys` 表示当前已经拥有的钥匙种类。

如果直接用很多维数组来记录每一种钥匙有没有，状态会非常麻烦。

例如，假设有 $5$ 种钥匙，点 $(x, y)$ 对钥匙 $1,2,3,4,5$ 的拥有情况可能是：

    dist[x][y][0][1][1][0][1]
                 ↑  ↑     ↑
               2号有 3号有 5号有

这种写法不仅维度很多，而且空间也不好处理。

所以我们把所有钥匙的拥有情况压缩成一个二进制数。

比如：

    钥匙编号：  5 4 3 2 1
    拥有情况：  1 0 1 1 0

就可以用一个二进制状态表示：

    10110

这就是 **状态压缩**。

因为钥匙的种类数 $P \le 10$，所以最多只有：

$$
2^P
$$

种钥匙状态，完全可以接受。

因此我们可以定义：

    dist[x][y][cur_keys]

表示：到达点 $(x, y)$，并且当前拥有钥匙状态为 `cur_keys` 时的最短时间。

---

### 2. 如何建图

题目中描述的是：从某个点 $(x_1, y_1)$ 到相邻点 $(x_2, y_2)$ 之间，可能有一扇门，也可能是一堵墙。

比如：

    +----------+      2号门      +----------+
    | (x1,y1)  |  <----------->  | (x2,y2)  |
    +----------+                 +----------+

因为门和墙都是在两个相邻格子之间的，所以我们可以给每个格子开一个方向数组。

    grid[x][y][dir]

表示从 $(x, y)$ 往 `dir` 这个方向走时，会遇到什么。

在代码中：

    int dx[] = {1, 0, -1, 0};
    int dy[] = {0, 1, 0, -1};

四个方向分别表示：

    0：下
    1：右
    2：上
    3：左

如果 $(x_1, y_1)$ 到 $(x_2, y_2)$ 之间有一扇 $2$ 号门，并且 $(x_2, y_2)$ 在 $(x_1, y_1)$ 的右边，那么可以理解为：

    (x1,y1)  --往右是2号门-->  (x2,y2)
    (x2,y2)  --往左是2号门-->  (x1,y1)

所以要双向记录：

    grid[x1][y1][右] = 2;
    grid[x2][y2][左] = 2;

示意图：

    +----------+      2号门      +----------+
    | (x1,y1)  |  ------------>  | (x2,y2)  |
    +----------+                 +----------+
          右方向记录为 2

    +----------+      2号门      +----------+
    | (x1,y1)  |  <------------  | (x2,y2)  |
    +----------+                 +----------+
                        左方向记录为 2

在代码里，`grid[x][y][dir]` 的含义是：

- `-1`：这个方向没有特殊限制，可以直接走；
- `0`：这个方向是一堵墙，不能走；
- `> 0`：这个方向是一扇门，需要对应编号的钥匙才能走。

---

### 3. 钥匙怎么存

每个格子里可能存放钥匙。

我们也用一个二进制数来表示这个格子有哪些钥匙。

    keys[x][y]

表示点 $(x, y)$ 上存放的钥匙状态。

一开始，某个格子的钥匙状态可能是：

    key = 0000 0000 0000 0000

如果这个格子有一把 $2$ 号钥匙，那么就把第 $2$ 位变成 `1`。

    2号钥匙对应的状态：

    0000 0000 0000 0010

所以可以用按位或来加入这把钥匙：

    keys[x][y] |= (1 << (kinds - 1));

比如：

    原来的 key：

    0000 0000 0000 0000

    加入 2 号钥匙：

    0000 0000 0000 0010

    变成：

    0000 0000 0000 0010

如果一个格子有多把钥匙，也可以不断用 `|` 合并进去。

---

### 4. 如何状态转移

BFS 的每个状态是：

    (x, y, cur_keys)

表示当前在 $(x, y)$，并且手里拥有的钥匙状态是 `cur_keys`。

然后枚举四个方向，尝试走到下一个点：

    (nx, ny)

转移时需要判断下面几种情况。

#### 1. 越界不能走

如果新位置不在迷宫范围内，就直接跳过：

    if (nx < 1 || nx > n || ny < 1 || ny > m) continue;

#### 2. 遇到墙不能走

如果这个方向是墙，也不能走：

    if (grid[x][y][i] == 0) continue;

#### 3. 遇到门，要判断有没有钥匙

如果这个方向是一扇门，比如需要 `need_key` 号钥匙，那么要检查当前钥匙状态中有没有这一位。

    if (need_key > 0 && !((1 << (need_key - 1)) & cur_keys)) continue;

如果没有钥匙，就不能走。

#### 4. 可以走时，更新钥匙状态

如果可以走到 $(nx, ny)$，那么到达新格子之后，可能会捡到新钥匙。

所以新的钥匙状态是：

    int nex_k = cur_keys | keys[nx][ny];

也就是：

    原来拥有的钥匙  |  新格子上的钥匙

然后更新最短距离：

    if (dist[nx][ny][nex_k] > dist[x][y][cur_keys] + 1) {
        dist[nx][ny][nex_k] = dist[x][y][cur_keys] + 1;
        que.push({nx, ny, nex_k});
    }

---

### 5. 初始状态

起点是 $(1, 1)$。

如果起点上本来就有钥匙，那么一开始就应该把这些钥匙拿上。

所以初始钥匙状态是：

    int start_key = keys[1][1];

初始距离为：

    dist[1][1][start_key] = 0;

然后把初始状态放入队列：

    que.push({1, 1, start_key});

---

### 6. 答案统计

终点是 $(n, m)$。

到达终点时，手里可能有不同的钥匙状态。只要能到达终点，都是合法的。

所以最后要枚举所有钥匙状态，取最小值：

    int ans = INF;

    for (int keys = 0; keys < max_keys; keys++) {
        ans = min(ans, dist[n][m][keys]);
    }

如果最终还是 `INF`，说明无法到达终点，输出 `-1`。

否则输出最短时间。

---

### 7. 复杂度分析

迷宫一共有：

$$
N \times M
$$

个格子。

钥匙状态最多有：

$$
2^P
$$

种。

每个状态最多向 $4$ 个方向转移，所以总复杂度为：

$$
O(NM \times 2^P \times 4)
$$

因为题目中 $N, M, P \le 10$，所以这个复杂度完全可以通过。

## 代码如下：
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 20;
const int MAXM = 20;
const int INF = 2e9;
vector <vector <vector <int>>> grid (MAXN, vector <vector <int>> (MAXM, vector <int> (4, -1)));

int dx[] = {1, 0, -1, 0};
int dy[] = {0, 1, 0, -1};

int get_dir (int x1, int y1, int x2, int y2) {
    int gapx = x2 - x1;
    int gapy = y2 - y1;
    for (int i = 0; i < 4; i ++) {
        if (gapx == dx[i] && gapy == dy[i]) {
            return i;
        }
    }
    return -1;
}

struct Infoma1 {
    int x;
    int y;
    int cur_keys;
};

int main ()
{
    int n, m, p, k;
    cin >> n >> m >> p >> k;

     
    for (int i = 0; i < k; i ++) {
        int x1, y1, x2, y2, g;
        cin >> x1 >> y1 >> x2 >> y2 >> g;

        int dir_1 = get_dir (x1, y1, x2, y2);
        int dir_2 = get_dir (x2, y2, x1, y1);
        grid[x1][y1][dir_1] = g;
        grid[x2][y2][dir_2] = g;
    }

    int s; 
    cin >> s;
    vector <vector <int>> keys (MAXN, vector <int> (MAXM, 0));

    for (int i = 0; i < s; i ++) {
        int x, y, kinds;
        cin >> x >> y >> kinds;

        keys[x][y] |= (1 << (kinds - 1));
    }
    
    int max_keys = 1 << p; // 钥匙从0开始，只能占到p - 1位
    vector <vector <vector<int>>> dist (MAXN, vector <vector <int>> (MAXM, vector <int> (max_keys, INF)));
    
    int start_key = keys[1][1];
    dist[1][1][start_key] = 0;
    queue <Infoma1> que;
    que.push ({1, 1, start_key}); //x, y, key

    while (!que.empty ()) {
        auto [x, y, cur_keys] = que.front ();
        que.pop ();

        for (int i = 0; i < 4; i ++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            int need_key = grid[x][y][i];
            if (nx < 1 || nx > n || ny < 1 || ny > m)  continue; // 越界
            if (grid[x][y][i] == 0)  continue; // 墙
            if (need_key > 0 && !((1 << (need_key - 1)) & cur_keys))  continue; // 没有这种房门钥匙

            int nex_k = cur_keys | keys[nx][ny];
            if (dist[nx][ny][nex_k] > dist[x][y][cur_keys] + 1) {
                dist[nx][ny][nex_k] = dist[x][y][cur_keys] + 1;
                que.push ({nx, ny, nex_k});
            }
        }
    }
    int ans = INF;
    for (int keys = 0; keys < max_keys; keys ++) {
        ans = min (ans, dist[n][m][keys]);
    }
    if (ans == INF) {
        cout << -1 << '\n';
    }
    else {
        cout << ans << '\n';
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P4011#author=main" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>