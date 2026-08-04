---
title: Longest Path (1.0)
published: 2026-08-04
category: 算法竞赛
tags: [C++, DAGDP]
---

以下是截图中可见内容的纯 Markdown 源码：


# 题目描述

给你一个有向图 $G$，它有 $N$ 个顶点和 $M$ 条边。顶点编号为 $1,2,\ldots,N$。

对于每个 $i$（$1 \le i \le M$），第 $i$ 条有向边从顶点 $x_i$ 指向顶点 $y_i$。

$G$ **不包含有向环**。

请找出 $G$ 中最长有向路径的长度。这里路径的长度指路径中包含的边数。

# 约束条件

- 输入中的所有数值均为整数。
- $2 \le N \le 10^5$
- $1 \le M \le 10^5$
- $1 \le x_i,y_i \le N$
- 所有的 $(x_i,y_i)$ 对均不相同。
- $G$ 不包含有向环。

# 输入格式

输入从标准输入读取，格式如下：

```text
N M
x_1 y_1
x_2 y_2
...
x_M y_M
```

# 输出格式

输出 $G$ 中最长有向路径的长度。

# 样例 1

## 输入

```text
4 5
1 2
1 3
3 2
2 4
3 4
```

## 输出

```text
3
```

下图中红色的有向路径是最长的：
![操作示意图](/images/2adca39b369dec378b617a685ee2ac40.png)


# 样例 2

## 输入

```text
6 3
2 3
4 5
5 6
```

## 输出

```text
2
```

下图中红色的有向路径是最长的：
![操作示意图](/images/5aec78129290068254c97e7d193aba6c.png)


# 样例 3

## 输入

```text
5 8
5 3
2 3
2 4
5 2
5 1
1 4
4 3
1 3
```

## 输出

```text
3
```

下图中红色的有向路径是最长路径之一：
![操作示意图](/images/272c698fa05490fc7054dc6f02bcb7de.png)

## 代码如下:
```cpp

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
  <a href="https://vjudge.net/problem/AtCoder-dp_g#author=translator:1281309:zh" target="_blank" class="problem-link">
    🚀 题目传送门
  </a>
</div>