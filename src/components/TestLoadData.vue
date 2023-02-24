<template>
  <div>
    <LoadButton :loading="isLoadingAll" v-on:click="getData" class="btn btn-primary me-2">Get Projects of User</LoadButton>
    <LoadButton :loading="isLoadingUpdate" v-on:click="updateProject" class="btn btn-primary me-2">Update Project</LoadButton>
    <LoadButton :loading="isLoadingDelete" v-on:click="deleteProject" class="btn btn-primary me-2">Delete project</LoadButton>
    <LoadButton :loading="isLoadingAdd" v-on:click="addProject" class="btn btn-primary me-2">Add project</LoadButton>
    <LoadButton :loading="isLoadingBind" v-on:click="bindProject" class="btn btn-primary me-2">Bind project</LoadButton>
  </div>
</template>

<script setup lang="ts">
import Auth from '../api/authApi';
import DataApi from '../api/dataApi';
import LoadButton from '../components/LoadButton.vue'
let isLoadingAll = false
let isLoadingAdd = false
let isLoadingUpdate = false
let isLoadingDelete = false
let isLoadingBind = false

const getData = async () => {
  isLoadingAll = true
  const answer = await DataApi.getUserProjects()
  console.log('answer', answer.data.value)
  isLoadingAll = false
}

const deleteProject = async () => {
  isLoadingDelete = true
  const answer = await DataApi.deleteProject(0)
  console.log('answer', answer.data.value)
  isLoadingDelete = false
}

const bindProject = async () => {
  isLoadingBind = true
  const answer = await DataApi.bindProject(11)
  console.log('answer', answer.data.value)
  isLoadingBind = false

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