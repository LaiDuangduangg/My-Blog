---
title: Digit Circus(1.0)
published: 2026-07-16
category: 算法竞赛
tags: [C++, 数位DP]
---

## 题目描述

请你计算满足以下三个条件中**恰好一个**的整数 `x` 的个数，范围是 `1 <= x <= N`，结果对 `998244353` 取模。

- `x` 是 `3` 的倍数。
- `x` 的十进制表示中包含数字 `3`。
- `x` 的十进制表示中恰好用了三种不同的数字。

注意，整数的十进制表示不允许有多余的前导 `0`。

## 约束条件

- `N` 是一个整数。
- `1 <= N < 10^500`

## 输入格式

输入从标准输入读取，格式如下：

    N

## 输出格式

输出答案。

## 样例 1

**输入**

    45

**输出**

    19

在从 `1` 到 `45` 的整数中，有 `19` 个数满足题目中恰好一个条件，具体如下：

- 仅满足第一个条件的整数有 `10` 个：`6, 9, 12, 15, 18, 21, 24, 27, 42, 45`。
- 仅满足第二个条件的整数有 `9` 个：`13, 23, 31, 32, 34, 35, 37, 38, 43`。
- 没有整数仅满足第三个条件。

## 样例 2

**输入**

    1013

**输出**

    424

以下是满足条件的整数示例：

- 仅满足第一个条件的整数有 `555` 和 `1011`。
- 仅满足第二个条件的整数有 `343` 和 `553`。
- 仅满足第三个条件的整数有 `1012` 和 `704`。

## 样例 3

**输入**

    2

**输出**

    0

没有满足条件的整数。

## 样例 4

**输入**

    314159265358979323846264338327950

**输出**

    658111391
    
---

## 解题思路

### 1. 为什么不能直接枚举？

首先，首先，`N` 的范围达到了 10^500。它不仅无法使用普通整数类型存储，也不可能从 \(1\) 枚举到 \(N\)：完整数字的数量可能达到 \(10^{500}\) 级别。

因此，不能暴力枚举每一个完整整数。

但是，一个十进制数的每一位都只有 `0~9` 十种选择，所以可以把 \(N\) 当作字符串，从高位到低位逐位构造数字。这正是数位 DP 的基本思路。

---

### 2. 改为一位一位枚举

我们从最高位开始，枚举当前位置填入哪个数字，并把当前前缀中“以后仍然有用的信息”记录下来。

不同的前缀，只要它们保留的信息完全相同，那么后面能够填写的数字、状态变化方式以及最终条件的真假也完全相同。因此，这些前缀可以合并到同一个 DP 状态中，只记录方案数。

---

### 3. 从题目的三个条件推导状态

#### 条件一：\(x\) 是 \(3\) 的倍数

一个数能否被 \(3\) 整除，只取决于它的各位数字之和能否被 \(3\) 整除。因此不需要保存完整的数位和，只需要记录：

\[
sum\bmod 3
\]

后面提到的 `sum`，都表示当前真实数字部分的数位和模 \(3\) 的结果，取值只有 `0、1、2`。

#### 条件二：十进制表示中包含数字 `3`

#### 条件三：恰好使用三种不同数字

条件二和条件三都可以使用一个十位二进制数 `mask` 记录。

规定 `mask` 的第 \(d\) 位表示数字 \(d\) 是否出现过：

- 第 \(d\) 位为 `1`：数字 \(d\) 已经出现；
- 第 \(d\) 位为 `0`：数字 \(d\) 还没有出现。

例如，一个 `mask` 可以写成：

```text
0010010101
```

其中所有为 `1` 的位置，就代表对应的数字已经在当前前缀中出现过。

如果当前枚举到数字 `d`，则更新方式为：

```cpp
mask | (1 << d)
```

于是：

- 判断是否包含数字 `3`：检查 `mask` 的第 `3` 位；
- 判断使用了多少种数字：统计 `mask` 中 `1` 的个数。

因此，与题目三个条件直接相关的信息只有：

```text
sum：当前数位和 mod 3
mask：已经使用过哪些数字
```

---

### 4. 先观察最朴素的逐位过程

暂时只看位置这一维。对于每一个位置，都枚举这一位可以填入的数字，并把旧状态的方案数转移到下一位置的新状态中。

