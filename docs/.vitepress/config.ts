import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'ru-RU',
    title: 'Frontend Core',
    description: 'Документация',
    cleanUrls: true,

    themeConfig: {
        siteTitle: 'Frontend Core',

        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: 'Поиск',
                                buttonAriaLabel: 'Открыть поиск'
                            },
                            modal: {
                                noResultsText: 'Ничего не найдено',
                                resetButtonTitle: 'Сбросить поиск',
                                displayDetails: 'Показать подробности',
                                backButtonTitle: 'Назад',
                                footer: {
                                    selectText: 'Выбор',
                                    navigateText: 'Навигация',
                                    closeText: 'Закрыть'
                                }
                            }
                        }
                    }
                }
            }
        },

        nav: [
            { text: 'Главная', link: '/' },
            {
                text: 'Документация проекта',
                items: [
                    { text: 'JavaScript', link: '/javascript/' },
                    { text: 'TypeScript', link: '/typescript/' },
                    { text: 'HTML / CSS', link: '/html-css/' },
                    { text: 'Vue', link: '/vue/' },
                    { text: 'Системный дизайн', link: '/system-design/' },
                    { text: 'Инфраструктура и безопасность', link: '/infra-security/' },
                    { text: 'Анализ и проектирование', link: '/analysis/' },
                    { text: 'Организация и управление', link: '/management/' }
                ]
            },
            { text: 'Контакты', link: '/contact' }
        ],

        sidebar: {
            '/javascript/': [
                {
                    text: 'JavaScript',
                    collapsed: false,
                    items: [
                        { text: 'Синтаксис и типы данных', link: '/javascript/syntax-and-types' },
                        { text: 'Асинхронное программирование', link: '/javascript/async' },
                        { text: 'Продвинутая работа с объектами', link: '/javascript/objects' },
                        { text: 'ООП', link: '/javascript/oop' },
                        { text: 'Функциональное программирование', link: '/javascript/functional' },
                        { text: 'Browser API', link: '/javascript/browser-api' },
                        { text: 'Внутреннее устройство', link: '/javascript/internals' }
                    ]
                }
            ],

            '/typescript/': [
                {
                    text: 'TypeScript',
                    collapsed: false,
                    items: [
                        { text: 'Типизация', link: '/typescript/' },
                        { text: 'Типы данных', link: '/typescript/data-types' },
                        { text: 'Union / Intersection', link: '/typescript/types' },
                        { text: 'Интерфейсы', link: '/typescript/interfaces' },
                        { text: 'Дженерики', link: '/typescript/generics' }
                    ]
                }
            ],

            '/html-css/': [
                {
                    text: 'HTML / CSS',
                    collapsed: false,
                    items: [
                        { text: 'Позиционирование', link: '/html-css/positioning' },
                        { text: 'Flexbox / Grid', link: '/html-css/layout' },
                        { text: 'БЭМ', link: '/html-css/bem' },
                        { text: 'Псевдоклассы / элементы', link: '/html-css/pseudo' },
                        { text: 'Адаптивность', link: '/html-css/responsive' },
                        { text: 'Анимации', link: '/html-css/animation' },
                        { text: 'DOM / CSSOM', link: '/html-css/dom-cssom' }
                    ]
                }
            ],

            '/vue/': [
                {
                    text: 'Vue',
                    collapsed: false,
                    items: [
                        { text: 'Options API', link: '/vue/options-api' },
                        { text: 'Composition API', link: '/vue/composition-api' },
                        { text: 'Компоненты', link: '/vue/components' },
                        { text: 'Слоты', link: '/vue/slots' },
                        { text: 'Provide / Inject', link: '/vue/provide-inject' },
                        { text: 'Render', link: '/vue/render' },
                        { text: 'Store', link: '/vue/store' },
                        { text: 'Router', link: '/vue/router' },
                        { text: 'i18n', link: '/vue/i18n' }
                    ]
                }
            ],

            '/system-design/': [
                {
                    text: 'Системный дизайн',
                    collapsed: false,
                    items: [
                        { text: 'Протоколы', link: '/system-design/protocols' },
                        { text: 'Модели данных', link: '/system-design/data-models' },
                        { text: 'Паттерны', link: '/system-design/patterns' },
                        { text: 'KISS / DRY / SOLID', link: '/system-design/principles' },
                        { text: 'SPA / SSR / SSG', link: '/system-design/rendering' }
                    ]
                }
            ],

            '/infra-security/': [
                {
                    text: 'Инфраструктура и безопасность',
                    collapsed: false,
                    items: [
                        { text: 'GitLab', link: '/infra-security/gitlab' },
                        { text: 'Сборка', link: '/infra-security/build' },
                        { text: 'Конфиги сборки', link: '/infra-security/config' },
                        { text: 'Auth', link: '/infra-security/auth' },
                        { text: 'Client Security', link: '/infra-security/security' }
                    ]
                }
            ],

            '/analysis/': [
                {
                    text: 'Анализ',
                    collapsed: false,
                    items: [
                        { text: 'Анализ задачи', link: '/analysis/task' },
                        { text: 'Декомпозиция', link: '/analysis/decomposition' },
                        { text: 'Проектирование', link: '/analysis/design' }
                    ]
                }
            ],

            '/management/': [
                {
                    text: 'Управление',
                    collapsed: false,
                    items: [
                        { text: 'Организация работ', link: '/management/work' },
                        { text: 'Команда', link: '/management/team' },
                        { text: 'Интервью', link: '/management/interview' }
                    ]
                }
            ]
        },

        outline: {
            level: [2, 3],
            label: 'Содержание'
        }
    }
})