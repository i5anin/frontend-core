import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'ru-RU',
    title: 'PF-FORUM Docs',
    description: 'Документация',
    cleanUrls: true,

    themeConfig: {
        siteTitle: 'PF-FORUM Docs',
        nav: [
            { text: 'Главная', link: '/' },
            { text: 'Подготовка', link: '/docs' },
            { text: 'Контакты', link: '/contact' }
        ],
        sidebar: [
            {
                text: 'Документация проекта',
                items: [
                    { text: 'Быстрый старт', link: '/getting-started' },
                    { text: 'Архитектура', link: '/architecture' },
                    { text: 'Стек 2025', link: '/stack-2025' },
                    { text: 'Чистый код', link: '/clean-code' },
                    { text: 'Сборка', link: '/build' },
                    { text: 'Тестирование', link: '/testing' },
                    { text: 'Безопасность', link: '/security' },
                    { text: 'Доставка', link: '/delivery' }
                ]
            },
            {
                text: 'Подготовка',
                items: [
                    { text: 'JavaScript', link: '/javascript/index' },
                    { text: 'TypeScript', link: '/typescript/index' },
                    { text: 'Vue 3', link: '/vue/index' },
                    { text: 'Практика (все темы)', link: '/practice/index' }
                ]
            }
        ],
        outline: {
            level: [2, 3],
            label: 'Содержание'
        }
    }
})
