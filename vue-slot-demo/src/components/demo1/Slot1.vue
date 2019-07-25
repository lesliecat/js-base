<template>
    <div class="father">
        <h3  @click="fun2">这里是父组件</h3>
        <child>
            <div class="tmpl">
              <span>{{tt | concon}}</span>
              <span>{{tt | vanvan}}</span>
              <span>菜单3</span>
              <span>{{countReduce}}</span>
              <span>{{countPlus}}</span>
              <span>{{count}}</span>
            </div>
        </child>
    </div>
</template>

<script>
  import Child from './Child.vue'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        data: function () {
            return {
                msg: '',
                tt: 3
            }
        },
        components:{
          'child': Child
        },
        computed: {
          ...mapState(['count']),
          ...mapGetters(['countPlus', 'countReduce']),
        },
        created() {
        },
        methods: {
          ...mapMutations(['reduce']),
          ...mapActions({
            'bbbb': 'kkkk'
          }),
          fun1() {
            this.reduce(3)
          },
          fun2() {
            this.bbbb(100).then((res) => {
              console.log(res)
            })
          }
        },
        filters: {
          concon(val) {
            return val + 4444
          }
        }
    }
</script>

<style scoped>
  .father{
    width:100%;
    background-color: #ccc;
    height: 650px;
  }
  .tmpl{
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 30%;
    margin: 0 auto;
  }
  .tmpl span{
    border:1px solid red;
    height:50px;
    line-height: 50px;
    padding: 10px;
  }
</style>
