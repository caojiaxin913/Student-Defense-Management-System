<template>
    <div class="main">
        <Header></Header>
        <div class="bottom">
            <Aside></Aside>
            <Content></Content>
        </div>
    </div>
</template>

<script>
import Header from './header/index.vue'
import Aside from './aside/index.vue'
import Content from './content/index.vue'
export default {
    components:{
        Header,
        Aside,
        Content
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped lang='less'>
.main{
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .bottom{
        display: flex;
    }
}
</style>