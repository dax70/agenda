import { useOutletContext } from "react-router";
import { cn } from "~/lib/utils";

export function PageContainer({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	const { sidebarVisible } = useOutletContext<{ sidebarVisible: boolean }>();

	return (
		<div
			className={cn(
				"py-10 px-4 sm:px-6 lg:px-8 transition-[padding-left] duration-300 ease-in-out",
				!sidebarVisible && "lg:pl-16",
				className,
			)}
		>
			{children}
		</div>
	);
}
