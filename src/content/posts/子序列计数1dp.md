---
title: 子序列计数DP(1.0)
published: 2026-05-22
category: 算法竞赛
tags: [C++, 动态规划,子序列计数DP]
---

## 题目描述

给出一个长度为 $n$ 的序列 $a_1, \cdots, a_n$，求它的本质不同子序列个数。

答案对 $998244353$ 取模。

## 输入格式

第一行一个整数 $n$。

接下来一行 $n$ 个整数 $a_1, \cdots, a_n$。

## 输出格式

一行一个整数表示答案。

## 样例 1

### 输入

```txt
4
1 3 2 0
```

### 输出

```txt
16
```

## 样例 2

### 输入

```txt
13
2 0 2 1 3 2 2 3 1 0 3 2 0
```

### 输出

```txt
3611
```

## 数据规模与约定

- 测试点 $1$，$10$ 分：$n \le 22$，$a_i \le 5000$。
- 测试点 $2$，$10$ 分：$n \le 5000$，$a_i \le 5000$。
- 测试点 $3$，$10$ 分：$n \le 5000$。
- 测试点 $4$，$10$ 分：$a_i \le 5000$。
- 测试点 $5 \sim 8$，共 $60$ 分：无特殊限制。

对于所有数据，$1 \le n \le 3 \times 10^5$，$1 \le a_i \le 2 \times 10^9$。





```cpp
#include <bits/stdc++.h>
using namespace std;

const int MOD = 998244353;

int main ()
{
    int n;
    cin >> n;

    vector <int> dp (n + 1, 0);
    unordered_map <int, long long> last;
    vector <int> a (n + 1);

    for (int i = 1; i <= n; i ++) {
        cin >> a[i];
    }
    for (int i = 1; i <= n; i ++) {
        int id = a[i];

        long long add = 1; // 自己单开，啥也不接
        if (i - 1 > 0) {
            add = (add + dp[i - 1]) % MOD;// 接前面的所有
        }
        dp[i] = (dp[i - 1] + add - last[id] + MOD) % MOD;

        last[id] = add % MOD;
    }

    cout << dp[n] + 1 << '\n'; 
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-U205150" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>