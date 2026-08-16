---
title: トーナメント (3.0)
published: 2026-08-16
category: 算法竞赛
tags: [C++, 概率DP]
---

## 问题描述

有 $2^K$ 名选手参加一场单败淘汰赛，编号为 $1,2,\ldots,2^K$。

比赛按照以下方式进行：

- 第一轮：选手 $1$ 与 $2$、$3$ 与 $4$，依此类推，两两进行比赛。
- 第二轮：第一轮中选手 $1,2$ 的胜者与选手 $3,4$ 的胜者比赛；选手 $5,6$ 的胜者与选手 $7,8$ 的胜者比赛，依此类推。
- 后续轮次也按照相同方式进行。
- 第 $K$ 轮结束后，决出最终冠军。

已知选手 $i$ 的 Elo 等级分为 $R_i$，请计算每位选手最终夺冠的概率。

当 Elo 等级分为 $R_P$ 的选手 $P$ 与等级分为 $R_Q$ 的选手 $Q$ 比赛时，选手 $P$ 获胜的概率为：

$$
\frac{1}{1+10^{(R_Q-R_P)/400}}
$$

不同比赛的胜负相互独立。

## 约束条件

- $1 \le K \le 10$
- $0 \le R_i \le 4000$

## 输入格式

```text
K
R_1
R_2
...
R_{2^K}
```

## 输出格式

输出 $2^K$ 行。

第 $i$ 行输出选手 $i$ 最终夺冠的概率。当答案的绝对误差不超过 $10^{-6}$ 时，视为正确。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1 << 10;
double dp[15][MAXN]; // 第r轮第i人赢了的概率
int a[MAXN];

double self_win (int self, int opponent) {
    double ans = 1.0 / (1 + pow (10, (a[opponent] - a[self]) / 400.0));
    return ans;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int n;
    cin >> n;

    for (int i = 0; i < (1LL << n); i ++) {
        cin >> a[i];
    }
    for (int i = 0; i < (1LL << n); i ++) {
        dp[0][i] = self_win (i, i ^ 1);
    }
    for (int r = 1; r < n; r ++) {
        for (int i = 0; i < (1LL << n); i ++) {
            int half = 1 << r;
            int opponent_start = ((i >> r) ^ 1) << r;
            for (int j = opponent_start; j < opponent_start + half; j ++) {
                if (dp[r - 1][j] == -1.0) {
                    continue;
                } 
                dp[r][i] += dp[r - 1][j] * dp[r - 1][i] * self_win (i, j);
            }
        }    
   }
   for (int i = 0; i < (1LL << n); i ++) {
        cout << fixed << setprecision (7) << dp[n - 1][i] << '\n';
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
  <a href="https://vjudge.net/problem/AtCoder-tdpc_tournament#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>