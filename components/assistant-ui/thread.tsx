"use client";

import { 
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";

export function Thread({ runtime }: { runtime: any }) {
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadPrimitive.Root className="flex h-full flex-col bg-white">
        {/* Welcome Screen */}
        <ThreadPrimitive.Empty>
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-sky-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Start a study conversation
              </h2>
              <p className="text-gray-600">
                Ask for help with Communications, Boundaries, and Relationships.
              </p>
            </div>

            {/* Suggestion Buttons */}
            <div className="flex w-full max-w-2xl flex-wrap justify-center gap-3">
              <ThreadPrimitive.Suggestion
                prompt="Give me a short recap of today's lesson and create 3 quiz questions to check my understanding."
                method="replace"
                autoSend
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 cursor-pointer"
              >
                Lesson recap + quiz
              </ThreadPrimitive.Suggestion>

              <ThreadPrimitive.Suggestion
                prompt="Start a role-play to practice today's topic. Keep your replies short and ask me to respond."
                method="replace"
                autoSend
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 cursor-pointer"
              >
                Role-play practice
              </ThreadPrimitive.Suggestion>

              <ThreadPrimitive.Suggestion
                prompt="Explain the most confusing idea from this lesson with one example, then quiz me on it."
                method="replace"
                autoSend
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 cursor-pointer"
              >
                Explain a tricky point
              </ThreadPrimitive.Suggestion>
            </div>
          </div>
        </ThreadPrimitive.Empty>

        {/* Messages */}
        <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 pt-8">
          <ThreadPrimitive.Messages
            components={{
              UserMessage: () => (
                <div className="mb-4 flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-blue-500 px-4 py-3 text-white">
                    <MessagePrimitive.Content />
                  </div>
                </div>
              ),
              AssistantMessage: () => (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3 text-gray-800">
                    <MessagePrimitive.Content />
                  </div>
                </div>
              ),
            }}
          />
        </ThreadPrimitive.Viewport>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <ComposerPrimitive.Root className="flex gap-2">
            <ComposerPrimitive.Input
              placeholder="Ask a question or describe what you'd like to practice..."
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ComposerPrimitive.Send className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
              Send
            </ComposerPrimitive.Send>
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}