import { ChartPieIcon } from "@heroicons/react/24/outline";
import { PageContainer } from "~/components/page-container";

export default function Reports() {
	return (
		<PageContainer>
			<div className="flex items-center gap-x-3">
				<ChartPieIcon className="size-8 text-indigo-600 dark:text-indigo-400" />
				<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Reports
				</h1>
			</div>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
				View analytics and generated reports.
			</p>
		</PageContainer>
	);
}
