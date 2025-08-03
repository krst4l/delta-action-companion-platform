import { NextRequest, NextResponse } from 'next/server';
import { RegisterForm, ApiResponse, User } from '~/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: RegisterForm = await request.json();
    const { username, email, password, phone, agreeToTerms } = body;

    // TODO: 实现真实的注册逻辑
    // 1. 验证输入数据
    // 2. 检查用户是否已存在
    // 3. 加密密码
    // 4. 创建用户记录
    // 5. 发送验证邮件

    if (!agreeToTerms) {
      return NextResponse.json(
        {
          success: false,
          error: '请同意用户协议和隐私政策',
        },
        { status: 400 }
      );
    }

    // 临时模拟数据
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      phone,
      avatar: '/avatars/default.png',
      balance: 0,
      gender: 'unknown',
      isVerified: false,
      status: 'active',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<{ user: User }> = {
      success: true,
      data: { user },
      message: '注册成功，请验证邮箱',
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '注册失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
