import { UsersIcon } from "@heroicons/react/24/outline";

export default function Team() {
	return (
		<div>
			<div className="flex items-center gap-x-3">
				<UsersIcon className="size-8 text-indigo-600 dark:text-indigo-400" />
				<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Team
				</h1>
			</div>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
				Manage your team members and their roles.
			</p>
		</div>
	);
}
