'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '~/lib/i18n/navigation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { LoginForm, ApiResponse, User } from '~/lib/types';
import { Mail, Lock, Eye, EyeOff, Gamepad2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 清除错误信息
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('请填写完整的登录信息');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse<{ user: User; token: string }> = await response.json();

      if (data.success && data.data) {
        // 保存用户信息和token
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // 跳转到首页或之前的页面
        router.push('/');
      } else {
        setError(data.error || '登录失败，请检查邮箱和密码');
      }
    } catch (error) {
      console.error('登录错误:', error);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">三角洲陪玩</h1>
              <Badge variant="secondary" className="text-xs">
                专业游戏陪玩平台
              </Badge>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">欢迎回来！请登录您的账户</p>
        </div>

        {/* 登录表单 */}
        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">登录账户</CardTitle>
            <CardDescription>使用您的邮箱和密码登录</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 错误提示 */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* 邮箱输入 */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    className="h-12 pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 密码输入 */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    className="h-12 pr-10 pl-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* 记住我和忘记密码 */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">记住我</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  忘记密码？
                </Link>
              </div>

              {/* 登录按钮 */}
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white hover:from-blue-600 hover:to-purple-700"
                disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    登录中...
                  </div>
                ) : (
                  '登录'
                )}
              </Button>

              {/* 分隔线 */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500 dark:bg-gray-900">或</span>
                </div>
              </div>

              {/* 第三方登录 */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  onClick={() => {
                    // TODO: 微信登录
                  }}>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.168 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.274 7.102.5.468-.533.736-1.224.736-1.967 0-4.055-3.891-7.342-8.691-7.342z" />
                  </svg>
                  微信登录
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  onClick={() => {
                    // TODO: QQ登录
                  }}>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 2.5c-5.486 0-9.933 4.448-9.933 9.933s4.447 9.933 9.933 9.933 9.933-4.448 9.933-9.933S17.503 2.5 12.017 2.5zm4.717 14.817c-1.297-.684-1.724-1.269-1.724-1.269s.418-.427.418-1.269c0-.842-.418-1.684-.418-1.684s1.306-.427 1.306-2.111c0-1.684-1.306-2.111-1.306-2.111s.418-.842.418-1.684c0-.842-.418-1.269-.418-1.269s1.306-.684 1.724-1.269c.418-.585-.418-1.269-.418-1.269s-1.306.684-2.612.684-2.612-.684-2.612-.684-.836.684-.418 1.269c.418.585 1.724 1.269 1.724 1.269s-.418.427-.418 1.269c0 .842.418 1.684.418 1.684s-1.306.427-1.306 2.111c0 1.684 1.306 2.111 1.306 2.111s-.418.842-.418 1.684c0 .842.418 1.269.418 1.269s-.427.585-1.724 1.269c-1.297.684.418 1.269.418 1.269s1.306-.684 2.612-.684 2.612.684 2.612.684.836-.684.418-1.269z" />
                  </svg>
                  QQ登录
                </Button>
              </div>
            </form>

            {/* 注册链接 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                还没有账户？{' '}
                <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  立即注册
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 游客体验 */}
        <div className="mt-6 text-center">
          <Link href="/gamers" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            游客身份浏览陪玩师 →
          </Link>
        </div>
      </div>
    </div>
  );
}
