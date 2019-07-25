<template>
    <div>
        <h3>这是detail</h3>
        <router-link tag="li" :to="{name: 'Child1'}">定向到child1</router-link>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>


<script>
export default {
    props: {
        p1: {
            type: String,
            default: ''
        }
    },
    mounted() {
        console.log(this.$route)
        // alert(this.p1)
    }
}
</script>

