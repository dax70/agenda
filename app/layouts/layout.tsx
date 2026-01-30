import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SidebarContent, ToggleSidebarButton } from "../components/side-bar";
import { navigation, teams } from "../data/navigation";
import { cn } from "../lib/utils";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <>
      <div>
        <ModalOverlay
          isOpen={sidebarOpen}
          onOpenChange={setSidebarOpen}
          isDismissable
          className="fixed inset-0 z-50 bg-gray-900/80 transition-opacity duration-300 ease-linear entering:opacity-0 exiting:opacity-0 lg:hidden"
        >
          <div className="fixed inset-0 flex p-3">
            <Modal className="flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out entering:-translate-x-full exiting:-translate-x-full">
              <Dialog className="flex flex-1 outline-none">
                <SidebarContent
                  className="rounded-2xl bg-gray-100/80 ring-1 ring-black/5 inset-ring inset-ring-white/50 dark:bg-gray-950/80 dark:ring-white/10 dark:inset-ring-white/10"
                  navigation={navigation}
                  teams={teams}
                  onNavigate={() => setSidebarOpen(false)}
                  onClose={() => setSidebarOpen(false)}
                />
              </Dialog>
            </Modal>
          </div>
        </ModalOverlay>

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
          className={cn(
            "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-78 lg:flex-col lg:p-3",
            "transition-transform duration-300 ease-in-out",
            !sidebarVisible && "lg:-translate-x-full",
          )}
        >
          <SidebarContent
            className="rounded-2xl bg-gray-100/80 ring-1 ring-black/5 inset-ring inset-ring-white/50 dark:bg-gray-950/80 dark:ring-white/10 dark:inset-ring-white/10"
            navigation={navigation}
            teams={teams}
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
          className={cn(
            "sm:pl-14 transition-[padding-left] duration-300 ease-in-out",
            sidebarVisible ? "lg:pl-75" : "lg:pl-0",
          )}
        >
          <Outlet context={{ sidebarVisible }} />
        </main>
      </div>
    </>
  );
}
