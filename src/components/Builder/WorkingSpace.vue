<template>
    <div>
        <EditMenu :parent="workingParent" :editSave="editBlock" />
        <ModalNewPrject/>
    <div ref="workingSpace" class="working-space">
        <draggable
        v-model="blocks"
        group="people"
        @start="drag(true)"
        @end="drag(false)"
        item-key="id"
        :disabled="false"
        class="working-space-drop"
        >
            <template  #item="{element}">
                <div
                @mouseover="edit($event)"
                @mouseout="removeEdit($event)"
                @click="darragableClick($event)"
                class="block"
                >
                    <div v-html="element.data"></div>
                </div>  
            </template>
        </draggable>
    </div>
    <div class="position-absolute d-flex"  style="right: 25px; bottom: 25px;">
        <button type="button" class="btn btn-success button-control" data-bs-toggle="modal" data-bs-target="#myModal">
            New page <i class="bi bi-file-earmark-code-fill"></i>
        </button>
        
        <button type="button" @click="$router.push('/builder/editor')" class="btn btn-dark button-control">Edit page <i class="bi bi-code-slash"></i></button>
        <button type="button" @click="show" class="btn btn-primary button-control">fullScreen <i class="bi bi-eye"></i></button>
        <button type="button" @click="preview" class="btn btn-primary button-control">
            Preview
        </button>
    </div>
</div>
</template>

<script lang="ts">
import { useEditorStore } from '@/stores/editor'
import draggable from 'vuedraggable'
import blocks from '@/blocks/';
import EditMenu from '@/components/Builder/EditMenu.vue';
import ModalNewPrject from '@/components/Builder/ModalNewPrject.vue';

export default {
    data() {
        let data : any = {
            htmlHeader: `<head><link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>`,
            enabled: true,
            blocks: [],
            blocksType: '',
            dragging: false,
            workingParent: this.$refs.workingSpace as HTMLElement,
            editIndex: 0,
            activeProject: '',
            activePage: useEditorStore().activePage
        }
        return data
    },
    methods:{
        preview(){
            let storeData = localStorage.getItem(`${useEditorStore().activePage}/${this.activeProject}/page`)
            let data = JSON.parse(String(storeData))
            let htmlString = '';
            data.forEach((block: {data: string}) => {
                htmlString += block.data;
            });
            let myWindow = window.open();
            myWindow!.document.write(this.htmlHeader + htmlString);
        },
        editBlock(){
            this.blocks[this.editIndex].data = document.querySelector(".working-space")!.querySelectorAll('[data-draggable]')[this.editIndex].innerHTML
        },
        saveBlocks(){
            localStorage.setItem(this.activePage + `/${this.activeProject}/page`, JSON.stringify(this.blocks))
        },
        darragableClick(event: Event){
            document.querySelector(".working-space")!.querySelectorAll('[data-draggable]').forEach((listElement, index) =>{
                if (event.currentTarget == listElement) {
                    this.editIndex = index
                }
            })
        },
        edit(event: Event){
            let elem = (event.currentTarget) as HTMLElement;
            elem.setAttribute("style", "outline: 2px solid rgb(67, 211, 255)")
            elem.getBoundingClientRect();
            // https://api.unsplash.com/search/photos?page=1&query=mountain&client_id=yugMy1rL6bPUQVHjtXVFzkZWc8mRLS0EOqrb6IAw3oA&per_page=2
        },
        removeEdit(event: Event){
            let elem = (event.currentTarget) as HTMLElement;
            elem.removeAttribute("style")
        },
        drag(isStart: boolean){
            if(!isStart){
                this.saveBlocks();
            }
            useEditorStore().setActive(isStart?"delete":"navBar");
        },
      show() {
            let workingSpace = this.$refs.workingSpace as HTMLElement;
            if(workingSpace.className.includes("active")){
                workingSpace.classList.remove("active")
            }else{
                workingSpace.classList.add("active")
            }  
        },
        getParent(){
            return this.$refs.workingSpace;
        }

    },
    watch:{
        blocks(newList){
            newList.forEach( (block : any, index: number) => {
                if(block.id == null){
                    block.id = Math.random().toString(36).slice(-10)
                }
            })
            this.saveBlocks()
        }
    },
    components:{
        draggable,
        EditMenu,
        ModalNewPrject
    },
    created(){
        if(localStorage.getItem("activeProject") == null){
            localStorage.setItem("activeProject","first");
        }
        const setList = () =>{
        this.activeProject = localStorage.getItem("activeProject");
            if(localStorage.getItem(this.activePage + `/${this.activeProject}/page`) != null){
                this.blocks = JSON.parse(String(localStorage.getItem(this.activePage + `/${this.activeProject}/page`)))
            }
        }

        setList()

        this.workingParent = this.$el
        useEditorStore().$onAction((e)=>{
            if(e.name === 'setActive'){
                this.blocksType = e.args[0];
            }

            if(e.name === 'setActivePage'){
                this.activePage = e.args[0];
                setList()
            }
        },true);
    
    }
}
</script>

<style>
.working-space{
    position: absolute;
    right: 0;
    margin: auto;
    width: 100vw;
    height: 280vh;
    overflow-y: auto;
    max-width: 1824px;
    max-height: 824px;
    scale: 0.5;
    transform: translateY(10px);
    transform-origin: calc(630px + 50%) top;
    background: rgb(230, 230, 230);
    transition: all 0.2s ease-in;
}
.working-space-drop{
    height: 100%;
    width: 100%;
}
.active.working-space{
    scale: 1;
    transform: translateY(0px);
    transform-origin: 0 0;
    width: 100vw;
    height: 100vh;
    top: 0;
}
.working-space .block{
    margin-top: 0;
    background: auto;
    padding: 0;
    border-spacing: 2px;
}
.working-space .block *:hover {
    outline: 2px solid #5392ff;
}
.button-control{
    margin-right: 3px;
    color: #fff;
}
</style>