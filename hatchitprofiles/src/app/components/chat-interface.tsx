"use client"

import { useState } from "react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { ScrollPanel } from "primereact/scrollpanel"
import { useChat } from "@ai-sdk/react"

export default function ChatInterface({ userId }: { userId: number }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${userId}`,
  })

  return (
    <Card className="flex flex-col h-full">
      <div className="card-header">
        <h2>Ask me anything</h2>
      </div>
      <div className="card-body flex-1 overflow-hidden">
        <ScrollPanel style={{ width: "100%", height: "100%" }} className="pr-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <p className="font-semibold">{message.role === "user" ? "You" : "Assistant"}:</p>
              <p>{message.content}</p>
            </div>
          ))}
        </ScrollPanel>
      </div>
      <div className="card-footer">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <InputText
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about career, experiences, or insights..."
            className="flex-1"
          />
          <Button type="submit" label="Send" />
        </form>
      </div>
    </Card>
  )
}
