// 三角洲陪玩平台 - 核心数据类型定义

// ============= 用户相关类型 =============

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  phone?: string;
  balance: number; // 账户余额
  gender: 'male' | 'female' | 'unknown';
  birthday?: string;
  location?: string;
  bio?: string;
  isVerified: boolean; // 是否实名认证
  status: 'active' | 'banned' | 'inactive';
  role: 'user' | 'gamer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// ============= 陪玩师相关类型 =============

export interface Gamer extends User {
  role: 'gamer';
  gamerProfile: GamerProfile;
}

export interface GamerProfile {
  id: string;
  userId: string;
  title: string; // 称号：如"三角洲王者"
  description: string; // 个人简介
  experience: number; // 经验值
  totalOrders: number; // 总订单数
  successRate: number; // 成功率
  rating: number; // 平均评分
  reviewCount: number; // 评价数量
  skills: GamerSkill[]; // 技能列表
  services: GamerService[]; // 服务项目
  workingHours: WorkingHours; // 工作时间
  certifications: Certification[]; // 认证信息
  gameAccounts: GameAccount[]; // 游戏账号
  isOnline: boolean; // 是否在线
  isAcceptingOrders: boolean; // 是否接单
  minOrderDuration: number; // 最小接单时长(分钟)
  maxOrderDuration: number; // 最大接单时长(分钟)
  responseTime: number; // 平均响应时间(秒)
  createdAt: string;
  updatedAt: string;
}

export interface GamerSkill {
  id: string;
  name: string; // 技能名称：如"突击手"、"狙击手"
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'; // 技能等级
  description?: string;
  verified: boolean; // 是否官方认证
}

export interface GamerService {
  id: string;
  name: string; // 服务名称：如"排位上分"、"娱乐陪玩"
  description: string;
  price: number; // 价格/小时
  duration: number; // 服务时长(分钟)
  isActive: boolean;
  tags: string[]; // 标签
}

export interface WorkingHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "18:00"
}

export interface Certification {
  id: string;
  type: 'identity' | 'game_level' | 'skill'; // 认证类型
  name: string;
  imageUrl?: string;
  isVerified: boolean;
  verifiedAt?: string;
}

export interface GameAccount {
  id: string;
  platform: 'steam' | 'epic' | 'origin' | 'uplay' | 'battlenet';
  username: string;
  level?: number;
  rank?: string;
  isVerified: boolean;
}

// ============= 订单相关类型 =============

export interface Order {
  id: string;
  orderNumber: string; // 订单号
  customerId: string; // 客户ID
  gamerId: string; // 陪玩师ID
  serviceId: string; // 服务ID
  status: OrderStatus;
  type: 'hourly' | 'fixed'; // 计费方式：按小时/固定价格
  duration: number; // 预约时长(分钟)
  actualDuration?: number; // 实际时长(分钟)
  price: number; // 订单价格
  totalAmount: number; // 总金额
  commission: number; // 平台佣金
  paymentStatus: PaymentStatus;
  scheduledAt: string; // 预约开始时间
  startedAt?: string; // 实际开始时间
  endedAt?: string; // 结束时间
  requirements?: string; // 特殊要求
  notes?: string; // 订单备注
  cancellationReason?: string; // 取消原因
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending' // 待接单
  | 'accepted' // 已接单
  | 'confirmed' // 已确认
  | 'in_progress' // 进行中
  | 'completed' // 已完成
  | 'cancelled' // 已取消
  | 'disputed'; // 争议中

export type PaymentStatus =
  | 'pending' // 待支付
  | 'paid' // 已支付
  | 'refunded' // 已退款
  | 'partial_refund'; // 部分退款

// ============= 评价相关类型 =============

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  gamerId: string;
  rating: number; // 1-5星评分
  comment?: string;
  tags: string[]; // 评价标签
  isAnonymous: boolean;
  isRecommended: boolean; // 是否推荐
  response?: ReviewResponse; // 陪玩师回复
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  content: string;
  createdAt: string;
}

