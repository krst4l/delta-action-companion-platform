import { NextRequest, NextResponse } from 'next/server';
import { SearchFilters, SearchResult, Gamer, ApiResponse } from '~/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 解析查询参数
    const filters: SearchFilters = {
      keywords: searchParams.get('keywords') || undefined,
      skills: searchParams.get('skills')?.split(',') || undefined,
      priceRange:
        searchParams.get('minPrice') && searchParams.get('maxPrice')
          ? {
              min: Number(searchParams.get('minPrice')),
              max: Number(searchParams.get('maxPrice')),
            }
          : undefined,
      rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
      gender: (searchParams.get('gender') as 'male' | 'female') || undefined,
      isOnline: searchParams.get('isOnline') ? searchParams.get('isOnline') === 'true' : undefined,
      sortBy: (searchParams.get('sortBy') as 'price' | 'rating' | 'experience' | 'response_time') || 'rating',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    };

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 20;

    // TODO: 实现真实的数据库查询
    // 这里是模拟数据
    const mockGamers: Gamer[] = [
      {
        id: '1',
        username: '三角洲王者',
        email: 'gamer1@example.com',
        avatar: '/avatars/gamer1.jpg',
        balance: 500.0,
        gender: 'male',
        location: '北京',
        bio: '专业三角洲玩家，5年经验',
        isVerified: true,
        status: 'active',
        role: 'gamer',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        gamerProfile: {
          id: '1',
          userId: '1',
          title: '三角洲突击专家',
          description: '拥有5年三角洲行动经验，专精突击战术和团队配合，擅长带新手快速上手游戏。',
          experience: 5000,
          totalOrders: 156,
          successRate: 98.5,
          rating: 4.9,
          reviewCount: 145,
          skills: [
            {
              id: '1',
              name: '突击手',
              level: 'expert',
              description: '擅长近距离战斗和突破',
              verified: true,
            },
            {
              id: '2',
              name: '战术指挥',
              level: 'advanced',
              description: '团队指挥和战术制定',
              verified: true,
            },
          ],
          services: [
            {
              id: '1',
              name: '排位上分',
              description: '专业带你上分，提升游戏技巧',
              price: 30,
              duration: 60,
              isActive: true,
              tags: ['排位', '上分', '教学'],
            },
            {
              id: '2',
              name: '娱乐陪玩',
              description: '轻松愉快的游戏体验',
              price: 20,
              duration: 60,
              isActive: true,
              tags: ['娱乐', '陪玩', '聊天'],
            },
          ],
          workingHours: {
            monday: [{ start: '19:00', end: '23:00' }],
            tuesday: [{ start: '19:00', end: '23:00' }],
            wednesday: [{ start: '19:00', end: '23:00' }],
            thursday: [{ start: '19:00', end: '23:00' }],
            friday: [{ start: '19:00', end: '23:00' }],
            saturday: [{ start: '10:00', end: '23:00' }],
            sunday: [{ start: '10:00', end: '23:00' }],
          },
          certifications: [
            {
              id: '1',
              type: 'identity',
              name: '实名认证',
              isVerified: true,
              verifiedAt: '2024-01-01T00:00:00Z',
            },
          ],
          gameAccounts: [
            {
              id: '1',
              platform: 'steam',
              username: 'DeltaMaster',
              level: 50,
              rank: '钻石',
              isVerified: true,
            },
          ],
          isOnline: true,
          isAcceptingOrders: true,
          minOrderDuration: 60,
          maxOrderDuration: 480,
          responseTime: 30,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      },
      {
        id: '2',
        username: '狙击女神',
        email: 'gamer2@example.com',
        avatar: '/avatars/gamer2.jpg',
        balance: 300.0,
        gender: 'female',
        location: '上海',
        bio: '专业狙击手，精准射击',
        isVerified: true,
        status: 'active',
        role: 'gamer',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        gamerProfile: {
          id: '2',
          userId: '2',
          title: '精准狙击专家',
          description: '专精远程狙击，教学耐心细致，声音甜美，游戏技术过硬。',
          experience: 3000,
          totalOrders: 89,
          successRate: 96.8,
          rating: 4.8,
          reviewCount: 78,
          skills: [
            {
              id: '3',
              name: '狙击手',
              level: 'expert',
              description: '远程精准射击专家',
              verified: true,
            },
            {
              id: '4',
              name: '侦察',
              level: 'advanced',
              description: '地图侦察和情报收集',
              verified: false,
            },
          ],
          services: [
            {
              id: '3',
              name: '狙击教学',
              description: '专业狙击技巧教学',
              price: 35,
              duration: 60,
              isActive: true,
              tags: ['狙击', '教学', '技巧'],
            },
            {
              id: '4',
              name: '语音陪玩',
              description: '甜美声音陪你游戏',
              price: 25,
              duration: 60,
              isActive: true,
              tags: ['语音', '陪玩', '甜美'],
            },
          ],
          workingHours: {
            monday: [{ start: '20:00', end: '24:00' }],
            tuesday: [{ start: '20:00', end: '24:00' }],
            wednesday: [{ start: '20:00', end: '24:00' }],
            thursday: [{ start: '20:00', end: '24:00' }],
            friday: [{ start: '18:00', end: '24:00' }],
            saturday: [{ start: '14:00', end: '24:00' }],
            sunday: [{ start: '14:00', end: '24:00' }],
          },
          certifications: [
            {
              id: '2',
              type: 'identity',
              name: '实名认证',
              isVerified: true,
              verifiedAt: '2024-01-01T00:00:00Z',
            },
          ],
          gameAccounts: [
            {
              id: '2',
              platform: 'steam',
              username: 'SniperQueen',
              level: 45,
              rank: '铂金',
              isVerified: true,
            },
          ],
          isOnline: false,
          isAcceptingOrders: true,
          minOrderDuration: 60,
          maxOrderDuration: 360,
          responseTime: 45,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      },
    ];

    // 应用筛选条件
    let filteredGamers = mockGamers;

    if (filters.keywords) {
      filteredGamers = filteredGamers.filter((gamer) => gamer.username.includes(filters.keywords!) || gamer.gamerProfile.description.includes(filters.keywords!));
    }

    if (filters.isOnline !== undefined) {
      filteredGamers = filteredGamers.filter((gamer) => gamer.gamerProfile.isOnline === filters.isOnline);
    }

    if (filters.gender) {
      filteredGamers = filteredGamers.filter((gamer) => gamer.gender === filters.gender);
    }

    // 排序
    if (filters.sortBy === 'rating') {
      filteredGamers.sort((a, b) => (filters.sortOrder === 'desc' ? b.gamerProfile.rating - a.gamerProfile.rating : a.gamerProfile.rating - b.gamerProfile.rating));
    }

    // 分页
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedGamers = filteredGamers.slice(startIndex, endIndex);

    const result: SearchResult = {
      gamers: paginatedGamers,
      total: filteredGamers.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredGamers.length / pageSize),
    };

    const response: ApiResponse<SearchResult> = {
      success: true,
      data: result,
    };

    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      error: '获取陪玩师列表失败',
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
