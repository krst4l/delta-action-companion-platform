import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '~/lib/types';

interface PaymentRequest {
  orderId: string;
  amount: number;
  paymentMethod: 'alipay' | 'wechat' | 'bank_card' | 'balance';
  description?: string;
}

interface PaymentResponse {
  paymentId: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  paymentUrl?: string;
  qrCode?: string;
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { orderId, amount, paymentMethod, description } = body;

    // TODO: 实现真实的支付逻辑
    // 1. 验证订单信息
    // 2. 检查用户余额（如果是余额支付）
    // 3. 调用第三方支付接口
    // 4. 创建支付记录
    // 5. 返回支付链接或二维码

    const paymentId = `PAY${Date.now()}`;

    let paymentUrl: string | undefined;
    let qrCode: string | undefined;

    // 根据支付方式生成相应的支付信息
    switch (paymentMethod) {
      case 'alipay':
        paymentUrl = `https://openapi.alipay.com/gateway.do?orderId=${paymentId}`;
        break;
      case 'wechat':
        qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=weixin://wxpay/bizpayurl?pr=${paymentId}`;
        break;
      case 'bank_card':
        paymentUrl = `https://payment.example.com/card?orderId=${paymentId}`;
        break;
      case 'balance':
        // 余额支付直接处理
        break;
    }

    const payment: PaymentResponse = {
      paymentId,
      orderId,
      amount,
      status: 'pending',
      paymentUrl,
      qrCode,
      createdAt: new Date().toISOString(),
    };

    const response: ApiResponse<{ payment: PaymentResponse }> = {
      success: true,
      data: { payment },
      message: '支付请求创建成功',
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '创建支付失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: '缺少支付ID',
        },
        { status: 400 }
      );
    }

    // TODO: 从数据库查询支付状态
    const mockPayment: PaymentResponse = {
      paymentId,
      orderId: 'DT20240101001',
      amount: 60,
      status: 'success',
      createdAt: new Date().toISOString(),
    };

    const response: ApiResponse<{ payment: PaymentResponse }> = {
      success: true,
      data: { payment: mockPayment },
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '查询支付状态失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
