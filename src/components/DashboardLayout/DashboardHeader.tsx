"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Refs to detect outside clicks properly
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if clicked OUTSIDE the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSettings = useCallback(() => {
    router.push("/settings");
    setDropdownOpen(false);
  }, [router]);

  const handleProfile = useCallback(() => {
    router.push("/profile");
    setDropdownOpen(false);
  }, [router]);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  {
                    title: "AI request completed",
                    time: "2 min ago",
                    icon: "🤖",
                  },
                  {
                    title: "New feature available",
                    time: "1 hour ago",
                    icon: "✨",
                  },
                  {
                    title: "Usage limit at 80%",
                    time: "3 hours ago",
                    icon: "⚠️",
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-xl">{notif.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100 text-center">
                <button className="text-sm text-purple-600 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => {
              setDropdownOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {/* Avatar */}
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            )}

            {/* Name — hidden on mobile */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
              {/* User Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt="Profile"
                      width={42}
                      height={42}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                      {user?.firstName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={handleProfile}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  My Profile
                </button>

                <button
                  onClick={handleSettings}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </button>
              </div>

              {/* Sign Out */}
              <div className="p-2 border-t border-gray-100">
                <SignOutButton redirectUrl="/">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
