<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';


export default{
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>
.content{
    flex:1;
    margin:20px;
}
</style>