也就是说：

1. 枚举当前处理到的位置；
2. 枚举当前状态；
3. 枚举当前位填入的数字；
4. 更新数位和、`mask` 以及其他限制状态；
5. 把当前状态的方案数累加到下一层。

最后，所有位都填写完成后，再判断三个条件中是否恰好只有一个成立。

不过，在真正定义 DP 之前，还要解决两个特殊问题：前导零和上界限制。

---

### 5. 前导零问题：为什么需要 `is_started`

为了统一处理位数少于 \(N\) 的整数，我们会在它们前面补零，使所有数都拥有与 \(N\) 相同的长度。

例如：

```text
000...0001
```

它本质上仍然是整数 `1`。前面补出来的这些 `0` 不属于整数 `1` 的真实十进制表示，所以不能把数字 `0` 记录进 `mask`。

同理，把 `28` 补成：

```text
0028
```

前面的两个 `0` 都只是补位，不能算作使用过数字 `0`。

但下面这个数不同：

```text
210
```

这里末尾的 `0` 是真实十进制表示的一部分，必须加入 `mask`。

因此需要增加状态：

```text
is_started
```

它表示当前数字是否已经出现过第一个非零数字：

- `is_started = 0`：目前填入的全是前导零，数字还没有真正开始；
- `is_started = 1`：数字已经开始，之后出现的 `0` 也是真实数位。

当 `is_started = 0` 且当前位填入 `0` 时，状态仍然保持：

```text
is_started = 0
sum = 0
mask = 0
```

最后，如果所有位处理完成后 `is_started` 仍为 `0`，这个状态对应整数 `0`。题目只统计 \(1\) 到 \(N\)，因此不能把它加入答案。

---

### 6. 上界问题：为什么需要 `tight`

每个位置并不一定都能自由枚举到 `9`。

假设：

```text
N = 2849531287
```

如果当前构造出的前缀一直与 \(N\) 的前缀完全相同，例如已经构造出：

```text
2849[?][?][?][?][?][?]
```

那么下一位对应 \(N\) 中的数字 `5`，所以当前位置只能枚举：

```text
[0, 5]
```

不能填写 `6~9`，否则构造出的数字一定会超过 \(N\)。

但是，如果前面某一位已经填写得比 \(N\) 小，那么后面无论怎么填写都不会超过 \(N\)，此时每一位都可以自由枚举 `0~9`。

因此还要增加状态：

```text
tight
```

- `tight = 1`：当前整个前缀仍与 \(N\) 的对应前缀相同，当前位置受到上界限制；
- `tight = 0`：此前已经有一位小于 \(N\)，后面可以自由填写 `0~9`。

若当前位置填入数字 `d`，则下一状态为：

```cpp
ntight = tight && (d == N[pos] - '0');
```

只有原来还受到限制，并且当前位仍然与 \(N\) 的对应位相同，下一位才继续受到限制。

---

### 7. 正式定义 DP 状态

定义：

```text
dp[pos][tight][is_started][sum][mask]
```

表示：

> 已经填完前 `pos` 位，并且当前状态分别为 `tight`、`is_started`、`sum`、`mask` 的前缀方案数。

其中：

- `pos`：已经处理了多少位，下一位为 `N[pos]`；
- `tight`：当前前缀是否仍与 \(N\) 的前缀相同；
- `is_started`：数字是否已经出现过第一个有效数位；
- `sum`：当前真实数字部分的数位和模 \(3\)；
- `mask`：当前真实数字部分使用过哪些数字。

只要两个前缀的这五项状态完全相同，它们后续的可选数字、状态变化方式和最终判断方式就完全相同，因此可以合并计数。

---

### 8. 初始化与状态转移

初始时还没有填写任何一位：

```cpp
dp[0][1][0][0][0] = 1;
```

这五个下标依次表示：

1. `pos = 0`：从第 `0` 位开始；
2. `tight = 1`：开局第一位肯定不能枚举到顶，因此状态设置为卡死。
3. `is_started = 0`：还没有出现有效数字；
4. `sum = 0`：当前数位和模 \(3\) 为 `0`；
5. `mask = 0`：还没有使用任何数字。

按位置从左到右进行状态转移：

