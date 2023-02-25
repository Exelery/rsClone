<template>
  <div>
    <LoadButton :loading="isLoadingAll" v-on:click="getData" class="btn btn-primary me-2">Get Projects of User</LoadButton>
    <LoadButton :loading="isLoadingUpdate" v-on:click="updateProject" class="btn btn-primary me-2">Update Project</LoadButton>
    <LoadButton :loading="isLoadingDelete" v-on:click="deleteProject" class="btn btn-primary me-2">Delete project</LoadButton>
    <LoadButton :loading="isLoadingAdd" v-on:click="addProject" class="btn btn-primary me-2">Add project</LoadButton>
    <label for="id">projectId</label>
    <input type="number" v-model="projectId" name="id" id="">
    <LoadButton :loading="isLoadingBind" v-on:click="bindProject" class="btn btn-primary me-2">Bind project</LoadButton>
    <!-- <LoadButton :loading="isLoadingBind" v-on:click="showRoutes" class="btn btn-primary me-2">show routes</LoadButton> -->
    <!-- <RouterLink v-if="url" to={{ url }} class="btn-get-started scrollto me-2">page</RouterLink> -->
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import type { RouteLocation } from 'vue-router';
import Auth from '../api/authApi';
import DataApi from '../api/dataApi';
import LoadButton from '../components/LoadButton.vue'
import createNewPage from "../utils/generator"
import TestLoadData from '@/components/TestLoadData.vue'
import router from '@/router';

let isLoadingAll = false
let isLoadingAdd = false
let isLoadingUpdate = false
let isLoadingDelete = false
let isLoadingBind = false
let projectId = 1

const showRoutes= () => {
  console.log(router.getRoutes())
}

const getData = async () => {
  isLoadingAll = true
  const answer = await DataApi.getUserProjects()
  console.log('answer', answer.data.value)
  isLoadingAll = false
}

const deleteProject = async () => {
  isLoadingDelete = true
  const answer = await DataApi.deleteProject(projectId)
  console.log('answer', answer.data.value)
  isLoadingDelete = false
}
let url: RouteLocation 

const bindProject = async () => {
  isLoadingBind = true
  console.log(projectId)
  const answer = await DataApi.bindProject(projectId)
  // console.log('answer', answer.data.value)
  // const randomNumber = Math.floor(Math.random() * 1001);
  isLoadingBind = false
  // url =  createNewPage(`/newpath${randomNumber}`, 'MyNewPage', answer.data.value )
  // console.log('url', url)
  // router.push(url)
  console.log(answer.data)


}

const updateProject = async () => {
  isLoadingUpdate = true
  const data = {
    projectId: 2,
    projectName: "zero",
    data: [{ fileName: "html.html", content: "<html><html>" },
    { fileName: "style.html", content: "<style><style>" }]
  }
  const answer = await DataApi.updateProject(data)
  console.log('answer', answer.data)
  isLoadingUpdate = false

}

const addProject = async (projectName: string) => {
  isLoadingUpdate = true
  const data = {
    projectName,
    data: [{ fileName: "Main.json", content: "[]" }]
  }
  const answer = await DataApi.addProject(data)
  console.log('answer', answer.data)
  isLoadingUpdate = false
  

}
</script>

<style lang="sass" scoped>

</style>