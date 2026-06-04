import { useState, useEffect, useRef } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

function formatTime(ts) {
  const d = new Date(ts * 1000)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPanel({ friend, myId, authHeaders, onClose }) {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const pollRef = useRef(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${friend.user_id}`, { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch {
      // network error — silently ignore
    }
  }

  useEffect(() => {
    fetchMessages()
    pollRef.current = setInterval(fetchMessages, 3000)
    return () => clearInterval(pollRef.current)
  }, [friend.user_id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const content = draft.trim()
    if (!content || sending) return
    setSending(true)
    setDraft('')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ receiver_id: friend.user_id, content }),
      })
      if (res.ok) {
        const msg = await res.json()
        setMessages(prev => [...prev, msg])
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{friend.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{friend.name}</p>
          <p className="text-xs text-gray-400">Friend</p>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400">
            <MessageCircle className="h-8 w-8 opacity-30" />
            <p className="text-xs">No messages yet. Say hi!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map(msg => {
              const isMine = msg.sender_id === myId
              return (
                <div key={msg.id} className={cn('flex gap-2', isMine ? 'justify-end' : 'justify-start')}>
                  {!isMine && (
                    <Avatar className="h-6 w-6 flex-shrink-0 mt-1">
                      <AvatarFallback className="text-[10px]">{friend.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[75%]">
                    <div className={cn('px-3 py-2 text-sm', isMine ? 'chat-bubble-mine' : 'chat-bubble-theirs')}>
                      {msg.content}
                    </div>
                    <p className={cn('text-[10px] text-gray-400 mt-0.5', isMine ? 'text-right' : 'text-left')}>
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 flex-shrink-0">
        <Input
          className="flex-1 text-sm"
          placeholder={`Message ${friend.name}…`}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
        />
        <Button size="icon" onClick={sendMessage} disabled={!draft.trim() || sending}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
