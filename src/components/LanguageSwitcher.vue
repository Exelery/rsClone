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
import { supportedLocales, setCurrentLocale } from "../i18n/index"
const { locale } = useI18n()

const changeLanguage = async (event: Event) => {
  if (event.target) {
    const newLocale = (event.target as HTMLInputElement).value
    await setCurrentLocale(newLocale as 'ru' | 'en')
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