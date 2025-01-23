"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { aiChat } from "../util/chat";
import { useSearchParams } from "next/navigation";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log
    if (input.trim() === "" || !userId) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };
    console.log(newMessage)
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      console.log('Sending AI chat request'); // Add logging
      const response = await aiChat({ _USER_ID: userId, _QUESTION: input });
      console.log('Received AI chat response:', response); // Add logging
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response.reply,
      };
      console.log(assistantMessage);
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error during AI chat:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center">Ask me anything</h2>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollPanel className="h-full w-full pr-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <p className="font-semibold">
                  {message.role === "user" ? "You" : "Assistant"}:
                </p>
                <p>{message.content}</p>
              </div>
            ))}
          </ScrollPanel>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <InputText
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about career, experiences, or insights..."
              className="flex-1"
              style={{ borderColor: '#FA7422', color: '#524d4d' }}
            />
            <Button type="submit" label="Send" className="p-button-outlined"  style={{ borderColor: '#FA7422', color: '#524d4d' }}/>
          </form>
        </div>
      </Card>
    </div>
  );
}