<template>
    <div>
    <ModalLinkConnect/>
        <div @click="preventEdit()" ref="editMenu" class="edit-menu">
        <div class="edit-button" :class="{'btn-active-blue' : buttonActive == 'elementEditText'}" @click="elementEditText()">
            <i class="bi bi-pen"></i>
        </div>
        <div class="edit-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="bi bi-link-45deg"></i>
        </div>
        <div class="edit-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="bi bi-card-image"></i>
        </div> 
    </div>
    </div>
</template>

<script lang="ts">
// import Sortable from 'sortablejs';
import interact from 'interactjs'
import ModalLinkConnect from './ModalLinkConnect.vue';

export default {
    props: ["parent","editSave"],
    data(){
        return {
            canMove: true,
            elementEdit: document.body,
            buttonActive: ''
        }
    },
    methods:{
        preventEdit(){
            this.canMove = false;
            this.elementEdit.classList.add("element-edit")
        },
        elementEditText(){
            this.buttonActive = "elementEditText"
            this.elementEdit.setAttribute("contenteditable","true")
            this.elementEdit.focus()
        }
    },
    components:{
        ModalLinkConnect
    },
    created(){
        onmousemove = (e) => {
            try{
            let parentEl = this.$el.parentElement.querySelector(".working-space").getBoundingClientRect();
            let editMenu = this.$refs.editMenu as HTMLDivElement;
            if( parentEl.x <= e.clientX 
                && parentEl.top + 50 <= e.clientY 
                && parentEl.bottom >= e.clientY
                && parentEl.right >= e.clientX )
            {
                if(this.canMove)
                editMenu.setAttribute("style", `top: ${e.clientY - 65}px; left: ${(e.clientX + 200 > parentEl.right)?e.clientX - 100:e.clientX}px;`)
            }else{
                try{
                    editMenu.setAttribute("style", `top: ${e.clientY - 65}px; left: ${(e.clientX + 200 > parentEl.right)?e.clientX - 100:e.clientX}px;scale:0`)
                }catch(e){

                }
            }
        }catch(e){

        }
        }  
    },
    mounted(){
        this.$el.parentElement.querySelector(".working-space").addEventListener('click', (e: Event)=>{
            let ActiveTarget = e.target as HTMLElement;
            if(this.canMove){
                ActiveTarget.classList.add("element-edit");
                this.canMove = false;
                this.elementEdit = ActiveTarget;
                
                var x = 0; var y = 0;

                interact(ActiveTarget)
                    .resizable({
                        edges: { top: true, left: true, bottom: true, right: true },
                        listeners: {
                          move: function (event) {
                            let { x, y } = event.target.dataset
                        
                            x = (parseFloat(x) || 0) + event.deltaRect.left
                            y = (parseFloat(y) || 0) + event.deltaRect.top
                        
                            Object.assign(event.target.style, {
                                width: `${event.rect.width}px`,
                                height: `${event.rect.height}px`,
                                transform: `translate(${x}px, ${y}px)`
                            })

                                Object.assign(event.target.dataset, { x, y })
                            }
                        }
                    })

            }else if(!this.canMove && !ActiveTarget.className.includes("element-edit")){
                this.buttonActive = ""
                document.querySelector(".element-edit")?.classList.remove("element-edit")
                this.canMove = true;
                this.elementEdit.removeAttribute("contenteditable")
                this.editSave()
            }
       })
    }
}
</script>

<style>
.edit-menu{
    position: fixed;
    left: 0;
    display: flex;
    background: #fff;
    border-radius: 50px;
    z-index: 999999999999999;
    box-shadow: 0px 0px 7px #c4c4c4;
    padding: 2px;
    transition: all 0.1s linear;
}
.edit-button{
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ececec;
    margin: 2px;
}

.btn-active-blue{
    background: rgb(32, 32, 255);
    color: #fff;
}

.active-target{
    border: 4px solid #14dffd
}

.element-edit{
    outline: 2px solid #e8d100 !important;
}
</style>