---
title: The End? (4.0)
published: 2026-08-16
category: 算法竞赛
tags: [C++, 概率DP]
---

## 题目描述

在 2025 年《英雄联盟》S15 全球总决赛中，T1 战队与 KT 战队鏖战五局，最终 T1 以 $3:2$ 的比分战胜 KT，成功夺冠。这场比赛意义非凡，诞生了多项新的历史纪录。

作为 T1 的核心中单，Faker 选手在此次夺冠后，个人职业生涯的 S 赛冠军数已经达到 6 次，这让他“英雄联盟第一人”的地位更加无可撼动。除了 Faker，队内的 Oner、Gumayusi 和 Keria 也一同实现了 S 赛三连冠。同时，新加入的上单选手 Doran 也凭借此次冠军填补了个人荣誉的空白，首次加冕全球总决赛冠军。

LPL 赛区的征程则充满戏剧性。赛前被寄予厚望的 BLG 战队在瑞士轮首轮爆冷输给北美战队 100T，随后在关键的出线战中不敌 TES，作为一号种子止步十六强，成为本届赛事的一大冷门。TES 在半决赛中被 T1 以 $3:0$ 横扫，LPL 赛区无缘总决赛。LPL 是否迎来了大结局？

回顾这些队伍的晋级历程，一切都始于生死攸关的淘汰赛阶段。淘汰赛采用八支队伍参加的单败淘汰制。各支队伍根据瑞士轮阶段的表现被分配至赛程表中，进行逐轮的一对一比赛，失败者立即被淘汰。

整个赛程共分为三轮：四分之一决赛由八支队伍决出四强，半决赛由四支队伍决出两支决赛队伍，决赛再从这两支队伍中决出最终冠军。

在 S16 中，我们的 1 号队伍能否夺冠呢？请你计算队伍 1 赢得整个锦标赛的最大概率。

更具体地说，共有 8 支队伍参加一场单败淘汰制锦标赛。每支队伍 $i$ 都有两个强度值 $a_i$ 和 $b_i$。

在锦标赛开始前，你需要将每支队伍分配到编号为 1 至 8 的不同种子位置。锦标赛采用标准的单败淘汰制对阵格式：

- 第一轮：种子 1 对阵种子 2，种子 3 对阵种子 4，种子 5 对阵种子 6，种子 7 对阵种子 8。
- 第二轮：种子位置 $(1,2)$ 的胜者对阵 $(3,4)$ 的胜者；$(5,6)$ 的胜者对阵 $(7,8)$ 的胜者。
- 第三轮（决赛）：上半区 $(1,2,3,4)$ 的胜者对阵下半区 $(5,6,7,8)$ 的胜者。

当两支队伍比赛时，种子编号较小的队伍使用其 $a$ 值作为强度，种子编号较大的队伍使用其 $b$ 值作为强度。

如果一支强度为 $a$ 的队伍与一支强度为 $b$ 的队伍比赛，那么前者获胜的概率为：

$$
\frac{a}{a+b}
$$

你需要考虑所有可能的队伍与种子分配方案，求出队伍 1 赢得整个锦标赛的最大概率。

## 输入格式

输入包含 8 行。

第 $i$ 行包含两个整数 $a_i$ 和 $b_i$（$1 \le a_i,b_i \le 100$），表示队伍 $i$ 的两个强度值。

```text
a_1 b_1
a_2 b_2
...
a_8 b_8
```

## 输出格式

输出一行，包含一个实数，表示队伍 1 赢得锦标赛的最大概率。

如果答案的绝对误差或相对误差不超过 $10^{-6}$，则视为正确。

形式化地说，假设你的输出为 $a$，标准答案为 $b$，当且仅当：

$$
\frac{|a-b|}{\max(1,b)} \le 10^{-6}
$$

你的答案将被接受。

## 样例 1

### 输入

```text
10 80
20 70
30 60
40 50
50 40
60 30
70 20
80 10
```

### 输出

```text
0.329505822460368
```

## 样例 2

### 输入

```text
100 100
100 100
100 100
100 100
100 100
100 100
100 100
100 100
```

### 输出

```text
0.125000000000000
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 15;
double a[MAXN];
double b[MAXN];
double dp[5][10]; // 第r轮,第i个人赢的概率是多少
int pos[10];
bool vis[10];
double res = -1.0;

double self_win (int self, int opponent) {
    double ans = 0.0;
    if (self < opponent) {
        ans = a[pos[self]] / (a[pos[self]] + b[pos[opponent]]);
    } else {
        ans = b[pos[self]] / (b[pos[self]] + a[pos[opponent]]);
    }
    return ans;
}

void cnt_win () {
    memset (dp, 0, sizeof (dp));
    for (int i = 0; i < 8; i ++) {
        dp[0][pos[i]] = self_win (i, i ^ 1);
    }
    for (int round = 1; round < 3; round ++) {
        for (int i = 0; i < 8; i ++) {
            int half = 1 << round;
            int opponent_start = ((i >> round) ^ 1) << round;
            for (int j = opponent_start; j < opponent_start + half; j ++) {
                dp[round][pos[i]] += dp[round - 1][pos[i]] * dp[round - 1][pos[j]] * self_win (i, j);
            }
        }
    }
    res = max (res, dp[2][0]);
}

void dfs (int step) {
    if (step == 8) {
        cnt_win ();
        return;
    }
    for (int i = 0; i < 8; i ++) {
        if (!vis[i]) {
            vis[i] = true;
            pos[step] = i;
            dfs (step + 1);
            vis[i] = false;
        }
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    for (int i = 0; i < 8; i ++) {
        cin >> a[i] >> b[i];
    }
    dfs (0);
    cout << fixed << setprecision (15) << res << '\n';
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
  <a href="https://vjudge.net/problem/QOJ-14952" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>