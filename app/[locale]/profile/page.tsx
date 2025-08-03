'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { User, Order } from '~/lib/types';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Loading } from '~/components/ui/loading';
import { User as UserIcon, Wallet, Clock, Star, Settings, LogOut, Edit, Camera } from 'lucide-react';

export default function ProfilePage() {
  const t = useTranslations();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 从API获取用户数据
    const fetchUserData = async () => {
      try {
        // 模拟API调用
        const mockUser: User = {
          id: '1',
          username: '游戏玩家',
          email: 'player@example.com',
          phone: '13800138000',
          avatar: '/avatars/user1.jpg',
          balance: 150.5,
          gender: 'male',
          isVerified: true,
          status: 'active',
          role: 'user',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        };

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
        ];

        setUser(mockUser);
        setOrders(mockOrders);
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loading text="加载用户信息..." />;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">用户信息加载失败</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* 用户信息卡片 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                个人资料
              </CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                编辑
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">用户名</label>
                    <p className="text-lg font-semibold">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">邮箱</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">手机号</label>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">状态</label>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status === 'active' ? '活跃' : '非活跃'}</Badge>
                      {user.isVerified && (
                        <Badge variant="outline" className="text-green-600">
                          已验证
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 账户信息 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5" />
                账户余额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary text-2xl font-bold">¥{user.balance.toFixed(2)}</p>
              <Button className="mt-3 w-full" size="sm">
                充值
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                游戏时长
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">127 小时</p>
              <p className="text-muted-foreground mt-1 text-sm">本月游戏时长</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5" />
                信用评分
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">4.8</p>
              <p className="text-muted-foreground mt-1 text-sm">优秀用户</p>
            </CardContent>
          </Card>
        </div>

        {/* 最近订单 */}
        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-muted-foreground text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">¥{order.totalAmount}</p>
                      <Badge variant={order.status === 'completed' ? 'default' : order.status === 'in_progress' ? 'secondary' : 'outline'}>
                        {order.status === 'completed' ? '已完成' : order.status === 'in_progress' ? '进行中' : '待处理'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">暂无订单记录</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 设置选项 */}
        <Card>
          <CardHeader>
            <CardTitle>账户设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                账户设置
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                隐私设置
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
