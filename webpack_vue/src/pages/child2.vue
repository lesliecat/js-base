<template>
    <div id="child2">
        <h3>这是child2</h3>
        <router-link tag="li" :to="{name: 'Child1'}" class="aa">child1</router-link>
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
    #child2 {
        height: 3000px;
    }
    .aa {
        margin-top: 1000px;
    }
</style>


