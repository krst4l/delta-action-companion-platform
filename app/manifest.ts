// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '三角洲游戏陪玩平台',
    short_name: '三角洲陪玩',
    description: '专业游戏陪玩服务平台，提供王者荣耀、英雄联盟、和平精英等热门游戏陪玩服务',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    orientation: 'portrait',
    categories: ['games', 'entertainment'],
    screenshots: [
      {
        src: '/screenshots/mobile.png',
        sizes: '540x720',
        type: 'image/png',
      },
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x800',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: '游戏陪玩',
        url: '/gamers',
        icons: [{ src: '/icons/gamers.png', sizes: '96x96' }],
      },
      {
        name: '个人中心',
        url: '/profile',
        icons: [{ src: '/icons/profile.png', sizes: '96x96' }],
      },
    ],
  };
}
