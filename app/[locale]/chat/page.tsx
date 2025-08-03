'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Loading } from '~/components/ui/loading';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Search, Filter, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function ChatPage() {
  const t = useTranslations();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // 模拟聊天室数据
        const mockChatRooms: ChatRoom[] = [
          {
            id: '1',
            name: '专业陪玩师 - 小明',
            avatar: '/avatars/gamer1.jpg',
            lastMessage: '好的，我们开始游戏吧！',
            lastMessageTime: '14:30',
            unreadCount: 2,
            isOnline: true,
          },
          {
            id: '2',
            name: '高级陪玩师 - 小红',
            avatar: '/avatars/gamer2.jpg',
            lastMessage: '您的订单已确认',
            lastMessageTime: '12:15',
            unreadCount: 0,
            isOnline: false,
          },
          {
            id: '3',
            name: '金牌陪玩师 - 小刚',
            avatar: '/avatars/gamer3.jpg',
            lastMessage: '需要什么帮助吗？',
            lastMessageTime: '昨天',
            unreadCount: 1,
            isOnline: true,
          },
        ];

        // 模拟消息数据
        const mockMessages: Message[] = [
          {
            id: '1',
            senderId: '1',
            senderName: '专业陪玩师 - 小明',
            senderAvatar: '/avatars/gamer1.jpg',
            content: '您好！我是您的陪玩师小明，很高兴为您服务！',
            timestamp: '14:25',
            type: 'text',
            isRead: true,
          },
          {
            id: '2',
            senderId: 'user',
            senderName: '我',
            senderAvatar: '/avatars/user1.jpg',
            content: '你好！我想学习一些基础战术',
            timestamp: '14:26',
            type: 'text',
            isRead: true,
          },
          {
            id: '3',
            senderId: '1',
            senderName: '专业陪玩师 - 小明',
            senderAvatar: '/avatars/gamer1.jpg',
            content: '没问题！我可以教您各种战术，包括团队配合、个人技巧等',
            timestamp: '14:27',
            type: 'text',
            isRead: true,
          },
          {
            id: '4',
            senderId: '1',
            senderName: '专业陪玩师 - 小明',
            senderAvatar: '/avatars/gamer1.jpg',
            content: '好的，我们开始游戏吧！',
            timestamp: '14:30',
            type: 'text',
            isRead: false,
          },
        ];

        setChatRooms(mockChatRooms);
        setMessages(mockMessages);
        setSelectedChat('1');
      } catch (error) {
        console.error('获取聊天数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: '我',
      senderAvatar: '/avatars/user1.jpg',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: 'text',
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // 模拟对方回复
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat,
        senderName: chatRooms.find((room) => room.id === selectedChat)?.name || '',
        senderAvatar: chatRooms.find((room) => room.id === selectedChat)?.avatar || '',
        content: '收到您的消息，正在处理中...',
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'text',
        isRead: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <Loading text="加载聊天信息..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 聊天室列表 */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>聊天列表</CardTitle>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chatRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`hover:bg-muted/50 flex cursor-pointer items-center gap-3 p-4 transition-colors ${selectedChat === room.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedChat(room.id)}>
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={room.avatar} alt={room.name} />
                        <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {room.isOnline && <div className="border-background absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 bg-green-500" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="truncate font-medium">{room.name}</h3>
                        <span className="text-muted-foreground text-xs">{room.lastMessageTime}</span>
                      </div>
                      <p className="text-muted-foreground truncate text-sm">{room.lastMessage}</p>
                    </div>
                    {room.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {room.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 聊天窗口 */}
          <Card className="flex flex-col lg:col-span-2">
            {selectedChat ? (
              <>
                {/* 聊天头部 */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chatRooms.find((room) => room.id === selectedChat)?.avatar} alt="avatar" />
                        <AvatarFallback>{chatRooms.find((room) => room.id === selectedChat)?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{chatRooms.find((room) => room.id === selectedChat)?.name}</h3>
                        <p className="text-muted-foreground text-sm">{chatRooms.find((room) => room.id === selectedChat)?.isOnline ? '在线' : '离线'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* 消息列表 */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.senderId === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[70%] ${message.senderId === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* 消息输入 */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        placeholder="输入消息..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="border-0 focus-visible:ring-0"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <MessageCircle className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">选择聊天</h3>
                  <p className="text-muted-foreground">从左侧选择一个聊天开始对话</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