因为`pos`有前后依赖关系，因此最外层一定是`pos`开始枚举.
至于内层`tight`先或者是`start`先都无所谓,因为同一层之间这两个变量没有依赖关系
```cpp
for (int pos = 0; pos < len; ++pos)
```

对于每个旧状态，设其方案数为：

```cpp
ways = dp[pos][tight][is_started][sum][mask];
```

如果 `ways = 0`，说明没有任何前缀处于该状态，可以直接跳过。

当前位置可以填写的最大数字为：

```cpp
limit = tight ? N[pos] - '0' : 9;
```

然后枚举：

```cpp
for (int d = 0; d <= limit; ++d)
```

#### 情况一：当前的 `0` 仍然是前导零

如果：

```cpp
!is_started && d == 0
```

那么这个 `0` 不属于真实数字，不能加入 `mask`：

```cpp
dp[pos + 1][ntight][0][0][0] += ways;
```

#### 情况二：当前位属于真实数字

否则，当前位需要加入数位和与数字集合：

```cpp
nsum  = (sum + d) % 3;
nmask = mask | (1 << d);
```

转移为：

```cpp
dp[pos + 1][ntight][1][nsum][nmask] += ways;
```
当然此处转移其实也可以说让pos继承pos - 1的内容,但是实际上,`sum % 3`这种数值类容易继承，而`mask`就不好继承了，因为我们只知道当前
数字的`mark`少掉一位,但是`mark`本身不记录数量，只记录有没有，因此从`pos`到`pos + 1`转移是更优的写法

因为多个旧状态可能到达同一个新状态，所以这里必须使用 `+=`，并且每次累加都要对 \(998244353\) 取模。


---

### 9. 统计最终答案

当所有位都处理完成后，只需要查看最后一层：

```text
dp[len][tight][1][sum][mask]
```

这里固定 `is_started = 1`，从而排除整数 `0`。

对每个终态判断：

```cpp
bool A = (sum == 0);
bool B = ((mask >> 3) & 1);
bool C = (__builtin_popcount(mask) == 3);
```

若：

```cpp
A + B + C == 1
```

说明三个条件中恰好只有一个成立，把该状态的方案数加入答案。

虽然题目表面上有容斥的味道，但 DP 的终态已经同时保存了判断三个条件所需的全部信息，因此直接判断三个布尔值之和是否为 `1` 即可，不必分别计算七个集合。

---

## 正确性说明

DP 从最高位到最低位枚举每一位的所有合法选择，因此每一个 `[0,N]` 内的补零表示都会被构造一次，且不会构造出超过 \(N\) 的数字。

状态中的 `sum`、`mask` 分别完整保留了判断三个条件所需的信息；`is_started` 保证前导零不影响真实十进制表示；`tight` 保证构造出的数字不超过 \(N\)。

因此，所有位处理完成后，终态可以准确判断该数字满足哪些条件。只统计 `is_started = 1` 且恰好有一个条件成立的状态，就能得到题目要求的答案。

---

## 复杂度分析

设 \(L=|N|\)。

- `pos` 有 \(L\) 种；
- `tight` 有 \(2\) 种；
- `is_started` 有 \(2\) 种；
- `sum` 有 \(3\) 种；
- `mask` 有 \(2^{10}=1024\) 种；
- 每个状态枚举当前数字 `0~9`。

因此时间复杂度为：

时间复杂度：`O(L × 2 × 2 × 3 × 2^10 × 10)`

使用非滚动数组时，空间复杂度为：

空间复杂度：`O(L × 2 × 2 × 3 × 2^10)`

当 `L ≤ 500` 时可以通过。

---

