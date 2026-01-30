import { PageContainer } from "~/components/page-container";

export default function Profile() {
	return (
		<PageContainer>
			<div className="flex items-center gap-x-4">
				<img
					alt=""
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					className="size-12 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
				/>
				<div>
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
						Tom Cook
					</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						tom@example.com
					</p>
				</div>
			</div>
		</PageContainer>
	);
}
