import { createI18n } from "vue-i18n";
import i18n from "@/i18n";
// import en from "./locales/en.json"
// import ru from "./locales/ru.json"
import type { NavigatorLanguage } from "../utils/types"
import { defaultLocation } from "@vueuse/core";
import { nextTick } from "vue";

// type MessageSchema = typeof en

export default createI18n({ //<[MessageSchema], 'en' | 'ru'>
  // locale: "en",
  fallbackLocale: "en",
  legacy: false,
  globalInjection: true,
  // messages: { en }, // (await import(`./locales/en.json`)).default
  // availableLocales: ["en", "ru"],
  runtimeOnly: false
})


const defaultLocale = "en"
export const supportedLocales = ["en", "ru"]
// let currentLocale = i18n.global.locale.value

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
    return userPersistedLocale
  }
  const userPreferredLocale = getUserLocale()

  if (isLocaleSupported(userPreferredLocale.locale)) {
    return userPreferredLocale.locale
  }
  if (isLocaleSupported(userPreferredLocale.localeNoRegion)) {
    return userPreferredLocale.localeNoRegion
  }

  return defaultLocation


}

export async function switchLanguage(newLocale: "en" | "ru") {
  await loadLocalMessages(newLocale)
  i18n.global.locale.value  = newLocale
  document.querySelector("html")?.setAttribute("lang", newLocale)
  localStorage.setItem("user-locale", newLocale)
}

async function loadLocalMessages(locale: "en" | "ru") {
  if(!i18n.global.availableLocales.includes(locale)){
    const messages = await import(`./locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
      console.log('load true')
    }
    console.log('loading', locale)
    
    return nextTick()
}


// async function switchLanguage(newLocale: "en" | "ru") {
//   currentLocale = newLocale
//   document.querySelector
// }
export async function i18nRouterMiddleware(to: any, _from: any, next: any) {
  const paramLocale = to.params.locale

  if (!isLocaleSupported(paramLocale)) {
    return next(guessDefaultLocale())
  }

  await switchLanguage(paramLocale)
  return next()


}

export function i18nRoute(to: any) {
  return {
    ...to,
    params: {
      locale: i18n.global.locale.value,
      ...to.params
    }
  }
}