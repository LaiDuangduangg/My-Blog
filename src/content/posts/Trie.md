---
title: Trie (1.0)
published: 2026-08-16
category: 算法竞赛
tags: [C++, Trie]
---


## 题目描述

字典树又称为前缀树或 Trie 树，是处理字符串时常用的数据结构。

假设组成所有单词的字符仅为 `'a'` 到 `'z'`，请实现字典树，并支持以下四种操作：

- `void insert(String word)`：添加单词 `word`，同一个单词可以重复添加。
- `void delete(String word)`：删除单词 `word`。如果 `word` 被添加过多次，则只删除一次。
- `boolean search(String word)`：查询 `word` 是否完整地出现在字典树中，仅作为其他单词的前缀不算。
- `int prefixNumber(String pre)`：返回以字符串 `pre` 为前缀的单词数量。

现在给定 $m$ 次操作，每次操作会给出一个整数 `op` 和一个字符串 `word`：

- 当 `op = 1` 时，向字典树中添加 `word`。
- 当 `op = 2` 时，从字典树中删除一次 `word`。
- 当 `op = 3` 时，查询 `word` 是否完整地存在于字典树中。
- 当 `op = 4` 时，查询以 `word` 为前缀的单词数量。

数据保证不会删除不存在的单词。

## 输入描述

第一行包含一个整数 $m$（$1 \le m \le 10^5$），表示操作次数。

接下来 $m$ 行，每行包含一个整数 `op` 和一个字符串 `word`，满足：

- $1 \le op \le 4$
- $1 \le |word| \le 20$
- `word` 仅包含小写英文字母

## 输出描述

对于每次操作：

- 如果 `op = 3`，当 `word` 存在于字典树中时输出 `YES`，否则输出 `NO`。
- 如果 `op = 4`，输出以 `word` 为前缀的单词数量。
- 如果 `op = 1` 或 `op = 2`，不输出任何内容。

## 示例

### 输入

```text
7
1 qwer
1 qwe
3 qwer
4 q
2 qwer
3 qwer
4 q
```

### 输出

```text
YES
2
NO
1
```

## 备注

要求时间复杂度和空间复杂度均为：

$$
O\left(m \times \max(|word|)\right)
$$