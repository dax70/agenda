import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SidebarContent, ToggleSidebarButton } from "../components/side-bar";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex p-3">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              <SidebarContent
                className="rounded-2xl bg-white/90 dark:bg-gray-900/90"
                onNavigate={() => setSidebarOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>

        {/* Floating toolbar — visible on tablet (sm–lg) always, on desktop only when sidebar is collapsed (sits behind sidebar at lower z-index) */}
        <div className="hidden sm:fixed sm:left-3 sm:top-5 sm:z-60 sm:block lg:z-40">
          <ToggleSidebarButton
            onClick={() => {
              if (window.matchMedia("(min-width: 1024px)").matches) {
                setSidebarVisible(!sidebarVisible);
              } else {
                setSidebarOpen(true);
              }
            }}
          />
        </div>

        {/* Static sidebar for desktop */}
        <div
          className={classNames(
            "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-78 lg:flex-col lg:p-3",
            "transition-transform duration-300 ease-in-out",
            !sidebarVisible && "lg:-translate-x-full",
          )}
        >
          <SidebarContent
            className="rounded-2xl bg-white/50 dark:bg-gray-900/50"
            onToggle={() => setSidebarVisible(!sidebarVisible)}
          />
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white/50 px-4 py-4 shadow-xs backdrop-blur-xl sm:hidden dark:bg-gray-900/50">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
            Dashboard
          </div>
          <NavLink to="/profile">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
            />
          </NavLink>
        </div>

        <main
          className={classNames(
            "py-10 sm:pl-14 transition-[padding-left] duration-300 ease-in-out",
            sidebarVisible ? "lg:pl-78" : "lg:pl-14",
          )}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
