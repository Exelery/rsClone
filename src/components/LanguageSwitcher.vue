<template>
  <div>
    <select @change="changeLanguage" class="form-select form-select-sm form-select-color header-inner-pages">
          <!-- <i class="bi bi-translate"></i> -->
      <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`" :value="sLocale"
        :selected="locale === sLocale">
        {{ $t(`locale.${sLocale}`) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { supportedLocales, switchLanguage } from "../i18n/index"
import {useRouter} from "vue-router"
const { locale } = useI18n()
const router = useRouter()

const changeLanguage = async (event: Event) => {
  if (event.target) {
    const newLocale = (event.target as HTMLInputElement).value
    await switchLanguage(newLocale as 'ru' | 'en')
    // try {
    //   await router.replace({params:{locale: newLocale}})
    // } catch (e) {
    //   console.error(e)
    //   router.push('/')
    // }
  }

}
</script>

<style scoped>
.form-select {
  margin-left: 10px;
  width: 15px;
  background-color: rgba(40, 58, 90, 0.9);
  color: white;
  font-size: 14px;
  
}</style>