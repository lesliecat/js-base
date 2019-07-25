<template>
    <div id="app">
        <h3>app</h3>
        <keep-alive>
            <router-view></router-view>
        </keep-alive> 

    </div>
</template>

<script>
export default {

    created() {
        let a = function() {
            return new Promise((resolve,reject) => {
                resolve()
            })
        }

        a().then(() =>{
            console.log('这是then')
        })


        this.$nextTick(() => {
            console.log('这是tick')
        })
    },
    mounted() {
        console.log(this.$route)
    }
    
}
</script>

