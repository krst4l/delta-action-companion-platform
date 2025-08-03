import { NextRequest, NextResponse } from 'next/server';
import { LoginForm, ApiResponse, User } from '~/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: LoginForm = await request.json();
    const { email, password } = body;

    // TODO: 实现真实的登录逻辑
    // 1. 验证用户凭据
    // 2. 生成JWT token
    // 3. 设置cookie

    // 临时模拟数据
    const user: User = {
      id: '1',
      username: '测试用户',
      email: email,
      avatar: '/avatars/default.png',
      balance: 100.0,
      gender: 'unknown',
      isVerified: false,
      status: 'active',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<{ user: User; token: string }> = {
      success: true,
      data: {
        user,
        token: 'mock-jwt-token',
      },
      message: '登录成功',
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '登录失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
