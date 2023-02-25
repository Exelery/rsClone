<template>
    <!-- {{ $route.params.id }} -->
    <!-- {{ state.reactiveVariable }} -->
    <div v-html="html"></div>
    <!-- <div v-bind="html"></div> -->
</template>

<script setup lang="ts">
import DataApi from '@/api/dataApi';
import { useRoute } from 'vue-router'
import { reactive } from 'vue';

const route = useRoute()
const state = reactive({
      reactiveVariable: 'initial value'
    });

const bindProject = async () => {
  // route.params.id.toString()
  // isLoadingBind = true
  const answer = await DataApi.bindProject(Number(route.params.id))
  console.log('answer', answer.data.value)
  state.reactiveVariable = answer.data.value
 return  answer.data.value

}
bindProject()

const html = `<head><link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"><link href="https://wbbuilder.000webhostapp.com/style.css" rel="stylesheet"></head>
        <nav class="navbar navbar-expand-md bg-white">
          <a class="navbar-brand" href="https://www.froala.com">
            <img src="https://heroic-empanada-f5b342.netlify.app/logo.png" height="30" alt="image">
          </a>
    
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav3" aria-controls="navbarNav3" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarNav3">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="https://www.froala.com">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Team</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">About</a>
              </li>
            </ul>
    
            <a class="btn btn-outline-primary ml-md-3" href="https://www.froala.com">Button</a>
          </div>
        </nav>
      <section class="fdb-block">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8 text-center">
            <h1>Blocks Design Blocks</h1>
            <p class="lead">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far <a href="https://www.Blocks.com">World of Grammar</a>.</p>
          </div>
        </div>
      </div>
    </section><footer class="fdb-block footer-small bg-dark">
      <div class="container">
        <div class="row text-center align-items-center">
          <div class="col">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" href="https://www.froala.com">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Privacy Policy</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">Terms</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">About</a>
              </li>
            </ul>
    
            <p class="h5 mt-5">© 2013-2018 Froala</p>
          </div>
        </div>
      </div>
    </footer>`
</script>

<style scoped>
</style>