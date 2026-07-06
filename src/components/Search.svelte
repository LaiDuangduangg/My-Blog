<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { url } from "@utils/url-utils.ts";
import { onMount, tick } from "svelte";
import type { SearchResult } from "@/global";

type QuickAction = {
	title: string;
	description: string;
	href: string;
	icon: string;
};

let commandOpen = false;
let commandKeyword = "";
let commandInput: HTMLInputElement;
let result: SearchResult[] = [];
let isSearching = false;
let pagefindLoaded = false;
let initialized = false;
let searchToken = 0;

const quickActions: QuickAction[] = [
	{
		title: "首页",
		description: "回到最新笔记流",
		href: url("/"),
		icon: "material-symbols:home-outline-rounded",
	},
	{
		title: "知识目录",
		description: "查看分类树和知识点",
		href: url("/catalog/"),
		icon: "material-symbols:account-tree-outline-rounded",
	},
	{
		title: "文章归档",
		description: "按时间浏览全部笔记",
		href: url("/archive/"),
		icon: "material-symbols:inventory-2-outline-rounded",
	},
	{
		title: "关于我",
		description: "查看个人介绍",
		href: url("/about/"),
		icon: "material-symbols:person-outline-rounded",
	},
];

const fakeResult: SearchResult[] = [
	{
		url: url("/posts/数论分块20/"),
		meta: {
			title: "数论分块 2.0",
		},
		excerpt: "开发模式下的示例搜索结果，用于预览命令面板效果。",
	},
	{
		url: url("/catalog/"),
		meta: {
			title: "知识点目录",
		},
		excerpt: "正式构建后会使用 Pagefind 搜索真实文章内容。",
	},
];

async function openCommand() {
	commandOpen = true;
	await tick();
	commandInput?.focus();
}

function closeCommand() {
	commandOpen = false;
	commandKeyword = "";
	result = [];
}

function togglePanel() {
	if (commandOpen) {
		closeCommand();
		return;
	}
	openCommand();
}

function toggleTheme() {
	const isDark = document.documentElement.classList.toggle("dark");
	try {
		localStorage.setItem("theme", isDark ? "dark" : "light");
	} catch (_) {}
	closeCommand();
}

function triggerMatrix() {
	closeCommand();
	setTimeout(() => {
		document.dispatchEvent(new CustomEvent("cockpit-matrix"));
	}, 120);
}

function handleGlobalKeydown(event: KeyboardEvent) {
	const isCommandKey = event.ctrlKey || event.metaKey;
	if (isCommandKey && event.key.toLowerCase() === "k") {
		event.preventDefault();
		openCommand();
		return;
	}

	if (event.key === "Escape" && commandOpen) {
		closeCommand();
	}
}

function filterDevResults(keyword: string) {
	const normalized = keyword.trim().toLowerCase();
	if (!normalized) return [];

	const matched = fakeResult.filter((item) => {
		return (
			item.meta.title.toLowerCase().includes(normalized) ||
			item.excerpt.toLowerCase().includes(normalized)
		);
	});

	return matched.length > 0 ? matched : fakeResult;
}

async function search(keyword: string): Promise<void> {
	const currentToken = ++searchToken;
	const normalized = keyword.trim();

	if (!normalized) {
		result = [];
		isSearching = false;
		return;
	}

	if (!initialized) {
		return;
	}

	isSearching = true;

	try {
		let searchResults: SearchResult[] = [];

		if (import.meta.env.PROD && pagefindLoaded && window.pagefind) {
			const response = await window.pagefind.search(normalized);
			searchResults = await Promise.all(
				response.results.map((item) => item.data()),
			);
		} else if (import.meta.env.DEV) {
			searchResults = filterDevResults(normalized);
		} else {
			searchResults = [];
		}

		if (currentToken === searchToken) {
			result = searchResults;
		}
	} catch (error) {
		console.error("Search error:", error);
		if (currentToken === searchToken) {
			result = [];
		}
	} finally {
		if (currentToken === searchToken) {
			isSearching = false;
		}
	}
}

onMount(() => {
	const initializeSearch = () => {
		initialized = true;
		pagefindLoaded =
			typeof window !== "undefined" &&
			!!window.pagefind &&
			typeof window.pagefind.search === "function";
		if (commandKeyword) search(commandKeyword);
	};

	document.addEventListener("keydown", handleGlobalKeydown);
	document.addEventListener("open-command-palette", openCommand);

	if (import.meta.env.DEV) {
		initializeSearch();
	} else {
		document.addEventListener("pagefindready", initializeSearch);
		document.addEventListener("pagefindloaderror", initializeSearch);

		setTimeout(() => {
			if (!initialized) initializeSearch();
		}, 2000);
	}

	return () => {
		document.removeEventListener("keydown", handleGlobalKeydown);
		document.removeEventListener("open-command-palette", openCommand);
		document.removeEventListener("pagefindready", initializeSearch);
		document.removeEventListener("pagefindloaderror", initializeSearch);
	};
});

