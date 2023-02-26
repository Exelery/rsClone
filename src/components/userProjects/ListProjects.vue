<template>
    <div>
        <main class="gallery">
  <ul class="gallery__list">

    <li class="create-project" @click="createPorject()">

            <h1><i class="bi bi-cloud-plus"></i></h1>
            <h2>Create project</h2>
    </li>

    <li class="project-card" 
        v-for="(project, index) in projectList" :key="project.projectName"
        @click="loadProject(index)"
    >
        <h2>
            {{ project.projectName }}
        </h2>
    </li>

  </ul>
</main>
    </div>
</template>

<script lang="ts">
import DataApi from '@/api/dataApi';
export default {
    data(){
        let data : any = {
            isLoadingAll: false,
            projectList: [],
            newProjectName:""
        };

        return data
    },
    methods:{
        async getListProjects() {
            
                this.isLoadingAll = true
                const answer = await DataApi.getUserProjects()
                console.log('answer', answer.data.value)
                this.projectList = answer.data.value
                this.isLoadingAll = false
            
        },
        async createPorject(){
            this.newProjectName = prompt("Project name","");
            
            if(this.newProjectName != null){
                
                this.isLoadingAll = true
                const data = {
                  projectName: this.newProjectName ,
                  data: [{ fileName: "Main.json", content: "[]" }]
                }
                const answer = await DataApi.addProject(data)
                console.log('answer', answer.data)
                this.isLoadingAll = true
            }
        },
        loadProject(index: number){
            this.clearProjectsHistory();
            let selectedProject = this.projectList[index];
            let projectTabs: { type: string; name: string; }[]= [];
            localStorage.setItem("activeProject", selectedProject.projectName);
            localStorage.setItem('activeProjectId',  selectedProject.projectId);
            
            selectedProject.projectFiles.forEach((element: {content: string[], fileName: string}) => {
                if(element.fileName.includes(".json")){
                    localStorage.setItem(`${element.fileName.split('.')[0]}/${selectedProject.projectName}/page`, String(element.content));
                    projectTabs.push({
                        type: 'page',
                        name: element.fileName.split('.')[0]
                    })
                }
            });

            localStorage.setItem('tabsList', JSON.stringify(projectTabs));

            this.$router.push('/builder/create');
        },
        clearProjectsHistory(){
            for(let page in localStorage){
                if(page.includes("/page")){
                    localStorage.removeItem(page);
                }
            }
        }
    },
    created(){
        this.getListProjects()
    }
}

</script>

<style>

.gallery .gallery__list {
  display: grid;
  list-style: none;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  grid-template-rows: repeat(6, 200px);
  grid-gap: 1rem;
  grid-auto-flow: dense;
}

.gallery .gallery__list li{
  grid-column: span 1;
  grid-row: span 1;
  background: #d4d4d4;
  cursor: pointer;
}

.gallery .gallery__list .create-project h1{
    font-size: 100px;
    text-align: center;
    opacity: 0.5;
    margin-top: 20px;
}

.gallery .gallery__list .create-project h2{
    text-align: center;
    transform: translateY(-20px);
    opacity: 0.5;
}

.gallery .gallery__list .project-card h2{
    text-align: center;
}

</style>