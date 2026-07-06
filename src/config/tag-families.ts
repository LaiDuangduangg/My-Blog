// ============================================================
// Tag families — turns a flat list of tags into a knowledge system.
//
// Every tag is classified into ONE family, used for:
//   - grouping on the Tag Hub (skill tree)
//   - color-coding pills / the tag cloud / the co-occurrence graph
//
// This mapping is meant to be edited by hand as your tags grow.
// Classification order: `overrides` win first, then `keywords`
// (checked top-to-bottom), else the `other` fallback.
// ============================================================

export type TagFamily = {
	key: string;
	name: string;
	/** OKLCH hue (0-360) used for this family's neon color */
	hue: number;
	/** iconify icon name */
	icon: string;
	/** substrings (case-insensitive) that classify a tag into this family */
	keywords: string[];
	/** short blurb shown on the family section */
	blurb?: string;
};

// Families are evaluated in THIS ORDER — put more specific ones first.
export const TAG_FAMILIES: TagFamily[] = [
	{
		key: "lang",
		name: "语言",
		hue: 215,
		icon: "material-symbols:code-rounded",
		keywords: ["c++", "cpp", "c语言", "python", "java"],
		blurb: "题解使用的编程语言",
	},
	{
		key: "dp",
		name: "动态规划",
		hue: 35,
		icon: "material-symbols:grid-view-outline-rounded",
		keywords: [
			"dp",
			"动态规划",
			"背包",
			"值域",
			"树形dp",
			"树上背包",
			"子序列计数",
			"状态",
			"记忆化",
		],
		blurb: "状态、转移与最优子结构",
	},
	{
		key: "ds",
		name: "数据结构",
		hue: 195,
		icon: "material-symbols:data-table-rounded",
		keywords: [
			"数据结构",
			"树状数组",
			"线段树",
			"链表",
			"优先队列",
			"堆",
			"单调",
			"栈",
			"队列",
			"并查集",
			"第k大",
			"后缀最大",
			"延迟",
			"懒",
			"平衡树",
		],
		blurb: "维护信息的利器",
	},
	{
		key: "graph",
		name: "图论",
		hue: 150,
		icon: "material-symbols:schema-rounded",
		keywords: [
			"图论",
			"最短路",
			"dijkstra",
			"spfa",
			"floyd",
			"lca",
			"倍增",
			"生成树",
			"拓扑",
			"网络流",
			"二分图",
			"tarjan",
		],
		blurb: "点、边与遍历",
	},
	{
		key: "string",
		name: "字符串",
		hue: 330,
		icon: "material-symbols:match-word-rounded",
		keywords: [
			"字符串",
			"自动机",
			"kmp",
			"trie",
			"后缀数组",
			"后缀自动机",
			"子序列自动机",
			"哈希",
			"manacher",
		],
		blurb: "文本匹配与结构",
	},
	{
		key: "math",
		name: "数论 · 数学",
		hue: 280,
		icon: "material-symbols:functions-rounded",
		keywords: [
			"数论",
			"数学",
			"快速幂",
			"组合",
			"插板",
			"隔板",
			"容斥",
			"斥容",
			"逆元",
			"质数",
			"素数",
			"gcd",
			"取模",
			"进制",
			"高精度",
			"回文",
			"前缀和",
			"差分",
			"异或",
			"公式",
			"分块",
		],
		blurb: "推导、公式与整除",
	},
	{
		key: "construct",
		name: "构造",
		hue: 95,
		icon: "material-symbols:build-outline-rounded",
		keywords: ["构造", "可达性", "区间约束", "方案"],
		blurb: "造出一个满足条件的解",
	},
	{
		key: "greedy",
		name: "贪心",
		hue: 55,
		icon: "material-symbols:trending-up-rounded",
		keywords: ["贪心", "反悔"],
		blurb: "每步取当前最优",
	},
	{
		key: "search",
		name: "搜索 · 枚举",
		hue: 12,
		icon: "material-symbols:travel-explore-rounded",
		keywords: ["搜索", "bfs", "dfs", "枚举", "暴力", "回溯", "剪枝", "二分"],
		blurb: "遍历解空间",
	},
];

export const FAMILY_OTHER: TagFamily = {
	key: "other",
	name: "其他",
	hue: 220,
	icon: "material-symbols:tag-rounded",
	keywords: [],
	blurb: "尚未归类的标签",
};

// Precise overrides for tricky tags (exact trimmed tag name -> family key).
export const TAG_OVERRIDES: Record<string, string> = {
	普通BFS: "search",
	二维后缀最大值: "ds",
	树状数组板子: "ds",
	双向链表: "ds",
	进制转化: "math",
	进制转换: "math",
	回文数: "math",
	高精度: "math",
	异或前缀和: "math",
	前缀和: "math",
	数论分块: "math",
	值域dp: "dp",
	"动态规划,值域dp": "dp",
	子序列自动机: "string",
	"子序列计数DP": "dp",
	一维选址DP: "dp",
	区间约束构造: "construct",
	可达性构造: "construct",
};

// Optional per-tag descriptions shown on the tag's own page.
export const TAG_DESCRIPTIONS: Record<string, string> = {
	数论分块: "对 ⌊n/i⌋ 只有 O(√n) 种取值进行分块求和，是数论求和类问题的常用加速技巧。",
	快速幂: "用二进制拆分指数，把幂运算降到 O(log n)，常配合取模。",
	Dijkstra: "非负权单源最短路，堆优化后复杂度 O(m log n)。",
	LCA: "最近公共祖先，倍增 / 欧拉序 + ST 表 / 树剖等实现。",
	树形DP: "在树结构上做动态规划，通常自底向上合并子树信息。",
	异或前缀和: "利用前缀异或的可减性，O(1) 求任意区间异或值。",
	前缀和: "预处理累加数组，把区间求和降到 O(1)。",
	双向链表: "支持 O(1) 前后插入删除，常用于维护动态序列关系。",
};

function normalize(tag: string): string {
	return tag.trim().toLowerCase();
}

/** Classify a tag into its family. */
export function classifyTag(tag: string): TagFamily {
	const trimmed = tag.trim();

	// 1) exact override
	const overrideKey = TAG_OVERRIDES[trimmed];
	if (overrideKey) {
		const fam = TAG_FAMILIES.find((f) => f.key === overrideKey);
		if (fam) return fam;
	}

	// 2) keyword match (families are ordered specific -> general)
	const norm = normalize(trimmed);
	for (const family of TAG_FAMILIES) {
		for (const kw of family.keywords) {
			if (norm.includes(kw.toLowerCase())) return family;
		}
	}

	// 3) fallback
	return FAMILY_OTHER;
}

export function getFamilyByKey(key: string): TagFamily {
	return TAG_FAMILIES.find((f) => f.key === key) ?? FAMILY_OTHER;
}
