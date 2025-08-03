'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Order } from '~/lib/types';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Loading } from '~/components/ui/loading';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageCircle, Star } from 'lucide-react';

export default function OrdersPage() {
  const t = useTranslations();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 模拟API调用
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
            customerId: '1',
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
          {
            id: '3',
            orderNumber: 'DT20240101003',
            customerId: '1',
            gamerId: '3',
            serviceId: '2',
            status: 'pending',
            type: 'hourly',
            duration: 90,
            price: 40,
            totalAmount: 60,
            commission: 6,
            paymentStatus: 'pending',
            scheduledAt: '2024-01-17T21:00:00Z',
            requirements: '需要团队配合训练',
            createdAt: '2024-01-17T20:30:00Z',
            updatedAt: '2024-01-17T20:30:00Z',
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error('获取订单失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      case 'pending':
        return '待处理';
      case 'cancelled':
        return '已取消';
      default:
        return '未知';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.requirements.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <Loading text="加载订单信息..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">订单管理</h1>
            <p className="text-muted-foreground mt-2">管理您的所有游戏陪玩订单</p>
          </div>
          <Button>新建订单</Button>
        </div>

        {/* 筛选和搜索 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input placeholder="搜索订单号或需求..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="in_progress">进行中</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="cancelled">已取消</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  筛选
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 订单列表 */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.orderNumber}</h3>
                          <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">{order.requirements}</p>
                        <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                          <span>时长: {order.duration}分钟</span>
                          <span>价格: ¥{order.price}/小时</span>
                          <span>创建时间: {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-lg font-semibold">¥{order.totalAmount}</p>
                        <p className="text-muted-foreground text-sm">{order.paymentStatus === 'paid' ? '已支付' : '待支付'}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        {order.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="py-12 text-center">
                  <Clock className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">暂无订单</h3>
                  <p className="text-muted-foreground mb-4">{searchTerm || statusFilter !== 'all' ? '没有找到匹配的订单' : '您还没有创建任何订单'}</p>
                  <Button>立即下单</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === 'pending').length}</p>
                  <p className="text-muted-foreground text-sm">待处理</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === 'in_progress').length}</p>
                  <p className="text-muted-foreground text-sm">进行中</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{orders.filter((o) => o.status === 'completed').length}</p>
                  <p className="text-muted-foreground text-sm">已完成</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">¥{orders.reduce((sum, order) => sum + order.totalAmount, 0)}</p>
                  <p className="text-muted-foreground text-sm">总消费</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
