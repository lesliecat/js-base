<template>
    <div>
        这是One
        <router-link tag="li" :to="{name: 'Detail'}">定向到detail</router-link>
       <router-link tag="li" :to="{name: 'Detail',params: {id:'2'}}">定向到detail</router-link>
       <router-link tag="li" to="/detail/123">定向到detail</router-link>
       <router-link tag="li" :to="{path: '/detail/123/child1'}">定向到detail</router-link>
        
    </div>
</template>

<script>
export default {
    
}
</script>

