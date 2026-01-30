import { PageContainer } from "~/components/page-container";

export default function TeamsHeroicons() {
	return (
		<PageContainer>
			<div className="flex items-center gap-x-3">
				<span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
					H
				</span>
				<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Heroicons
				</h1>
			</div>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
				Heroicons team workspace.
			</p>
		</PageContainer>
	);
}
