// =============================================================
//  目录树配置
// -------------------------------------------------------------
//  这个文件是「目录」页面的唯一来源。以后维护目录只改这一个文件：
//
//  1. 加一个新的顶层分类（比如学了「网络流」）：
//     在下面 categoryTree 数组里加一个
//        { name: "网络流", icon: "...", knowledgePoints: [] }
//
//  2. 在某个分类下加一个新的知识点：
//     找到对应分类的 knowledgePoints 数组，加一个
//        { name: "知识点名", tags: ["对应的标签"] }
//     tags 写文章 frontmatter 里 tags 字段的值，
//     一个文章命中任一 tag 就会出现在这个知识点下面。
//
//  3. 知识点可以嵌套子知识点（任意层数），比如：
//        {
//          name: "计数 DP",
//          tags: ["计数DP"],
//          children: [
//            { name: "子序列计数 DP", tags: ["子序列计数DP"] },
//            { name: "区间计数 DP",   tags: ["区间计数DP"] },
//          ],
//        }
//     父节点会自动汇总所有子孙节点的题数。
//
//  4. 一个文章可以同时属于多个知识点（只要 tag 匹配就行）。
//
//  5. ignoreTags 里的 tag 不会触发「未分类」提醒
//     （比如 C++ 这种全文章都打的语言标签）。
//
//  没匹配到任何知识点的 tag 会自动汇总到目录页底部
//  「未归类标签」区域，提醒你以后是否要给它们安家。
//
//  icon 字段可选，使用 iconify 名称。常用图标：
//    material-symbols:hub-outline          (图论)
//    material-symbols:auto-graph           (DP)
//    material-symbols:account-tree-outline (数据结构)
//    material-symbols:abc                  (字符串)
//    material-symbols:calculate-outline    (数学/数论)
//    material-symbols:functions            (前缀和/数学公式)
//    material-symbols:search               (搜索)
//    material-symbols:swap-horiz           (二分)
//    material-symbols:dataset-outline      (组合数学)
//    material-symbols:more-horiz           (杂项)
// =============================================================

export interface KnowledgePoint {
	name: string;                  // 知识点显示名
	tags: string[];                // 命中任一 tag 就算这个知识点下的文章
	children?: KnowledgePoint[];   // 可选：再细分的子知识点，可无限嵌套
}

export interface TopCategory {
	name: string;                       // 顶层分类名（图论 / 数论 …）
	icon?: string;                      // 可选 iconify 图标
	knowledgePoints: KnowledgePoint[];  // 该分类下的知识点
}

export const categoryTree: TopCategory[] = [
	{
		name: "图论",
		icon: "material-symbols:hub-outline",
		knowledgePoints: [
			{ name: "树上问题", tags: ["LCA", "树形图"] },
			{ 
				name: "BFS",
				tags: ["BFS"],
				children: [
					{name : "01BFS", tags: ["01BFS"]},
					{name : "状态扩展BFS", tags: ["状态扩展BFS"]},
					{name : "普通BFS", tags : ["BFS"]},
				],
			},
			{ name: "Dijkstra", tags: ["Dijkstra"]},

		],
	},
	{
		name: "动态规划",
		icon: "material-symbols:auto-graph",
		knowledgePoints: [
			{ name: "值域 DP", tags: ["值域dp"] },
			{ name: "树形 DP", tags: ["树形DP", "树上背包"] },
			{ 	name: "线性 DP",
				tags: ["线性DP"],
				children: [
					{name: " 分段DP", tags: ["分段DP","一维选址DP"]},
				]
				
			},
			{
				name: "计数 DP",
				tags: ["计数DP"],
				children: [
					// 想在「计数 DP」里再开一个子展开列表，就这样写：
					{ name: "子序列计数 DP", tags: ["子序列计数DP"] },
					// 想再细分？直接在上面那行的 `}` 前面加 children: [...]，无限嵌套
				],
				
			},
			
		],
	},
	{
		name: "数据结构",
		icon: "material-symbols:account-tree-outline",
		knowledgePoints: [
			{ name: "延迟操作", tags: ["优先队列", "延迟更新", "懒"] },
			{ name: "双向链表", tags: ["双向链表"] },
			{name :"维护第k大", tags: ['维护第k大']},
		],
	},
	{
		name: "字符串",
		icon: "material-symbols:abc",
		knowledgePoints: [
			{ name: "子序列自动机", tags: ["子序列自动机", "字符串"] },
		],
	},
	{
		name: "数论",
		icon: "material-symbols:calculate-outline",
		knowledgePoints: [
			{ name: "快速幂", tags: ["快速幂"] },
			{ name: "公式变换 / 容斥", tags: ["公式变换", "斥容原理"] },
			{ name : "数论分块", tags: ["数论分块"]},

		],
	},
	{
		name: "前缀和与差分",
		icon: "material-symbols:functions",
		knowledgePoints: [
			{ name: "异或前缀和", tags: ["异或前缀和"] },
			{ name: "前缀和", tags: ["前缀和"] },
		],
	},
	{
		name: "搜索与暴力",
		icon: "material-symbols:search",
		knowledgePoints: [
			{ name: "暴力枚举", tags: ["暴力枚举"] },
		],
	},
	{
		name: "构造",
		icon: "material-symbols:construction",
		knowledgePoints: [
			{ name: "构造", tags: ["构造"] },
		],
	},
	{
		name: "二分",
		icon: "material-symbols:swap-horiz",
		knowledgePoints: [
			// 以后写到二分相关的题再补
		],
	},
	{
		name: "组合数学",
		icon: "material-symbols:dataset-outline",
		knowledgePoints: [
			// 以后写到组合数学相关的题再补
			{name : "隔板法/插板法", tags: ["隔板法", "插板法"]},
		],
	},
	{
		name: "杂项",
		icon: "material-symbols:more-horiz",
		knowledgePoints: [
			{ name: "回文数 / 进制 / 高精度", tags: ["回文数", "进制转化", "高精度"] },
		],
	},
];

// 不参与「未归类标签」提醒的 tag（全文章都会打的，比如语言标签）
export const ignoreTags: string[] = ["C++"];
