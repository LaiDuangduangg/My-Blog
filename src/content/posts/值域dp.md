---
title: 值域dp
published: 2026-04-08
category: 算法竞赛
tags: [C++, 动态规划,值域dp]
---

## 题目描述

对于一个长度为 $K$ 的整数数列：$A_1, A_2, \dots, A_K$，我们称之为接龙数列当且仅当 $A_i$ 的首位数字恰好等于 $A_{i-1}$ 的末位数字（$2 \le i \le K$）。

例如 12, 23, 35, 56, 61, 11 是接龙数列；12, 23, 34, 56 不是接龙数列，因为 56 的首位数字不等于 34 的末位数字。所有长度为 1 的整数数列都是接龙数列。

现在给定一个长度为 $N$ 的数列 $A_1, A_2, \dots, A_N$，请你计算最少从中删除多少个数，可以使剩下的序列是接龙序列？

---
## 输入格式

第一行包含一个整数 $N$。

第二行包含 $N$ 个整数 $A_1, A_2, \dots, A_N$。


## 输出格式

一个整数代表答案。

## Sample 1
输入:
```text
5
11 121 22 12 2023
```
输出:
```text
1
```



## Hint

**【样例说明】**

删除 22，剩余 11, 121, 12, 2023 是接龙数列。

**【评测用例规模与约定】**

对于 $20\%$ 的数据，$1 \le N \le 20$。

对于 $50\%$ 的数据，$1 \le N \le 10^4$。

对于 $100\%$ 的数据，$1 \le N \le 10^5$，$1 \le A_i \le 10^9$。所有 $A_i$ 保证不包含前导 0。





### 1. 常规思路（下标 DP）
看到“最长...子序列”，我们的第一反应通常是极其经典的**最长上升子序列 (LIS)** 模型。

我们会自然而然地定义状态：$dp[i]$ 表示以第 $i$ 个字符串结尾的最长接龙序列的长度。

为了求出 $dp[i]$，我们需要向前遍历 $0$ 到 $i - 1$ 的所有字符串，检查谁的末位数字等于当前第 $i$ 个字符串的首位数字。

### 2. 状态转移方程

如果 `a[j]` 的末位 == `a[i]` 的首位：

$$
dp[i] = \max(dp[i], dp[j] + 1)
$$

### 3. 但暴力实则不可行
这套逻辑是完全正确的，但它的时间复杂度是 $O(N^2)$。本题的数据范围是 $N \le 10^5$，在算法竞赛中，$O(N^2)$ 的算法处理 $10^5$ 的数据必定会 Time Limit Exceeded (TLE)。

如果是**最长上升子序列 (LIS)**,那我们还可以用二分查找来优化一下，但是这个题他是没有单调这种特性的，所以我们要另想优化方法。

## 四、 最终方法确定：破局的“降维打击”

既然基于“数组下标”的 DP 无法优化，我们需要转换视角，寻找问题的转移瓶颈。

仔细观察接龙的规则：决定一个数字字符串能不能接在别人后面的，**仅仅是它的首位数字**；决定别人能不能接在它后面的，**仅仅是它的末位数字**。
即使给定的数字长达 $10^9$，它的首位和末位也只能是 **0 到 9 这 10 个数字之一**！
这就是突破口：状态空间其实极其微小。

### 1. 重新定义状态（值域 DP）

我们彻底抛弃基于下标的 $dp[i]$，改为基于**特征值（数字 0~9）**：
定义 $dp[d]$ 为：当前所有遍历过的序列中，以数字 $d$ ($0 \le d \le 9$) **结尾**的最长接龙序列的长度。
这样，我们的状态数组大小从 $10^5$ 瞬间压缩到了 10。

### 2. $O(1)$ 的状态转移

从左到右遍历输入的字符串。假设当前字符串的首位数字是 $fro$，末位数字是 $bac$。
如果我们要把这个字符串加入接龙序列，它只能接在以 $fro$ 结尾的序列后面。接上去之后，新的序列就变成了以 $bac$ 结尾。

所以！！！我们拿到当前的字符串string, 结尾数字是bac, 我们只能更新dp[bac]的值,因为不管接不接，也就是dp[bac],也就是以bac结尾的串的dp值会被改变

因此，状态转移方程为：

$$
dp[bac] = \max(dp[bac], dp[fro] + 1)
$$

*   $dp[bac]$：不选当前字符串，维持原有的以 $bac$ 结尾的最长长度。
*   $dp[fro] + 1$：把当前字符串接在以 $u$ 结尾的最优序列之后，形成一个新的以 $v$ 结尾的序列。

### 3. 复杂度分析

只需要对长度为 $N$ 的数组进行一次线性扫描，每次转移只需 $O(1)$ 时间，整体时间复杂度降至完美的 $O(N)$，空间复杂度为 $O(1)$（仅需一个长度为 10 的数组）。

## 代码如下：
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 15;
int dp[MAXN]; // 以i为结尾的最长序列

int main ()
{
    int n;
    cin >> n;

    int max_len = -1e9;
    for (int i = 0; i < n; i ++) {
        string s;
        cin >> s;

        char fro = s.front ();
        char bac = s.back ();

        dp[bac] = max (dp[bac], dp[fro] + 1);
        max_len = max (max_len, dp[bac]);
    }
    cout << n - max_len << '\n';
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P9242" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>



