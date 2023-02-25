import { createI18n } from "vue-i18n";
import i18n from "@/i18n";
import en from "./locales/en.json"
import ru from "./locales/ru.json"
import type {NavigatorLanguage} from "../utils/types" 
import { defaultLocation } from "@vueuse/core";

const dafaultLocale = "en"
export const supportedLocales = ["en", "ru"]

export function isLocaleSupported(locale: string) {
  return supportedLocales.includes(locale)
  
}

export function getUserLocale() {
  const locale = window.navigator.language ||
  (window.navigator as NavigatorLanguage).userLanguage || dafaultLocale
  
  return {
    locale: locale,
    localeNoRegion: locale.split('-')[0]
  }
}
function getPersistedLocale() {
  const persistedLocale = localStorage.getItem("user-locale")
  if(persistedLocale && isLocaleSupported(persistedLocale)) {
    return persistedLocale 
  }
  return null
}

export function guessDefaultLocale() {
  const userPersistedLocale = getPersistedLocale()
  if(userPersistedLocale) {
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

export async function setCurrentLocale(newLocale: "en" | "ru") {
  i18n.global.locale.value = newLocale
  document.querySelector("html")?.setAttribute("lang", newLocale)
  localStorage.setItem("user-locale", newLocale)
}

export default createI18n({
  locale: "en",
  fallbackLocale: "ru",
  legacy: false,
  globalInjection: true,
  messages: { en, ru }
})
// async function switchLanguage(newLocale: "en" | "ru") {
//   await 
// }
// async function routeMiddeware(to, _from, next) {
//   const paramLocale = to.params.locale
  
//   if(!isLocaleSupported(paramLocale)) {
//     return next(guessDefaultLocale())
//   }
  
 
// }