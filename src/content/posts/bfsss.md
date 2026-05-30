---
title: Repeatedly Repainting(1.0)
published: 2026-05-31
category: 算法竞赛
tags: [C++, BFS]
---

## 题目描述

有一个 $H$ 行 $W$ 列的网格。第 $i$ 行（从上往下数）第 $j$ 列（从左往右数）的格子称为 $(i, j)$。

每个格子是白色或黑色。网格通过 $H$ 个字符串 $S_1, S_2, \ldots, S_H$ 描述，每个字符串长度为 $W$。

如果 $S_i$ 的第 $j$ 个字符是 `.`，那么格子 $(i, j)$ 是白色；如果是 `#`，则格子 $(i, j)$ 是黑色。

你要执行以下操作 $10^{100}$ 次：

- 对所有格子同时应用以下规则：
  - 操作前是白色的格子，如果至少有一个相邻的黑色格子，则变成黑色。
  - 操作前是黑色的格子变成白色。

这里，格子 $(x, y)$ 和 $(x', y')$ 相邻的定义是它们在彼此的 $8$ 邻域内，也就是说满足：

$$
\max(|x - x'|, |y - y'|) = 1
$$

请你求出经过这些操作后，每个格子的颜色。

## 约束条件

- $1 \le H \times W \le 10^6$
- $H$ 和 $W$ 是正整数。
- $S_i$ 是长度为 $W$ 的字符串，只包含 `.` 和 `#`。

## 输入格式

输入格式如下：

```txt
H W
S_1
S_2
:
S_H
```

## 输出格式

输出 $H$ 行。

每行输出一个长度为 $W$ 的字符串，只包含 `.` 和 `#`。

第 $i$ 行的第 $j$ 个字符表示格子 $(i, j)$ 经过 $10^{100}$ 次操作后的颜色。

白色用 `.` 表示，黑色用 `#` 表示。

## 样例 1

### 输入

```txt
3 4
#.#.
执行一次操作后，网格变成这样。

.#..
#...
```

### 输出

```txt
#.#.
.#..
#..#
```

初始网格如下:
![11](/images/PixPin_2026-05-31_00-27-24.png)

执行一次操作后，网格变成这样。
![11](/images/PixPin_2026-05-31_00-28-23.png)

执行到最后一次变成这样：
![11](/images/PixPin_2026-05-31_00-29-07.png)

## 样例 2

### 输入

```txt
3 3
###
###
###
```

### 输出

```txt
...
...
...
```

## 样例 3

### 输入

```txt
5 7
.#.....
.......
..#....
.......
.....#.
```

### 输出

```txt
.#.##.#
....#..
#.#.###
#....#
###.#.#
```


# 题解：先模拟一次 + 多源 BFS + 奇偶判断

## 题意

有一个 `H x W` 的网格，每个格子是：

- `.`：白色
- `#`：黑色

每次操作会同时作用于所有格子：

1. 原来是黑色的格子，下一次一定变成白色。
2. 原来是白色的格子，如果周围 8 个方向中至少有一个黑格，下一次变成黑色。
3. 原来是白色的格子，如果周围没有黑格，下一次仍然是白色。

题目要求执行 `10^100` 次操作后，输出最终网格。

---

## 核心思路

这题是 BFS，但不能直接从初始黑格开始 BFS。

正确做法是：

```text
先真实模拟第 1 次操作，
然后从第 1 次后的黑格开始做多源 BFS，
最后根据距离奇偶判断最终颜色。
```

---

## 为什么不能直接从初始黑格开始 BFS？

很多人会想：

```text
初始黑格 dist = 0
距离为偶数的格子最终是黑色
距离为奇数的格子最终是白色
```

但这样是错的。

因为题目规则规定：

```text
黑色格子下一次一定变白。
```

也就是说，初始黑格不一定在第一次拓展之后能一直存在，举个例子`##.`拓展完之后就变成`..#`,再拓展一次回去就变成`.#.`,也就是说第一次的两个黑只留下来了一个。


### 反例 1

```text
1 2
##
```

真实变化是：

```text
第 0 次：##
第 1 次：..
第 2 次：..
第 3 次：..
...
```

最终应该是：