## dfs写法代码:
```cpp
#include <bits/stdc++.h>
using namespace std;

string s;
int L;
constexpr int MAXL = 505;
constexpr int MASKS = 1 << 10;
constexpr int MOD = 998244353;

int dp[MAXL][2][2][4][MASKS];
//dp[pos][tight][ifstart][sum][masks];

int countt (int mask) {
    int res = 0;
    while (mask != 0) {
        if (mask & 1) {
            res ++;
        }
        mask >>= 1;
    }
    return res;
}

long long dfs (int pos, int tight, int start, int sum, int masks) {
    if (pos == L) {
        if (!start)  return 0;

        int A = (sum % 3 == 0) ? 1 : 0 ;
        int B = (masks >> 3 & 1) ? 1 : 0;
        int C = countt (masks) == 3 ? 1 : 0;

        if (A + B + C == 1) {
            return 1;
        }
        return 0;
    }

    // 记忆化检查
    long long res = dp[pos][tight][start][sum][masks];
    if (res != -1) {
        return res;
    }

    res = 0;
    int limit = (tight == 0) ? 9 : s[pos] - '0'; // 如果tight为0,也就是前面有不同的数，那本位置无限制
    for (int i = 0; i <= limit; i ++) {
        bool now_ti = (i == s[pos] - '0'); // 当前位置填限制条件下的最大
        int nex_tight = tight && now_ti;

        int nex_sum = (sum + i) % 3;
        int nex_start = start || (i != 0);
        int nex_masks;

        if (nex_start == 0) {// 仍然是无效0
            nex_masks = 0;
            res += dfs (pos + 1, nex_tight, nex_start, nex_sum, nex_masks);
        }
        else {//
            nex_masks = masks | (1 << i);
            res += dfs(pos + 1, nex_tight, nex_start, nex_sum, nex_masks);
        }
        res = res % MOD;
    }
    dp[pos][tight][start][sum][masks] = res;
    return res;
}

int main ()
{
    ios::sync_with_stdio (false);
    cin.tie (0);

    cin >> s;
    L = s.size ();

    memset (dp, -1, sizeof (dp));
    //dfs表示从当前pos开始往后填到结束，一共有多少种方案
    long long ans = dfs (0, 1, 0, 0, 0); // tight为1
    cout << ans << '\n';
    return 0;
}
```

## dp写法代码:
```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int MOD = 998244353;
constexpr int MAXL = 505;
constexpr int MASKS = 1 << 10;

// dp[pos][tight][ifstart][sum][masks]
int dp[MAXL][2][2][4][MASKS];

bool countt(int mask) {
    int cnt = 0;
    while (mask != 0) {
        if ((mask & 1) == 1) {
            cnt++;
        }
        mask >>= 1;
    }
    if (cnt == 3) return true;
    return false;
}

int main() {
    string s;
    cin >> s;

    int L = s.size();
    dp[0][1][0][0][0] = 1;
    // 由于pos后面的位依赖pos前面的位,因此外部循环是pos
    for (int pos = 0; pos < L; pos++) {
        int cur = s[pos] - '0';
        for (int tight = 0; tight < 2; tight++) {
            for (int start = 0; start < 2; start++) {
                for (int sum = 0; sum < 3; sum++) {
                    for (int mask = 0; mask < MASKS; mask++) {
                        int limit = (tight == 1) ? s[pos] - '0' : 9;
                        for (int j = 0; j <= limit; j++) {
                            if (dp[pos][tight][start][sum][mask] == 0) continue;
                            int nex_sum = (sum + j) % 3;
                            bool is_same = (j == s[pos] - '0');
                            int nex_tight = tight && is_same;  // 如果被卡死并且当前位置还是相同，那下个位置也被卡死
                            if (start == 0 && j == 0) {        // 没出现有效数字
                                dp[pos + 1][nex_tight][0][nex_sum][0] += dp[pos][tight][start][sum][mask];
                                dp[pos + 1][nex_tight][0][nex_sum][0] %= MOD;
                            } else {
                                int nex_mask = mask | (1 << j);
                                dp[pos + 1][nex_tight][1][nex_sum][nex_mask] += dp[pos][tight][start][sum][mask];
                                dp[pos + 1][nex_tight][1][nex_sum][nex_mask] %= MOD;
                            }
                        }
                    }
                }
            }
        }
    }
    long long ans = 0;
    for (int tight = 0; tight < 2; ++tight) {
        for (int sum = 0; sum < 3; ++sum) {
            for (int mask = 0; mask < MASKS; ++mask) {
                bool A = (sum == 0);
                bool B = ((mask >> 3) & 1);
                bool C = countt(mask);

                if (A + B + C == 1) {
                    ans = (ans + dp[L][tight][1][sum][mask]) % MOD;
                    ans = ans % MOD;
                }
            }
        }
    }
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
  <a href="https://vjudge.net/problem/AtCoder-abc465_e#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>