import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '~/lib/types';

interface ChatMessage {
  id: string;
  roomId: string;
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
  participants: string[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    const userId = searchParams.get('userId');

    if (roomId) {
      // 获取特定聊天室的消息
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          roomId,
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
          roomId,
          senderId: userId || 'user',
          senderName: '我',
          senderAvatar: '/avatars/user1.jpg',
          content: '你好！我想学习一些基础战术',
          timestamp: '14:26',
          type: 'text',
          isRead: true,
        },
        {
          id: '3',
          roomId,
          senderId: '1',
          senderName: '专业陪玩师 - 小明',
          senderAvatar: '/avatars/gamer1.jpg',
          content: '没问题！我可以教您各种战术，包括团队配合、个人技巧等',
          timestamp: '14:27',
          type: 'text',
          isRead: true,
        },
      ];

      const response: ApiResponse<{ messages: ChatMessage[] }> = {
        success: true,
        data: { messages: mockMessages },
      };

      return NextResponse.json(response);
    } else {
      // 获取用户的聊天室列表
      const mockChatRooms: ChatRoom[] = [
        {
          id: '1',
          name: '专业陪玩师 - 小明',
          avatar: '/avatars/gamer1.jpg',
          lastMessage: '好的，我们开始游戏吧！',
          lastMessageTime: '14:30',
          unreadCount: 2,
          isOnline: true,
          participants: ['user', '1'],
        },
        {
          id: '2',
          name: '高级陪玩师 - 小红',
          avatar: '/avatars/gamer2.jpg',
          lastMessage: '您的订单已确认',
          lastMessageTime: '12:15',
          unreadCount: 0,
          isOnline: false,
          participants: ['user', '2'],
        },
        {
          id: '3',
          name: '金牌陪玩师 - 小刚',
          avatar: '/avatars/gamer3.jpg',
          lastMessage: '需要什么帮助吗？',
          lastMessageTime: '昨天',
          unreadCount: 1,
          isOnline: true,
          participants: ['user', '3'],
        },
      ];

      const response: ApiResponse<{ rooms: ChatRoom[] }> = {
        success: true,
        data: { rooms: mockChatRooms },
      };

      return NextResponse.json(response);
    }
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '获取聊天数据失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, senderId, content, type = 'text' } = body;

    // TODO: 实现真实的消息发送逻辑
    // 1. 验证用户权限
    // 2. 保存消息到数据库
    // 3. 发送实时通知
    // 4. 更新聊天室最后消息

    const message: ChatMessage = {
      id: Date.now().toString(),
      roomId,
      senderId,
      senderName: '我',
      senderAvatar: '/avatars/user1.jpg',
      content,
      timestamp: new Date().toISOString(),
      type,
      isRead: false,
    };

    const response: ApiResponse<{ message: ChatMessage }> = {
      success: true,
      data: { message },
      message: '消息发送成功',
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '发送消息失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