```text
..
```

但是如果直接从初始黑格 BFS：

```text
dist: 0 0
```

两个格子的距离都是偶数，就会错误地输出：

```text
##
```

所以不能直接从初始黑格开始 BFS。

### 反例 2

```text
1 3
##.
```

真实变化是：

```text
第 0 次：##.
第 1 次：..#
第 2 次：.#.
第 3 次：#.#
第 4 次：.#.
...
```

因为 `10^100` 是偶数，所以最终是：

```text
.#.
```

如果直接从初始黑格 BFS，会得到：

```text
dist: 0 0 1
```

距离为偶数的是前两个位置，会错误输出：

```text
##.
```

---

## 为什么最后判断 dist 是奇数？

题目总共执行：

```text
10^100
```

次操作。

我们已经先模拟了第 1 次，所以还剩：

```text
10^100 - 1
```

次操作。

因为：

```text
10^100 是偶数
```

所以：

```text
10^100 - 1 是奇数
```

因此最终黑格满足：

```text
dist 是奇数
```

也就是代码里的：

```cpp
dist[i][j] != -1 && dist[i][j] % 2 == 1
```

---

## 算法步骤

1. 读入网格。
2. 扫描所有格子。
3. 对于每个初始白格 `.`：
   - 检查周围 8 个方向有没有初始黑格 `#`。
   - 如果有，说明它第 1 次后会变成黑格。
   - 把它加入 BFS 队列，令 `dist = 0`。
4. 初始黑格不加入队列，因为它第 1 次一定变白。
5. 从第 1 次后的所有黑格开始做多源 BFS。
6. 最后输出：
   - 如果 `dist != -1 && dist % 2 == 1`，输出 `#`。
   - 否则输出 `.`。

---

## C++ 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int dx[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[8] = {-1, 0, 1, -1, 1, -1, 0, 1};

int main() {
    int H, W;
    cin >> H >> W;

    vector<string> S(H);
    vector<vector<int>> dist(H, vector<int>(W, -1));
    queue<pair<int, int>> q;

    for (int i = 0; i < H; i++) {
        cin >> S[i];
    }
    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            // 初始黑格第 1 次一定变白，不能作为 BFS 起点
            if (S[i][j] == '#') {
                continue;
            }

            bool nearBlack = false;

            for (int k = 0; k < 8; k++) {
                int ni = i + dx[k];
                int nj = j + dy[k];

                if (ni < 0 || ni >= H || nj < 0 || nj >= W) {
                    continue;
                }

                if (S[ni][nj] == '#') {
                    nearBlack = true;
                }
            }

            // 初始白格旁边有黑格，第 1 次后变成黑格
            if (nearBlack) {
                dist[i][j] = 0;
                q.push({i, j});
            }
        }
    }

    // 从第 1 次后的所有黑格开始做多源 BFS
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();

        for (int k = 0; k < 8; k++) {
            int nx = x + dx[k];
            int ny = y + dy[k];

            if (nx < 0 || nx >= H || ny < 0 || ny >= W) {
                continue;
            }

            if (dist[nx][ny] != -1) {
                continue;
            }

            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }

    // 10^100 是偶数，已经模拟过第 1 次，所以还剩奇数次
    // 因此 dist 为奇数的格子最终是黑色
    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            if (dist[i][j] != -1 && dist[i][j] % 2 == 1) {
                cout << '#';
            } else {
                cout << '.';
            }
        }
        cout << '\n';
    }

    return 0;
}
```

---

## 复杂度

网格大小满足：

```text
H * W <= 10^6
```

每个格子最多进入 BFS 队列一次。

每次出队最多检查 8 个方向。

所以时间复杂度：

```text
O(HW)
```

空间复杂度：

```text
O(HW)
```

---

## 总结

本题不能直接从初始黑格开始 BFS。

原因是：

```text
初始黑格第 1 次一定变白。
```

所以必须先真实模拟第 1 次操作。

然后从第 1 次后的黑格集合开始做多源 BFS。

因为：

```text
10^100 - 1 是奇数
```

所以最终：

```text
dist 为奇数的格子是黑色。
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
  <a href="https://vjudge.net/problem/AtCoder-abc460_d#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>