<template>
    <div id="child1">
        <h3>这是child1</h3>
        <router-link tag="li" :to="{name: 'Child2'}" class="aa">定向到child2</router-link>
    </div>
</template>


<script>
export default {
    mounted() {
        console.log(this.$route)
    },
    beforeRouteEnter(to, from, next) {
        console.log(to)
        next()
    }
}
</script>

<style >
    #child1 {
        height: 3000px;
    }
    .aa {
        margin-top: 1000px;
    }
</style>


