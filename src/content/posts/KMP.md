---
title: KMP (1.0)
published: 2026-08-13
category: 算法竞赛
tags: [C++, KMP]
---

## Description

给出两个字符串 $s_1$ 和 $s_2$，若 $s_1$ 的区间 $[l,r]$ 子串与 $s_2$ 完全相同，则称 $s_2$ 在 $s_1$ 中出现了，其出现位置为 $l$。

现在请你求出 $s_2$ 在 $s_1$ 中所有出现的位置。

定义一个字符串 $s$ 的 border 为 $s$ 的一个非 $s$ 本身的子串 $t$，满足 $t$ 既是 $s$ 的前缀，又是 $s$ 的后缀。

对于 $s_2$，你还需要求出其每个前缀 $s'$ 的最长 border $t'$ 的长度。

## Input

第一行一个字符串，即为 $s_1$。

第二行一个字符串，即为 $s_2$。

## Output

首先输出若干行，每行一个整数，按从小到大的顺序输出 $s_2$ 在 $s_1$ 中出现的位置。

最后一行输出 $|s_2|$ 个整数，第 $i$ 个整数表示 $s_2$ 的长度为 $i$ 的前缀的最长 border 长度。

## Sample 1

### Input

```text
ABABABC
ABA
```

### Output

```text
1
3
0 0 1
```

## Hint

### 样例 1 解释

对于 $s_2$ 长度为 $3$ 的前缀 `ABA`，字符 `A` 既是其后缀也是其前缀，并且是最长的，因此最长 border 长度为 $1$。

## 数据规模与约定

本题采用多测试点捆绑测试，共有 $4$ 个子任务。

- Subtask 0（30 points）：$|s_1| \le 15,\ |s_2| \le 5$。
- Subtask 1（40 points）：$|s_1| \le 10^4,\ |s_2| \le 10^2$。
- Subtask 2（30 points）：无特殊约定。
- Subtask 3（0 points）：Hack。

对于全部测试点，保证 $1 \le |s_1|, |s_2| \le 10^6$，且 $s_1$、$s_2$ 中均只包含大写英文字母。


## 代码如下:
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 2e6 + 10;
int Next[MAXN];

void fill_in_nex (const string &s2) {
    int m = s2.length();
    Next[0] = -1;
    Next[1] = 0;

    int i = 2, pre = 0;
    while (i <= m) {
        if (s2[i - 1] == s2[pre]) {
            Next[i] = pre + 1;
            i ++;
            pre ++;
        } else if (pre > 0) {
            pre = Next[pre];
        } else {
            Next[i] = 0;
            i ++;
        }
    }
}

void kmp (const string &s1, const string &s2) {
    int n = s1.length();
    int m = s2.length();

    int x = 0;
    int y = 0;
    
    vector <int> ans;
    while (x < n && y < m) {
        if (s1[x] == s2[y]) {
            x ++;
            y ++;
        } else if (y == 0) {
            x ++;
        } else {
            y = Next[y];
        }

        if (y == m) {
            cout << x - y + 1 << '\n';
            y = Next[y];
        }
    }
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    string s1, s2;
    cin >> s1 >> s2;

    fill_in_nex (s2);
    kmp (s1, s2);
    for (int i = 1; i <= s2.length(); i ++) {
        cout << Next[i] << " ";
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
  <a href="https://www.nowcoder.com/practice/7f8a8553ddbf4eaab749ec988726702b" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>