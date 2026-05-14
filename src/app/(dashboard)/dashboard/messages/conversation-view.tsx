"use client"

import { useActionState, useRef, useEffect } from "react"
import { sendReply } from "./actions"

type Message = {
  id: string
  senderId: string
  content: string
  createdAt: Date
}

export function ConversationView({
  messages,
  currentUserId,
  otherUserId,
  productId,
  otherUserName,
  productName,
}: {
  messages: Message[]
  currentUserId: string
  otherUserId: string
  productId: string | null
  otherUserName: string
  productName: string | null
}) {
  const [state, action, pending] = useActionState(sendReply, undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-carton border bg-card">
      {/* Header */}
      <div className="border-b p-4">
        <p className="font-heading font-bold">{otherUserName}</p>
        {productName && (
          <p className="text-xs text-muted-foreground">بخصوص: {productName}</p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">لا توجد رسائل بعد. ابدأ المحادثة الآن</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId === currentUserId
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    isMine
                      ? "rounded-br-md bg-brand-yellow/20 text-brand-dark"
                      : "rounded-bl-md bg-brand-red/10 text-brand-dark"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleTimeString("ar-DZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        {state?.error && (
          <p className="mb-2 text-sm text-red-500">{state.error}</p>
        )}
        <form ref={formRef} action={action} className="flex gap-3">
          <input type="hidden" name="receiverId" value={otherUserId} />
          {productId && <input type="hidden" name="productId" value={productId} />}
          <input
            name="content"
            placeholder="اكتب رسالتك..."
            required
            className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f] disabled:opacity-50"
          >
            {pending ? "..." : "إرسال"}
          </button>
        </form>
      </div>
    </div>
  )
}
