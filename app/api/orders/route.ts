import { NextRequest, NextResponse } from 'next/server';
import { OrderForm, Order, ApiResponse } from '~/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;

    // TODO: 实现真实的数据库查询
    // 这里是模拟数据
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'DT20240101001',
        customerId: '1',
        gamerId: '1',
        serviceId: '1',
        status: 'completed',
        type: 'hourly',
        duration: 120,
        actualDuration: 115,
        price: 30,
        totalAmount: 60,
        commission: 6,
        paymentStatus: 'paid',
        scheduledAt: '2024-01-15T19:00:00Z',
        startedAt: '2024-01-15T19:05:00Z',
        endedAt: '2024-01-15T21:00:00Z',
        requirements: '希望能教一些基础战术',
        createdAt: '2024-01-15T18:30:00Z',
        updatedAt: '2024-01-15T21:00:00Z',
      },
      {
        id: '2',
        orderNumber: 'DT20240101002',
        customerId: '2',
        gamerId: '2',
        serviceId: '3',
        status: 'in_progress',
        type: 'hourly',
        duration: 60,
        price: 35,
        totalAmount: 35,
        commission: 3.5,
        paymentStatus: 'paid',
        scheduledAt: '2024-01-16T20:00:00Z',
        startedAt: '2024-01-16T20:00:00Z',
        requirements: '想学狙击技巧',
        createdAt: '2024-01-16T19:45:00Z',
        updatedAt: '2024-01-16T20:00:00Z',
      },
    ];

    // 应用筛选条件
    let filteredOrders = mockOrders;

    if (userId) {
      filteredOrders = filteredOrders.filter((order) => order.customerId === userId || order.gamerId === userId);
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    // 分页
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    const response: ApiResponse<{
      orders: Order[];
      pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    }> = {
      success: true,
      data: {
        orders: paginatedOrders,
        pagination: {
          page,
          pageSize,
          total: filteredOrders.length,
          totalPages: Math.ceil(filteredOrders.length / pageSize),
        },
      },
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '获取订单列表失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderForm = await request.json();
    const { gamerId, serviceId, duration, scheduledAt, requirements } = body;

    // TODO: 实现真实的订单创建逻辑
    // 1. 验证陪玩师是否可用
    // 2. 计算订单金额
    // 3. 检查用户余额
    // 4. 创建订单记录
    // 5. 发送通知

    const orderNumber = `DT${Date.now()}`;
    const order: Order = {
      id: Date.now().toString(),
      orderNumber,
      customerId: '1', // TODO: 从token中获取当前用户ID
      gamerId,
      serviceId,
      status: 'pending',
      type: 'hourly',
      duration,
      price: 30, // TODO: 从服务信息中获取
      totalAmount: (duration / 60) * 30,
      commission: (duration / 60) * 30 * 0.1,
      paymentStatus: 'pending',
      scheduledAt,
      requirements,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<{ order: Order }> = {
      success: true,
      data: { order },
      message: '订单创建成功',
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '创建订单失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