$: if (initialized && commandOpen) {
	search(commandKeyword);
}
</script>

<button
	type="button"
	id="search-bar"
	on:click={openCommand}
	aria-label={i18n(I18nKey.search)}
	class="hidden lg:flex command-trigger transition-all items-center h-11 mr-2 rounded-lg"
>
	<Icon icon="material-symbols:manage-search-rounded" class="text-[1.25rem]" />
	<span>搜索文章...</span>
</button>

<button
	on:click={togglePanel}
	aria-label="Search Panel"
	id="search-switch"
	class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
>
	<Icon icon="material-symbols:manage-search-rounded" class="text-[1.25rem]"></Icon>
</button>

{#if commandOpen}
	<div class="command-backdrop" role="presentation" on:click={closeCommand}>
		<div
			class="command-panel"
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			on:click|stopPropagation
		>
			<div class="command-input-row">
				<Icon icon="material-symbols:search-rounded" class="command-input-icon" />
				<input
					bind:this={commandInput}
					bind:value={commandKeyword}
					placeholder="搜索文章，或者跳转页面..."
					aria-label={i18n(I18nKey.search)}
				/>
				<button type="button" class="command-close" on:click={closeCommand} aria-label="Close">
					<Icon icon="material-symbols:close-rounded" />
				</button>
			</div>

			<div class="command-body">
				<section>
					<div class="command-label">快速跳转</div>
					<div class="quick-grid">
						{#each quickActions as item}
							<a href={item.href} class="quick-action" on:click={closeCommand}>
								<Icon icon={item.icon} />
								<div>
									<strong>{item.title}</strong>
									<span>{item.description}</span>
								</div>
							</a>
						{/each}
					</div>
				</section>

				<section>
					<div class="command-label">命令</div>
					<div class="quick-grid">
						<button type="button" class="quick-action command-action" on:click={toggleTheme}>
							<Icon icon="material-symbols:dark-mode-outline-rounded" />
							<div>
								<strong>切换 日 / 夜</strong>
								<span>亮色 ↔ 座舱暗色</span>
							</div>
						</button>
						<button type="button" class="quick-action command-action" on:click={triggerMatrix}>
							<Icon icon="material-symbols:water-drop-outline-rounded" />
							<div>
								<strong>代码雨</strong>
								<span>来一阵 Matrix ✨</span>
							</div>
						</button>
					</div>
				</section>

				<section>
					<div class="command-label">搜索结果</div>
					{#if isSearching}
						<div class="command-empty">正在搜索...</div>
					{:else if commandKeyword.trim() && result.length === 0}
						<div class="command-empty">暂时没有匹配结果</div>
					{:else if !commandKeyword.trim()}
						<div class="command-empty">输入关键词后会显示文章结果</div>
					{:else}
						<div class="result-list">
							{#each result as item}
								<a href={item.url} class="command-result" on:click={closeCommand}>
									<div>
										<strong>{item.meta.title}</strong>
										<span>{@html item.excerpt}</span>
									</div>
									<Icon icon="material-symbols:chevron-right-rounded" />
								</a>
							{/each}
						</div>
					{/if}
				</section>

				<div class="command-foot">
					<span><kbd>⌘</kbd><kbd>K</kbd> 命令面板</span>
					<span><kbd>/</kbd> 搜索</span>
					<span><kbd>t</kbd> 切换主题</span>
					<span><kbd>?</kbd> 全部快捷键</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.command-trigger {
		gap: 0.55rem;
		border: 1px solid transparent;
		background: rgba(0, 0, 0, 0.045);
		padding: 0 1rem;
		color: rgba(0, 0, 0, 0.38);
		font-size: 0.9rem;
		font-weight: 700;
		min-width: 10.5rem;
		justify-content: flex-start;
	}

	:global(.dark) .command-trigger {
		background: rgba(255, 255, 255, 0.07);
		color: rgba(255, 255, 255, 0.48);
	}

	.command-trigger:hover,
	.command-trigger:focus-visible {
		border-color: color-mix(in oklch, var(--primary) 28%, transparent);
		background: color-mix(in oklch, var(--primary) 10%, transparent);
		color: var(--primary);
		box-shadow: 0 10px 24px color-mix(in oklch, var(--primary) 12%, transparent);
		transform: translateY(-1px);
	}

	.command-backdrop {
		position: fixed;
		inset: 0;
		z-index: 120;
		display: grid;
		place-items: start center;
		padding: 6.5rem 1rem 1rem;
		background: rgba(8, 10, 18, 0.46);
		backdrop-filter: blur(16px);
	}

	.command-panel {
		width: min(42rem, 100%);
		overflow: hidden;
		--command-text-90: rgba(0, 0, 0, 0.88);
		--command-text-75: rgba(0, 0, 0, 0.72);
		--command-text-50: rgba(0, 0, 0, 0.5);
		--command-text-30: rgba(0, 0, 0, 0.34);
		border: 1px solid color-mix(in oklch, var(--primary) 18%, rgba(255, 255, 255, 0.14));
		border-radius: 1rem;
		background: color-mix(in oklch, var(--card-bg) 88%, rgba(255, 255, 255, 0.86));
		box-shadow:
			0 28px 90px rgba(0, 0, 0, 0.28),
			inset 0 1px 0 rgba(255, 255, 255, 0.38);
	}

	:global(.dark) .command-panel {
		--command-text-90: rgba(255, 255, 255, 0.9);
		--command-text-75: rgba(255, 255, 255, 0.74);
		--command-text-50: rgba(255, 255, 255, 0.5);
		--command-text-30: rgba(255, 255, 255, 0.34);
		background: color-mix(in oklch, var(--card-bg) 92%, rgba(20, 22, 30, 0.92));
	}

	.command-input-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.75rem;
		padding: 0.9rem 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--primary) 10%, transparent);
	}

	.command-input-icon {
		color: var(--primary);
		font-size: 1.45rem;
	}

	.command-input-row input {
		width: 100%;
		background: transparent;
		color: var(--command-text-90);
		font-size: 1rem;
		font-weight: 700;
		outline: 0;
	}

	.command-close {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border-radius: 0.55rem;
		color: var(--command-text-50);
		transition:
			background-color 160ms ease,
			color 160ms ease;
	}

	.command-close:hover {
		background: var(--btn-plain-bg-hover);
		color: var(--primary);
	}

	.command-body {
		display: grid;
		gap: 1rem;
		max-height: min(64vh, 34rem);
		overflow-y: auto;
		padding: 1rem;
	}

	.command-label {
		margin-bottom: 0.55rem;
		color: var(--command-text-30);
		font-size: 0.78rem;
		font-weight: 900;
	}

	.quick-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.quick-action,
	.command-result {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border-radius: 0.78rem;
		padding: 0.75rem;
		color: var(--command-text-75);
		transition:
			background-color 160ms ease,
			transform 160ms ease,
			color 160ms ease;
	}

	.quick-action {
		background: color-mix(in oklch, var(--primary) 6%, transparent);
	}

	.command-action {
		width: 100%;
		border: 0;
		text-align: left;
		font: inherit;
		cursor: pointer;
	}

	.command-foot {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		padding-top: 0.35rem;
		color: var(--command-text-30);
		font-size: 0.76rem;
	}

	.command-foot kbd {
		display: inline-grid;
		place-items: center;
		min-width: 1.2rem;
		height: 1.2rem;
		padding: 0 0.3rem;
		margin-right: 0.15rem;
		border: 1px solid color-mix(in oklch, var(--primary) 22%, transparent);
		border-radius: 0.32rem;
		background: color-mix(in oklch, var(--primary) 8%, transparent);
		color: var(--command-text-75);
		font-size: 0.72rem;
	}

	.quick-action:hover,
	.command-result:hover {
		background: var(--btn-plain-bg-hover);
		color: var(--primary);
		transform: translateY(-1px);
	}

	.quick-action :global(svg) {
		flex: 0 0 auto;
		color: var(--primary);
		font-size: 1.35rem;
	}

	.quick-action div,
	.command-result div {
		display: grid;
		min-width: 0;
		gap: 0.15rem;
	}

	.quick-action strong,
	.command-result strong {
		color: var(--command-text-90);
		font-size: 0.92rem;
	}

	.quick-action span,
	.command-result span,
	.command-empty {
		color: var(--command-text-50);
		font-size: 0.82rem;
	}

	.result-list {
		display: grid;
		gap: 0.35rem;
	}

	.command-result {
		justify-content: space-between;
		background: transparent;
	}

	.command-result :global(mark) {
		background: transparent;
		color: var(--primary);
		font-weight: 900;
	}

	.command-result > :global(svg) {
		flex: 0 0 auto;
		font-size: 1.35rem;
	}

	.command-empty {
		border-radius: 0.75rem;
		background: color-mix(in oklch, var(--primary) 5%, transparent);
		padding: 0.8rem;
	}

	@media (max-width: 640px) {
		.command-backdrop {
			padding-top: 5rem;
		}

		.quick-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.command-trigger,
		.quick-action,
		.command-result,
		.command-close {
			transition: none;
		}

		.command-trigger:hover,
		.quick-action:hover,
		.command-result:hover {
			transform: none;
		}
	}
</style>
