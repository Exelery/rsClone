<template>
    <div class="d-flex p-1 btn-tab text-bg-dark">
        <button v-for="tab in tabsList" @click="()=> setActivePage(tab.name, tab.type)" class="tab btn btn-primary">{{tab.name}}</button>
    </div>
</template>

<script lang="ts">
import { useEditorStore } from '@/stores/editor'
    export default {
        data(){
            let data : {
                tabsList: {
                    type: string,
                    name: string
                }[]
                } = {
                    tabsList: [],
                };

            return data
        },
        methods:{
            setActivePage(name: string, type: string){
                useEditorStore().setActivePage(name)
                this.$router.push('/builder/' + (type === 'page')?'create':'editor');
            }
        },
        created(){
            for(let page in localStorage){
                if(page.includes(`/${localStorage.getItem("activeProject")}/page`)){
                    this.tabsList.push({
                        type: "page",
                        name: page.split("/")[0]
                    })
                }
            }
        useEditorStore().$onAction((e)=>{
            if(e.name === 'addTab'){
               this.tabsList.push(e.args[0]);
               localStorage.setItem("tabsList", JSON.stringify(this.tabsList))
            }
        },true)
    }
    }
</script>

<style>
.btn-tab button{
    padding: 2px 20px !important;
    font-size: 16px;
    margin-right: 5px;
}
</style>