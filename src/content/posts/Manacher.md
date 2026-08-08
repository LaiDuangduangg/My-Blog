---
title: Manacher模板
published: 2026-08-08
category: 算法竞赛
tags: [C++, Manacher]
---

## Description

给出一个只由小写英文字母 `a, b, c, ..., y, z` 组成的字符串 $S$，求 $S$ 中最长回文串的长度。

字符串长度为 $n$。

## Input

一行由小写英文字母 `a, b, c, ..., y, z` 组成的字符串 $S$。

## Output

一个整数表示答案。

## Sample 1

### Input

```text
aaa
```

### Output

```text
3
```

## Hint

$$
1 \le n \le 1.1 \times 10^7
$$

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 3e7;
int p[MAXN];

string pre_operat_s (const string &s) {
    string ss;
    ss.reserve (s.size () * 2 + 1);
    ss.push_back ('#');
    
    for (auto it : s) {
        ss.push_back (it);
        ss.push_back ('#');
    }
    return ss;
}

int Manache (const string &ss) {
    int max_len = 0;
    int len;
    int n = ss.length ();
    int c = 0; // 大回文串中心
    int r = 0; // 大回文串不可达的由边界
    for (int i = 0; i < n; i ++) {
        len = r > i ? min (p[2 * c - i], r - i) : 1;
        while (i - len >= 0 && i + len < n && ss[i + len] == ss[i - len]) {
            len ++;
        }
        if (i + len > r) {
            r = i + len;
            c = i;
        }
        max_len = max (max_len, len);
        p[i] = len;
    }
    return max_len - 1;
}

int main ()
{
    string s;
    cin >> s;

    string ss = pre_operat_s (s);
    long long ans = Manache (ss);
    cout << ans << '\n';
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P3805" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>
