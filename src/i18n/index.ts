import { createI18n } from "vue-i18n";
import i18n from "@/i18n";
import type { NavigatorLanguage } from "../utils/types"
import { nextTick } from "vue";



export default createI18n({
  fallbackLocale: "en",
  legacy: false,
  globalInjection: true,

  runtimeOnly: false
})


const defaultLocale = "en"
export const supportedLocales = ["en", "ru"]

export function isLocaleSupported(locale: string) {
  return supportedLocales.includes(locale)

}

export function getUserLocale() {
  const locale = window.navigator.language ||
    (window.navigator as NavigatorLanguage).userLanguage || defaultLocale

  console.log('locale', locale)

  return {
    locale: locale,
    localeNoRegion: locale.split('-')[0]
  }
}
function getPersistedLocale() {
  const persistedLocale = localStorage.getItem("user-locale")
  if (persistedLocale && isLocaleSupported(persistedLocale)) {
    return persistedLocale
  }
  return null
}

export function guessDefaultLocale() {
  const userPersistedLocale = getPersistedLocale()
  if (userPersistedLocale) {
    if (isLocaleSupported(userPersistedLocale)) {
      return userPersistedLocale
    }
  }
  const userPreferredLocale = getUserLocale()

  if (isLocaleSupported(userPreferredLocale.locale)) {
    return userPreferredLocale.locale
  }
  if (isLocaleSupported(userPreferredLocale.localeNoRegion)) {
    return userPreferredLocale.localeNoRegion
  }

  return i18n.global.fallbackLocale


}

export async function switchLanguage(newLocale: "en" | "ru") {
  await loadLocalMessages(newLocale)
  i18n.global.locale.value = newLocale
  document.querySelector("html")?.setAttribute("lang", newLocale)
  localStorage.setItem("user-locale", newLocale)
}

async function loadLocalMessages(locale: "en" | "ru") {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`./locales/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
  }

  return nextTick()
}

export async function i18nRouterMiddleware(to: any, _from: any, next: any) {
  let temp = guessDefaultLocale()
  if (temp === 'ru' || temp === 'en') {
    await switchLanguage(temp)
  } else {
    switchLanguage("en")
  }
  return next()


}
