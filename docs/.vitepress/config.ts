/**
 * ruDoc
 * @summary Включение локального поиска в VitePress с русской локализацией
 * @description Активирует встроенный провайдер поиска ('local') без внешних сервисов и ключей. Добавляет русские подписи кнопок и элементов модального окна поиска.
 * @param {void} — Конфигурация не принимает аргументы; правки выполняются в файле конфигурации сайта.
 * @returns {import('vitepress').UserConfig} — Конфигурация VitePress с включённым локальным поиском.
 * @throws Не возникает при стандартном запуске; убедитесь, что используете поддерживаемую версию Node и VitePress.
 * @example Запуск dev-сервера:
 *          npx vitepress dev
 *          Сайт доступен локально; поиск работает из коробки.
 * @since 2025-10-29
 */
import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'ru-RU',
    title: 'Frontend Core',
    description: 'Документация',
    cleanUrls: true,

    themeConfig: {
        siteTitle: 'Frontend Core',

        // 🔎 Поиск — локальный провайдер VitePress
        search: {
            provider: 'local',
            options: {
                // Локализация интерфейса поиска (кнопки/подсказки/футер)
                locales: {
                    // root — для основной локали сайта
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
                },
            }
        },

        nav: [
            { text: 'Главная', link: '/' },
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
            { text: 'Контакты', link: '/contact' }
        ],

        sidebar: [
            {
                text: 'Подготовка по направлениям',
                collapsed: false,
                items: [
                    {
                        text: 'JavaScript',
                        link: '/javascript/',
                        items: [
                            { text: 'Синтаксис и типы данных', link: '/javascript/#синтаксис-и-типы-данных' },
                            { text: 'Асинхронное программирование', link: '/javascript/async' },
                            { text: 'ООП в JavaScript', link: '/javascript/oop' },
                            { text: 'Функциональное программирование', link: '/javascript/functional' }
                        ]
                    },
                    {
                        text: 'TypeScript',
                        link: '/typescript/',
                        items: [
                            { text: 'Типизация и ключевые принципы', link: '/typescript/' },
                            { text: 'Объединение и пересечение типов', link: '/typescript/types' },
                            { text: 'Интерфейсы и дженерики', link: '/typescript/generics' }
                        ]
                    },
                    {
                        text: 'HTML / CSS / PCSS',
                        link: '/html-css/',
                        items: [
                            { text: 'Позиционирование и наложение', link: '/html-css/#positioning' },
                            { text: 'Flexbox и Grid', link: '/html-css/flexbox' },
                            { text: 'БЭМ', link: '/html-css/bem' },
                            { text: 'Анимации', link: '/html-css/animation' },
                            { text: 'Семантика и адаптивность', link: '/html-css/#semantic' }
                        ]
                    },
                    {
                        text: 'Vue 3',
                        link: '/vue/',
                        items: [
                            { text: 'Composition API', link: '/vue/composition' },
                            { text: 'Render-функции', link: '/vue/render' },
                            { text: 'Store', link: '/vue/store' },
                            { text: 'Router', link: '/vue/router' },
                            { text: 'i18n (локализация)', link: '/vue/#i18n' }
                        ]
                    },
                    {
                        text: 'Системный дизайн',
                        link: '/system-design/',
                        items: [
                            { text: 'Протоколы обмена данными', link: '/system-design/protocols' },
                            { text: 'Паттерны проектирования', link: '/system-design/patterns' },
                            { text: 'Принципы KISS, DRY, SOLID', link: '/system-design/#principles' }
                        ]
                    },
                    {
                        text: 'Инфраструктура и безопасность',
                        link: '/infra-security/',
                        items: [
                            { text: 'GitLab и CI/CD', link: '/infra-security/#gitlab' },
                            { text: 'Сборка: Webpack и Vite', link: '/infra-security/#build' },
                            { text: 'Аутентификация / авторизация', link: '/infra-security/auth' },
                            { text: 'Безопасность клиента', link: '/infra-security/#security' }
                        ]
                    },
                    {
                        text: 'Анализ и проектирование',
                        link: '/analysis/',
                        items: [
                            { text: 'Анализ постановки задачи', link: '/analysis/' },
                            { text: 'Декомпозиция задач', link: '/analysis/decomposition' },
                            { text: 'Проектирование решений', link: '/analysis/#design' }
                        ]
                    },
                    {
                        text: 'Организация и управление',
                        link: '/management/',
                        items: [
                            { text: 'Организация работ', link: '/management/' },
                            { text: 'Развитие команды', link: '/management/team' },
                            { text: 'Интервью и подбор', link: '/management/#interview' }
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
