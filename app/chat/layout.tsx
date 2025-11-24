import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat - BookAction",
  description: "Practice with AI assistant",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}