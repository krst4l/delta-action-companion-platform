'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '~/lib/i18n/navigation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { RegisterForm, ApiResponse, User } from '~/lib/types';
import { Mail, Lock, Eye, EyeOff, User as UserIcon, Phone, Gamepad2, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '~/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
  });

  const handleInputChange = (field: keyof RegisterForm, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 清除错误信息
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = (): string | null => {
    if (!formData.username.trim()) {
      return '请输入用户名';
    }
    if (formData.username.length < 2) {
      return '用户名至少需要2个字符';
    }
    if (!formData.email.trim()) {
      return '请输入邮箱地址';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return '请输入有效的邮箱地址';
    }
    if (!formData.password) {
      return '请输入密码';
    }
    if (formData.password.length < 6) {
      return '密码至少需要6个字符';
    }
    if (formData.password !== formData.confirmPassword) {
      return '两次输入的密码不一致';
    }
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      return '请输入有效的手机号码';
    }
    if (!formData.agreeToTerms) {
      return '请同意用户协议和隐私政策';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse<{ user: User }> = await response.json();

      if (data.success && data.data) {
        setSuccess(data.message || '注册成功！即将跳转到登录页面...');

        // 3秒后跳转到登录页面
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError(data.error || '注册失败，请重试');
      }
    } catch (error) {
      console.error('注册错误:', error);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; text: string; color: string } => {
    if (!password) return { strength: 0, text: '', color: '' };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 1, text: '弱', color: 'bg-red-500' };
    if (score <= 4) return { strength: 2, text: '中等', color: 'bg-yellow-500' };
    return { strength: 3, text: '强', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
          <p className="text-gray-600 dark:text-gray-400">加入我们，开启精彩游戏之旅</p>
        </div>

        {/* 注册表单 */}
        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">创建账户</CardTitle>
            <CardDescription>填写信息完成注册</CardDescription>
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

              {/* 成功提示 */}
              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* 用户名输入 */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  用户名
                </label>
                <div className="relative">
                  <UserIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="请输入用户名"
                    className="h-12 pl-10"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                  />
                </div>
              </div>

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

              {/* 手机号输入（可选） */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  手机号码 <span className="text-xs text-gray-400">(可选)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入手机号码"
                    className="h-12 pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
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

                {/* 密码强度指示器 */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={cn('h-2 rounded-full transition-all duration-300', passwordStrength.color)}
                          style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{passwordStrength.text}</span>
                    </div>
                    <p className="text-xs text-gray-500">密码至少6位，建议包含大小写字母、数字和特殊字符</p>
                  </div>
                )}
              </div>

              {/* 确认密码输入 */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="请再次输入密码"
                    className="h-12 pr-10 pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* 密码匹配提示 */}
                {formData.confirmPassword && (
                  <div className="flex items-center gap-1 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">密码匹配</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">密码不匹配</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* 用户协议 */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600 dark:text-gray-400">
                  我已阅读并同意{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    用户协议
                  </Link>{' '}
                  和{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    隐私政策
                  </Link>
                </label>
              </div>

              {/* 注册按钮 */}
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white hover:from-blue-600 hover:to-purple-700"
                disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    注册中...
                  </div>
                ) : (
                  '创建账户'
                )}
              </Button>
            </form>

            {/* 登录链接 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                已有账户？{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  立即登录
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 陪玩师申请 */}
        <div className="mt-6 text-center">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">想成为陪玩师？</p>
          <Link href="/gamer/apply" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            申请成为陪玩师 →
          </Link>
        </div>
      </div>
    </div>
  );
}
