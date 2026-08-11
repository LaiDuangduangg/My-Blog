---
title: Full Alphabet  (3.0)
published: 2026-08-11
category: 算法竞赛
tags: [C++, Z函数, 状压DP]
---

## 题目描述

在本题中，一个字母表被定义为小写英文字母 `a` 到 `z` 的一个排列。

对于两个字母 `x` 和 `y`，当且仅当 `x` 在字母表 `A` 中出现在 `y` 之前时，称 `x` 在字母表 `A` 下的字典序小于 `y`。

对于两个字符串 `s` 和 `t`，当且仅当满足以下两个条件之一时，称字符串 `s` 在字母表 `A` 下的字典序小于字符串 `t`：

- `s` 是 `t` 的真前缀，即 `s` 是 `t` 的前缀且 `s` 不等于 `t`。
- 存在一个整数 `i`，满足 `1 ≤ i ≤ min(|s|, |t|)`，使得对于所有满足 `1 ≤ j < i` 的位置 `j`，均有 `s[j] = t[j]`，并且 `s[i]` 在字母表 `A` 下的字典序小于 `t[i]`。

当且仅当字符串 `s` 在字母表 `A` 下的字典序严格小于它的所有非空真后缀时，称字符串 `s` 是字母表 `A` 下的一个 Lyndon 串（林登串）。

给定一个字符串 `s`，请计算有多少个不同的字母表 `A`，能够使 `s` 成为字母表 `A` 下的 Lyndon 串。

由于答案可能非常大，请输出答案对 `2³²` 取模后的结果。

## 输入格式

输入只有一行，其中包含字符串 `s`。

字符串长度满足：

`2 ≤ |s| ≤ 2 × 10⁷`

## 输出格式

输出一个整数，表示能够使字符串 `s` 成为 Lyndon 串的不同字母表 `A` 的数量。

答案需要对 `2³²` 取模。

## 样例 1

### 输入

```text
abcdefghijklmnopqrstuvwxyz
```

### 输出

```text
2076180480
```

## 样例 2

### 输入

```text
abaabb
```

### 输出

```text
0
```

## 样例 3

### 输入

```text
sserxhsfan
```

### 输出

```text
2452619264
```

## 样例 4

### 输入

```text
arcabcagc
```

### 输出

```text
3598712832
```

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1LL << 32;
const int MAXMASK = 1LL << 26;
const int MAXN = 2e7 + 10;
vector <int> adj[26];
long long pre[26];
long long dp[MAXMASK];
int indegree[26];
int z[MAXN];

bool check_circle () {
    queue <int> que;
    for (int i = 0; i < 26; i ++) {
        if (indegree[i] == 0) {
            que.push (i);
        }
    }  
    while (!que.empty ()) {
        int cur = que.front();
        que.pop ();

        for (auto it : adj[cur]) {
            indegree[it] --;
            if (indegree[it] == 0) {
                que.push (it);
            }
        }
    }
    for (int i = 0; i < 26; i ++) {
        if (indegree[i] != 0) {
            return false;
        }
    }
    return true;
}

void Z_function (const string &s) {
    int n = s.length();
    z[0] = n;   int len;
    int c = 0;  int r = 0;

    for (int i = 1; i < n; i ++) {
        len = r > i ? min (r - i, z[i - c]) : 0;
        while (i + len < n && s[len] == s[i + len]) {
            len ++;
        }
        if (i + len > r) {
            r = i + len;
            c = i;
        }
        z[i] = len;
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    string s;
    cin >> s;

    Z_function (s);
    int n = s.length();
    int cnt_indegree = 0;
    
    // 拓扑排序字典序建图
    for (int i = 1; i < n; i ++) {
        int cur_len = n - i;
        int fir_diff = z[i];
        int sec_diff = i + z[i];
        if (cur_len == z[i]) {
            cout << 0 << '\n';
            return 0;
        }
        int u = s[fir_diff] - 'a';
        int v = s[sec_diff] - 'a';

        long long bit = 1LL << u;
        if ((pre[v] & bit) == 0) {
            adj[u].push_back (v);
            pre[v] |= (1LL << u);
            indegree[v] ++;
        }
    }
    // 拓扑判环
    bool judge2 = check_circle ();
    if (!judge2) {
        cout << 0 << '\n';
        return 0;
    }
    dp[0] = 1;
    for (int mask = 0; mask < MAXMASK; mask++) {
        if (dp[mask] == 0) {
            continue;
        }
        for (int i = 0; i < 26; i++) {
            if (mask & (1LL << i)) {
                continue;
            }
            if ((mask & pre[i]) != pre[i]) {
                continue;
            }
            int new_mask = mask | (1LL << i);
            dp[new_mask] = (dp[new_mask] + dp[mask]);
            if (dp[new_mask] >= MOD) {
                dp[new_mask] -= MOD;
            }
        }
    }
    cout << dp[MAXMASK - 1] << '\n';
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
  <a href="https://ac.nowcoder.com/acm/contest/133881/F" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>