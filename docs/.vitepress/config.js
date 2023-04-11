import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Panacea',
  description: 'Trading Bot Real-time Status Manager',
  appearance: 'dark',
  base: '/panacea-api/',
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: 'true',
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: false
  },
  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: "灵丹",
      description: '交易机器人实时状态管理',
      themeConfig: {
        siteTitle: '灵丹',
        nav: nav_cn(),
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outlineTitle: '在此页',
        editLink: {
          pattern: 'https://github.com/markmind/panacea-api/docs/:path',
          text: '在GitHub上编辑此页面'
        },
        footer: {
          message: 'MIT 授权',
          copyright: '版权所有 © 2023 Ciiat Tech'
        },
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回页首',
        langMenuLabel: '改变语言',
        lastUpdatedText: '最后更新'
      }
    },
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/'
    }
  },

  // theme related configurations.
  themeConfig: {
    logo: '/images/logo.png',
    siteTitle: 'Panacea',
    i18nRouting: true,
    aside: 'true',
    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page'
    },
    outlineTitle: 'On this page',
    editLink: {
      pattern: 'https://github.com/markmind/panacea-api/docs/:path',
      text: 'Edit this page on GitHub'
    },
    darkModeSwitchLabel: 'Appearance',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change Language',
    lastUpdatedText: 'Last Updated',
    outline: 'deep',
    nav: nav(),
    sidebar: {
      '/': sidebarGuide(),
      '/zh/': sidebarGuide_cn()
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2023-present Ciiat Tech'
    },
    /* algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'xcoin'
    }, */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/markmind/panacea-api' }
    ]
  }
})

function nav_cn() {
  return [
    { text: '指南', link: '/zh/panacea.md' },
    { text: 'API', link: '/zh/status.md' },
    { text: '反馈', link: 'https://github.com/markmind/panacea-api/issues' }
  ]
}

function nav() {
  return [
    { text: 'Guide', link: '/panacea.md' },
    { text: 'API', link: '/status.md' },
    { text: 'Feedback', link: 'https://github.com/markmind/panacea-api/issues' }
  ]
}

function sidebarGuide_cn() {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '灵丹', link: '/zh/panacea' },
        { text: '开发者', link: '/zh/developer' },
        { text: '常见问题', link: '/zh/faq' },
      ]
    },
    {
      text: 'API',
      collapsed: false,
      items: [
        { text: '状态', link: '/zh/status' },
        { text: '操作', link: '/zh/operation' },
        { text: '配置', link: '/zh/config' },
        { text: '策略', link: '/zh/strategy' },
        { text: '市场', link: '/zh/market' }
      ]
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Panacea', link: '/panacea' },
        { text: 'Developer', link: '/developer' },
        { text: 'Faq', link: '/faq' },
      ]
    },
    {
      text: 'API',
      collapsed: false,
      items: [
        { text: 'Status', link: '/status' },
        { text: 'Operation', link: '/operation' },
        { text: 'Config', link: '/config' },
        { text: 'Strategy', link: '/strategy' },
        { text: 'Market', link: '/market' }
      ]
    }
  ]
}
