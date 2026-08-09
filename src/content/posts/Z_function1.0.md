---
title: 扩展 KMP / exKMP (Z 函数) (1.0)
published: 2026-08-08
category: 算法竞赛
tags: [C++, Z函数]
---

## Description

给定两个字符串 $a,b$，你要求出两个数组：

- $b$ 的 Z 函数数组 $z$，即 $b$ 与 $b$ 的每一个后缀的 LCP 长度。
- $b$ 与 $a$ 的每一个后缀的 LCP 长度数组 $p$。

对于一个长度为 $n$ 的数组 $a$，设其权值为：

$$
\operatorname{xor}_{i=1}^{n} i \times (a_i+1)
$$

## Input

两行两个字符串 $a,b$。

## Output

第一行一个整数，表示 $z$ 的权值。

第二行一个整数，表示 $p$ 的权值。

## Sample 1

### Input

```text
aaaabaa
aaaaa
```

### Output

```text
6
21
```

## Hint

**样例解释：**

$$
z=\{5,4,3,2,1\},\quad p=\{4,3,2,1,0,2,1\}
$$

---

**数据范围：**

对于第一个测试点，$|a|,|b|\le 2\times 10^3$。

对于第二个测试点，$|a|,|b|\le 2\times 10^5$。

对于 $100\%$ 的数据，$1\le |a|,|b|\le 2\times 10^7$，所有字符均为小写字母。

## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

string a, b;
const int MAXN = 2e7 + 10;
int z[MAXN];
int e[MAXN];

void Z_function (const string &s) {
    int n = s.length ();
    int len;
    int c = 0;
    int r = 0;
    z[0] = n;

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

void E_function (const string &a, const string &b) {
    int n = a.length ();
    int m = b.length ();
    int len;
    int c = 0;
    int r = 0;

    for (int i = 0; i < n; i ++) {
        len = r > i ? min (r - i, z[i - c]) : 0;
        while (i + len < n && len < m && a[len + i] == b[len]) {
            len ++;
        }
        if (i + len > r) {
            r = i + len;
            c = i;
        }
        e[i] = len;
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);
    
    cin >> a >> b;
    Z_function (b);
    E_function (a, b);
    long long ans1 = 0;
    long long ans2 = 0;
    for (int i = 0; i < b.length (); i ++) {
        ans1 ^= 1LL * (1LL * (i + 1) * (z[i] + 1));
    }
    for (int i = 0; i < a.length (); i ++) {
        ans2 ^= 1LL * (1LL * (i + 1) * (e[i] + 1));
    }
    cout << ans1 << '\n' << ans2 << '\n';
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
  <a href="https://vjudge.net/problem/%E6%B4%9B%E8%B0%B7-P5410" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>