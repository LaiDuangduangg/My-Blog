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