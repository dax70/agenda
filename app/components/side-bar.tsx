import { NavLink } from "react-router";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
];

const teams = [
  { id: 1, name: "Heroicons", href: "/teams/heroicons", initial: "H" },
  { id: 2, name: "Tailwind Labs", href: "/teams/tailwind-labs", initial: "T" },
  { id: 3, name: "Workcation", href: "/teams/workcation", initial: "W" },
];

export function ToggleSidebarButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-xl bg-white/50 p-2.5 shadow-lg backdrop-blur-xl transition-colors hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70",
        className,
      )}
    >
      <span className="sr-only">Toggle sidebar</span>
      <ViewColumnsIcon
        aria-hidden="true"
        className="size-5 text-gray-600 dark:text-gray-300"
      />
    </button>
  );
}

export function SidebarContent({
  className,
  onNavigate,
  onToggle,
}: {
  className?: string;
  onNavigate?: () => void;
  onToggle?: () => void;
}) {
  return (
    <div
      className={classNames(
        "flex grow flex-col gap-y-5 overflow-y-auto px-6 pt-4 shadow-xl backdrop-blur-xl [background-image:linear-gradient(to_top,_rgb(99_102_241_/_0.04),_transparent_70%)] dark:[background-image:linear-gradient(to_top,_rgb(129_140_248_/_0.06),_transparent_70%)]",
        className,
      )}
    >
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div className="flex items-start">
              <ul role="list" className="-mx-2 flex-1 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              isActive
                                ? "text-indigo-600 dark:text-white"
                                : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white",
                              "size-6 shrink-0",
                            )}
                          />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {onToggle && (
                <ToggleSidebarButton
                  onClick={onToggle}
                  className="-mr-2 shrink-0"
                />
              )}
            </div>
          </li>
          <li>
            <div className="text-xs/6 font-semibold text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <NavLink
                    to={team.href}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={classNames(
                            isActive
                              ? "border-indigo-600 text-indigo-600 dark:border-white/20 dark:text-white"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600 dark:border-white/10 dark:group-hover:border-white/20 dark:group-hover:text-white",
                            "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium dark:bg-white/5",
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <NavLink
              to="/profile"
              onClick={onNavigate}
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
