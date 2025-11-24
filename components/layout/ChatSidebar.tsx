"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, MessageCircle, Medal, User, Settings, BookOpen } from "lucide-react";

export function ChatSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Learn", page: "/learn" },
    { icon: MessageCircle, label: "Chat", page: "/chat" },
    { icon: Medal, label: "Medals", page: "/medals" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-blue-400 to-sky-400 shadow-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-600">BookAction</span>
            <span className="text-xs text-gray-500">Level Up 🚀</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <p className="mb-2 px-3 text-xs font-semibold text-gray-500">MENU</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.page)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.page
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Stats Card */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 p-4">
          <p className="mb-3 text-xs font-semibold text-gray-500">STATS</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🔥 Streak</span>
              <span className="font-bold text-orange-500">7 days</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🏆 Total XP</span>
              <span className="font-bold text-yellow-600">1,250</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div 
                className="h-2 rounded-full bg-green-500" 
                style={{ width: "75%" }}
              />
            </div>
            <p className="text-center text-xs text-gray-500">
              75% to next level
            </p>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <button
          onClick={() => router.push("/profile")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === "/profile"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <User className="h-5 w-5" />
          Profile
        </button>
        <button
          onClick={() => router.push("/settings")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Settings className="h-5 w-5" />
          Settings
        </button>
      </div>
    </aside>
  );
}