// ============= 聊天相关类型 =============

export interface ChatRoom {
  id: string;
  orderId?: string; // 关联订单
  participants: string[]; // 参与者ID列表
  type: 'private' | 'group'; // 聊天类型
  lastMessage?: Message;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  type: 'text' | 'image' | 'voice' | 'file' | 'system';
  content: string;
  metadata?: MessageMetadata;
  isRead: boolean;
  createdAt: string;
}

export interface MessageMetadata {
  fileName?: string;
  fileSize?: number;
  duration?: number; // 语音时长
  imageWidth?: number;
  imageHeight?: number;
}

// ============= 支付相关类型 =============

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: 'CNY';
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string; // 第三方交易ID
  refundAmount?: number;
  refundReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod =
  | 'wechat_pay' // 微信支付
  | 'alipay' // 支付宝
  | 'balance' // 余额支付
  | 'bank_card'; // 银行卡

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  frozenAmount: number; // 冻结金额
  totalIncome: number; // 总收入
  totalExpense: number; // 总支出
  withdrawableAmount: number; // 可提现金额
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense' | 'freeze' | 'unfreeze';
  amount: number;
  balance: number; // 操作后余额
  category: TransactionCategory;
  description: string;
  relatedId?: string; // 关联的订单或其他ID
  createdAt: string;
}

export type TransactionCategory =
  | 'recharge' // 充值
  | 'order_payment' // 订单支付
  | 'order_income' // 订单收入
  | 'refund' // 退款
  | 'withdraw' // 提现
  | 'commission' // 佣金
  | 'bonus'; // 奖励

// ============= 搜索筛选相关类型 =============

export interface SearchFilters {
  keywords?: string;
  skills?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number; // 最低评分
  gender?: 'male' | 'female';
  isOnline?: boolean;
  gameLevel?: string[];
  location?: string;
  sortBy?: 'price' | 'rating' | 'experience' | 'response_time';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  gamers: Gamer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============= 系统配置相关类型 =============

export interface SystemConfig {
  platformCommissionRate: number; // 平台佣金比例
  minOrderAmount: number; // 最小订单金额
  maxOrderAmount: number; // 最大订单金额
  minWithdrawAmount: number; // 最小提现金额
  orderCancelTimeLimit: number; // 订单取消时间限制(分钟)
  reviewTimeLimit: number; // 评价时间限制(小时)
  autoConfirmTime: number; // 自动确认时间(小时)
}

// ============= API响应类型 =============

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============= 表单相关类型 =============

export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface GamerApplicationForm {
  title: string;
  description: string;
  skills: string[];
  gameAccounts: Omit<GameAccount, 'id' | 'isVerified'>[];
  workingHours: WorkingHours;
  services: Omit<GamerService, 'id' | 'isActive'>[];
  idCardImages: string[]; // 身份证照片
}

export interface OrderForm {
  gamerId: string;
  serviceId: string;
  duration: number;
  scheduledAt: string;
  requirements?: string;
}

// ============= 通知相关类型 =============

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  data?: unknown; // 附加数据
  isRead: boolean;
  createdAt: string;
}

export type NotificationType =
  | 'order_new' // 新订单
  | 'order_accepted' // 订单被接受
  | 'order_cancelled' // 订单被取消
  | 'order_completed' // 订单完成
  | 'payment_success' // 支付成功
  | 'review_new' // 新评价
  | 'message_new' // 新消息
  | 'system'; // 系统通知

// ============= 统计相关类型 =============

export interface GamerStats {
  totalOrders: number;
  completedOrders: number;
  totalIncome: number;
  averageRating: number;
  responseTime: number;
  onlineHours: number;
  repeatCustomers: number;
}

export interface PlatformStats {
  totalUsers: number;
  totalGamers: number;
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  averageOrderValue: number;
  userGrowthRate: number;
  gamerGrowthRate: number;
}
