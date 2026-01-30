import { Fragment, useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import {
	Button,
	Menu,
	MenuItem,
	MenuTrigger,
	Popover,
} from "react-aria-components";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { cn } from "~/lib/utils";

const currentWeek = [
	{
		date: "2022-01-10",
		dayShort: "M",
		dayName: "Mon",
		dayNumber: 10,
		isToday: false,
	},
	{
		date: "2022-01-11",
		dayShort: "T",
		dayName: "Tue",
		dayNumber: 11,
		isToday: false,
	},
	{
		date: "2022-01-12",
		dayShort: "W",
		dayName: "Wed",
		dayNumber: 12,
		isToday: true,
	},
	{
		date: "2022-01-13",
		dayShort: "T",
		dayName: "Thu",
		dayNumber: 13,
		isToday: false,
	},
	{
		date: "2022-01-14",
		dayShort: "F",
		dayName: "Fri",
		dayNumber: 14,
		isToday: false,
	},
	{
		date: "2022-01-15",
		dayShort: "S",
		dayName: "Sat",
		dayNumber: 15,
		isToday: false,
	},
	{
		date: "2022-01-16",
		dayShort: "S",
		dayName: "Sun",
		dayNumber: 16,
		isToday: false,
	},
];

const events = [
	{
		id: 1,
		name: "Breakfast",
		time: "6:00 AM",
		datetime: "2022-01-12T06:00",
		colStart: 3,
		gridRow: "74 / span 12",
		color: "blue" as const,
		hiddenOnMobile: false,
	},
	{
		id: 2,
		name: "Flight to Paris",
		time: "7:30 AM",
		datetime: "2022-01-12T07:30",
		colStart: 3,
		gridRow: "92 / span 30",
		color: "pink" as const,
		hiddenOnMobile: false,
	},
	{
		id: 3,
		name: "Meeting with design team at Disney",
		time: "10:00 AM",
		datetime: "2022-01-15T10:00",
		colStart: 6,
		gridRow: "122 / span 24",
		color: "gray" as const,
		hiddenOnMobile: true,
	},
];

const eventColors = {
	blue: {
		bg: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/15 dark:hover:bg-blue-600/20",
		title: "text-blue-700 dark:text-blue-300",
		time: "text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300",
	},
	pink: {
		bg: "bg-pink-50 hover:bg-pink-100 dark:bg-pink-600/15 dark:hover:bg-pink-600/20",
		title: "text-pink-700 dark:text-pink-300",
		time: "text-pink-500 group-hover:text-pink-700 dark:text-pink-400 dark:group-hover:text-pink-300",
	},
	gray: {
		bg: "bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15",
		title: "text-gray-700 dark:text-gray-300",
		time: "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300",
	},
};

const hours = [
	"12AM",
	"1AM",
	"2AM",
	"3AM",
	"4AM",
	"5AM",
	"6AM",
	"7AM",
	"8AM",
	"9AM",
	"10AM",
	"11AM",
	"12PM",
	"1PM",
	"2PM",
	"3PM",
	"4PM",
	"5PM",
	"6PM",
	"7PM",
	"8PM",
	"9PM",
	"10PM",
	"11PM",
];

const viewOptions = [
	{ id: "day", label: "Day view" },
	{ id: "week", label: "Week view" },
	{ id: "month", label: "Month view" },
	{ id: "year", label: "Year view" },
];

const menuItemClassName = cn(
	"block w-full cursor-default px-4 py-2 text-sm text-left",
	"text-gray-700 dark:text-gray-300",
	"focused:bg-gray-100 focused:text-gray-900 focused:outline-hidden",
	"dark:focused:bg-white/5 dark:focused:text-white",
);

export default function Calendar() {
	const { sidebarVisible } = useOutletContext<{ sidebarVisible: boolean }>();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			// Scroll to ~6AM on mount
			const rowHeight = containerRef.current.scrollHeight / 48;
			containerRef.current.scrollTop = rowHeight * 12; // 6AM = row 12 (each hour = 2 rows)
		}
	}, []);

	return (
		<div className="flex h-screen flex-col bg-white dark:bg-gray-900">
			{/* Header */}
			<header
				className={cn(
					"flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4 transition-[padding-left] duration-300 ease-in-out dark:border-white/15 dark:bg-gray-800/50",
					!sidebarVisible && "lg:pl-16",
				)}
			>
				<h1 className="text-base font-semibold text-gray-900 dark:text-white">
					<time dateTime="2022-01">January 2022</time>
				</h1>
				<div className="flex items-center">
					{/* Prev / Today / Next navigation */}
					<div className="relative flex items-center rounded-md bg-white shadow-xs outline -outline-offset-1 outline-gray-300 md:items-stretch dark:bg-white/10 dark:shadow-none dark:outline-white/5">
						<button
							type="button"
							className="flex h-9 w-12 items-center justify-center rounded-l-md pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50 dark:hover:text-white dark:md:hover:bg-white/10"
						>
							<span className="sr-only">Previous week</span>
							<ChevronLeftIcon aria-hidden="true" className="size-5" />
						</button>
						<button
							type="button"
							className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block dark:text-white dark:hover:bg-white/10"
						>
							Today
						</button>
						<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden dark:bg-white/10" />
						<button
							type="button"
							className="flex h-9 w-12 items-center justify-center rounded-r-md pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50 dark:hover:text-white dark:md:hover:bg-white/10"
						>
							<span className="sr-only">Next week</span>
							<ChevronRightIcon aria-hidden="true" className="size-5" />
						</button>
					</div>

					{/* Desktop: view selector + add event */}
					<div className="hidden md:ml-4 md:flex md:items-center">
						<MenuTrigger>
							<Button className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20">
								Week view
								<ChevronDownIcon
									aria-hidden="true"
									className="-mr-1 size-5 text-gray-400 dark:text-gray-500"
								/>
							</Button>
							<Popover
								placement="bottom end"
								className={cn(
									"w-36 overflow-hidden rounded-md bg-white shadow-lg outline-1 outline-black/5",
									"dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10",
									"transition-opacity duration-100 ease-out",
									"entering:opacity-0 exiting:opacity-0",
								)}
							>
								<Menu className="py-1 outline-none">
									{viewOptions.map((option) => (
										<MenuItem
											key={option.id}
											id={option.id}
											className={menuItemClassName}
										>
											{option.label}
										</MenuItem>
									))}
								</Menu>
							</Popover>
						</MenuTrigger>
						<div className="ml-6 h-6 w-px bg-gray-300 dark:bg-white/10" />
						<button
							type="button"
							className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
						>
							Add event
						</button>
					</div>

					{/* Mobile: ellipsis menu */}
					<div className="ml-6 md:hidden">
						<MenuTrigger>
							<Button className="relative flex items-center rounded-full text-gray-400 outline-offset-8 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
								<span className="absolute -inset-2" />
								<span className="sr-only">Open menu</span>
								<EllipsisHorizontalIcon
									aria-hidden="true"
									className="size-5"
								/>
							</Button>
							<Popover
								placement="bottom end"
								className={cn(
									"w-36 overflow-hidden rounded-md bg-white shadow-lg outline-1 outline-black/5",
									"dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10",
									"transition-opacity duration-100 ease-out",
									"entering:opacity-0 exiting:opacity-0",
								)}
							>
								<Menu className="divide-y divide-gray-100 outline-none dark:divide-white/10">
									<div className="py-1">
										<MenuItem
											id="create-event"
											className={menuItemClassName}
										>
											Create event
										</MenuItem>
									</div>
									<div className="py-1">
										<MenuItem
											id="go-today"
											className={menuItemClassName}
										>
											Go to today
										</MenuItem>
									</div>
									<div className="py-1">
										{viewOptions.map((option) => (
											<MenuItem
												key={option.id}
												id={option.id}
												className={menuItemClassName}
											>
												{option.label}
											</MenuItem>
										))}
									</div>
								</Menu>
							</Popover>
						</MenuTrigger>
					</div>
				</div>
			</header>

			{/* Calendar body */}
			<div
				ref={containerRef}
				className="isolate flex flex-auto flex-col overflow-auto bg-white dark:bg-gray-900"
			>
				<div
					style={{ width: "165%" }}
					className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
				>
					{/* Day column headers */}
					<div className="sticky top-0 z-30 flex-none bg-white shadow-sm ring-1 ring-black/5 sm:pr-8 dark:bg-gray-900 dark:shadow-none dark:ring-white/20">
						{/* Mobile day headers */}
						<div className="grid grid-cols-7 text-sm/6 text-gray-500 sm:hidden dark:text-gray-400">
							{currentWeek.map((day) => (
								<button
									key={day.date}
									type="button"
									className="flex flex-col items-center pt-2 pb-3"
								>
									{day.dayShort}{" "}
									<span
										className={cn(
											"mt-1 flex size-8 items-center justify-center font-semibold",
											day.isToday
												? "rounded-full bg-indigo-600 text-white dark:bg-indigo-500"
												: "text-gray-900 dark:text-white",
										)}
									>
										{day.dayNumber}
									</span>
								</button>
							))}
						</div>

						{/* Desktop day headers */}
						<div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm/6 text-gray-500 sm:grid dark:divide-white/10 dark:border-white/10 dark:text-gray-400">
							<div className="col-end-1 w-14" />
							{currentWeek.map((day) => (
								<div
									key={day.date}
									className="flex items-center justify-center py-3"
								>
									{day.isToday ? (
										<span className="flex items-baseline">
											{day.dayName}{" "}
											<span className="ml-1.5 flex size-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white dark:bg-indigo-500">
												{day.dayNumber}
											</span>
										</span>
									) : (
										<span>
											{day.dayName}{" "}
											<span className="items-center justify-center font-semibold text-gray-900 dark:text-white">
												{day.dayNumber}
											</span>
										</span>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Time grid */}
					<div className="flex flex-auto">
						<div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-white/5" />
						<div className="grid flex-auto grid-cols-1 grid-rows-1">
							{/* Horizontal lines */}
							<div
								style={{
									gridTemplateRows:
										"repeat(48, minmax(3.5rem, 1fr))",
								}}
								className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-white/5"
							>
								<div className="row-end-1 h-7" />
								{hours.map((hour) => (
									<Fragment key={hour}>
										<div>
											<div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400 dark:text-gray-500">
												{hour}
											</div>
										</div>
										<div />
									</Fragment>
								))}
							</div>

							{/* Vertical lines */}
							<div className="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7 dark:divide-white/5">
								<div className="col-start-1 row-span-full" />
								<div className="col-start-2 row-span-full" />
								<div className="col-start-3 row-span-full" />
								<div className="col-start-4 row-span-full" />
								<div className="col-start-5 row-span-full" />
								<div className="col-start-6 row-span-full" />
								<div className="col-start-7 row-span-full" />
								<div className="col-start-8 row-span-full w-8" />
							</div>

							{/* Events */}
							<ol
								style={{
									gridTemplateRows:
										"1.75rem repeat(288, minmax(0, 1fr)) auto",
								}}
								className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
							>
								{events.map((event) => {
									const colors = eventColors[event.color];
									return (
										<li
											key={event.id}
											style={{
												gridRow: event.gridRow,
												gridColumnStart: event.colStart,
											}}
											className={cn(
												"relative mt-px flex",
												"dark:before:pointer-events-none dark:before:absolute dark:before:inset-1 dark:before:z-0 dark:before:rounded-lg dark:before:bg-gray-900",
												event.hiddenOnMobile &&
													"hidden sm:flex",
											)}
										>
											<a
												href="#"
												className={cn(
													"group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs/5",
													colors.bg,
												)}
											>
												<p
													className={cn(
														"order-1 font-semibold",
														colors.title,
													)}
												>
													{event.name}
												</p>
												<p className={colors.time}>
													<time
														dateTime={
															event.datetime
														}
													>
														{event.time}
													</time>
												</p>
											</a>
										</li>
									);
								})}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
