<template>
    <div>
        <ListProjects/>
    </div>
</template>

<script lang="ts">
    import ListProjects from '@/components/userProjects/ListProjects.vue';
    export default {
        data(){
            return {
                hello: "text    "
            }
        },
        components:{
            ListProjects
        }
    }
</script>