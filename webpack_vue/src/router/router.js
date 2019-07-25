import Detail  from '../pages/detail.vue'
import One  from '../pages/one.vue'

const Fail = () => import('../pages/404.vue');
const Child1 = () => import('../pages/child1.vue')
const Child2 = () => import('../pages/child2.vue')
 


const route = [
    {
        path: '/',
        redirect: '/one'
    },

    {
        
        path: '/detail/:id?',
        component: Detail,
        name: 'Detail',
        props: {
            p1: '3'
        },
        children: [
            {
                path: 'child1',
                name: 'Child1',
                component: Child1
            },
            {
                path: 'child2',
                name: 'Child2',
                component: Child2
            }
        ]
    },
    {
        path: '/one',
        component: One,
        name: 'one'
    },
     {
        path: '/one',
        component: One,
        name: 'one'
    },

    {
        path: '*',
        component: Fail,
        name: Fail
    },    

]
export default route
