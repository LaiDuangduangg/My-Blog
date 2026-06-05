---
title: Reserved Reversals(1.0)
published: 2026-05-22
category: 算法竞赛
tags: [C++, 可达性构造]
---

# 题目描述

给你一个长度为 $n$ 的正整数数组 $a$。

对于数组中任意一个从位置 $l$ 到位置 $r$ 的区间，满足 $1 \le l \le r \le n$，定义 $m(l, r)$ 为该区间的最小值，$M(l, r)$ 为该区间的最大值。

形式化表示为：

$$
m(l, r) = \min(a_l, a_{l+1}, \dots, a_r),
$$

$$
M(l, r) = \max(a_l, a_{l+1}, \dots, a_r).
$$

你可以执行以下操作任意次，包括零次：

- 选择两个下标 $l$ 和 $r$，满足 $1 \le l \le r \le n$，且区间内最小值和最大值的和 $m(l, r) + M(l, r)$ 是奇数；
- 将区间 $a_l, a_{l+1}, \dots, a_r$ 整体反转。换句话说，对于所有满足 $l \le i \le r$ 的 $i$，同时将 $a_i := a_{l+r-i}$ 赋值。

判断你是否能通过一系列操作把数组 $a$ 变成 **非递减** 的样子。

一个数组 $[b_1, b_2, \dots, b_k]$ 被认为是非递减的，当且仅当：

$$
b_1 \le b_2 \le \dots \le b_k.
$$

---

# 输入格式

输入包含多组测试数据。

第一行是测试数据组数 $t$，满足：

$$
1 \le t \le 10^4
$$

接下来是每组测试数据的描述。

每组测试数据第一行包含一个整数 $n$，表示数组 $a$ 的长度，满足：

$$
1 \le n \le 2 \cdot 10^5
$$

第二行包含 $n$ 个整数：

$$
a_1, a_2, \dots, a_n
$$

表示数组的元素，满足：

$$
1 \le a_i \le n
$$

保证所有测试数据中 $n$ 的总和不超过：

$$
2 \cdot 10^5
$$

---

# 输出格式

对于每组测试数据，如果能通过操作将数组 $a$ 变为非递减，输出：

```text
YES
```

否则输出：

```text
NO
```

答案大小写不限，例如 `"yEs"`、`"yes"`、`"Yes"` 和 `"YES"` 都视为正确答案。

---

# 样例

## 输入

```text
6
4
1 1 2 3
3
2 1 3
5
5 4 3 2 1
6
4 1 2 3 3 6
5
4 2 4 2 4
6
3 3 1 5 5 2
```

## 输出

```text
YES
YES
NO
YES
NO
NO
```

---

# 样例说明

第一组测试数据中，数组已经是非递减的了，所以输出 `YES`。

第二组测试数据中，我们选择 $l = 1$ 和 $r = 2$，此时：

$$
\min(2, 1) + \max(2, 1) = 2 + 1 = 3
$$

因为 $3$ 是奇数，所以可以反转区间 $[1, 2]$。

反转后数组变成：

$$
a = [1, 2, 3]
$$

达到了非递减，所以输出 `YES`。

看第四组测试数据：

- 操作 1：选择 $l = 1, r = 3$，数组变为 $a = [2, 1, 4, 3, 3, 6]$。
- 操作 2：选择 $l = 3, r = 5$，数组变为 $a = [2, 1, 3, 3, 4, 6]$。
- 操作 3：选择 $l = 1, r = 2$，数组变为 $a = [1, 2, 3, 3, 4, 6]$。

最终数组变成非递减，所以输出 `YES`。

第五组测试数据中，无法找到满足条件的 $l$ 和 $r$ 使数组变为非递减，所以输出 `NO`。




```cpp
#include <bits/stdc++.h>
using namespace std;

bool check (vector <int> &a, int p) {
    // 假设p == 0
    // 找到可选的异奇偶的max和min
    int choose_max = -1;
    int choose_min = 1e9;
    for (int i = 0; i < a.size (); i ++) {
        if (a[i] % 2 != p) {
            choose_max = max (choose_max, a[i]);
            choose_min = min (choose_min, a[i]);
        }
    }
    int mx = -1;
    for (int i = 0; i < a.size (); i ++) {
        if (a[i] % 2 == p) {// 假设当前是偶数
            if (a[i] < mx && choose_max <= mx && choose_min >= a[i]) {
                return false;
            }
            mx = max (mx, a[i]);
        }
    }
    return true;
}

void solve () {
    int n;
    cin >> n;

    vector <int> a (n);
    for (int i = 0; i < n; i ++) {
        cin >> a[i];
    }
    
    bool can_do = (check (a, 0) && check (a, 1));
    if (can_do) {
        cout << "YES" << '\n';
    }
    else {
        cout << "NO" << '\n';
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    int t ;
    cin >> t;

    while (t --) {
        solve ();
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
  <a href="https://codeforces.com/problemset/problem/2226/D" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>