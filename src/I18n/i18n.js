import { createI18n } from 'vue-i18n';
import enLocale from './locales/en.json'
import kmLocale from './locales/km.json'

const i18n = createI18n({
    locale: 'km',
    messages: {
        en: enLocale,
        km: kmLocale
    }
})

export default i18n