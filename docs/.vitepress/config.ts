import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'ru-RU',
    title: 'Frontend Core',
    description: 'Документация',
    cleanUrls: true,

    themeConfig: {
        siteTitle: 'PF-FORUM Docs',
        nav: [
            { text: 'Главная', link: '/' },
            { text: 'Подготовка', link: '/docs/' },
            { text: 'Контакты', link: '/contact' }
        ],
        sidebar: [
            {
                text: 'Документация проекта',
                collapsed: false,
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
                text: 'Подготовка по направлениям',
                collapsed: false,
                items: [
                    {
                        text: 'JavaScript',
                        link: '/javascript/index',
                        items: [
                            { text: 'Синтаксис и типы данных', link: '/javascript/index#синтаксис-и-типы-данных' },
                            { text: 'Асинхронное программирование', link: '/javascript/async' },
                            { text: 'ООП в JavaScript', link: '/javascript/oop' },
                            { text: 'Функциональное программирование', link: '/javascript/functional' }
                        ]
                    },
                    {
                        text: 'TypeScript',
                        link: '/typescript/index',
                        items: [
                            { text: 'Типизация и ключевые принципы', link: '/typescript/index' },
                            { text: 'Объединение и пересечение типов', link: '/typescript/types' },
                            { text: 'Интерфейсы и дженерики', link: '/typescript/types#generics' }
                        ]
                    },
                    {
                        text: 'HTML / CSS / PCSS',
                        link: '/html-css/index',
                        items: [
                            { text: 'Позиционирование и наложение', link: '/html-css/index#positioning' },
                            { text: 'Flexbox и Grid', link: '/html-css/flexbox' },
                            { text: 'БЭМ', link: '/html-css/bem' },
                            { text: 'Анимации', link: '/html-css/animation' },
                            { text: 'Семантика и адаптивность', link: '/html-css/index#semantic' }
                        ]
                    },
                    {
                        text: 'Vue 3',
                        link: '/vue/index',
                        items: [
                            { text: 'Composition API', link: '/vue/composition' },
                            { text: 'Render-функции', link: '/vue/render' },
                            { text: 'Store', link: '/vue/store' },
                            { text: 'Router', link: '/vue/router' },
                            { text: 'i18n (локализация)', link: '/vue/index#i18n' }
                        ]
                    },
                    {
                        text: 'Системный дизайн',
                        link: '/system-design/index',
                        items: [
                            { text: 'Протоколы обмена данными', link: '/system-design/protocols' },
                            { text: 'Паттерны проектирования', link: '/system-design/patterns' },
                            { text: 'Принципы KISS, DRY, SOLID', link: '/system-design/index#principles' }
                        ]
                    },
                    {
                        text: 'Инфраструктура и безопасность',
                        link: '/infra-security/index',
                        items: [
                            { text: 'GitLab и CI/CD', link: '/infra-security/index#gitlab' },
                            { text: 'Сборка: Webpack и Vite', link: '/infra-security/index#build' },
                            { text: 'Аутентификация / авторизация', link: '/infra-security/auth' },
                            { text: 'Безопасность клиента', link: '/infra-security/index#security' }
                        ]
                    },
                    {
                        text: 'Анализ и проектирование',
                        link: '/analysis/index',
                        items: [
                            { text: 'Анализ постановки задачи', link: '/analysis/index' },
                            { text: 'Декомпозиция задач', link: '/analysis/decomposition' },
                            { text: 'Проектирование решений', link: '/analysis/index#design' }
                        ]
                    },
                    {
                        text: 'Организация и управление',
                        link: '/management/index',
                        items: [
                            { text: 'Организация работ', link: '/management/index' },
                            { text: 'Развитие команды', link: '/management/team' },
                            { text: 'Интервью и подбор', link: '/management/index#interview' }
                        ]
                    }
                ]
            }
        ],
        outline: {
            level: [2, 3],
            label: 'Содержание'
        }
    }
})
