import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
// import Home from '@/views/Home.vue'
import DeckList from '@/views/Deck/DeckList.vue'
// import DeckView from '@/views/Deck/DeckView.vue'
import Treasure from '@/views/Treasure/Index.vue';
import Topping from '@/views/Topping/Index.vue';
import Dragon from '@/views/Dragon/HP.vue';
import Cookies from '@/views/Cookie/Index.vue';
import DeckForm from '@/views/Deck/DeckForm.vue';
import Coupon from '@/views/Coupon/Index.vue';
import BoardList from '@/views/Board/List.vue';
import BoardView from '@/views/Board/View.vue';
import BoardForm from '@/views/Board/Form.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/deck',
        name: 'deckForStory',
        component: DeckList,
        props: (router) => ({mode: router.query.mode})
    },
    {
        path: '/deck/write',
        name: 'writeNewDeck',
        component: DeckForm,
        props: (router) => ({mode: router.query.mode, id: router.query.id})
    },
    {
        path: '/calc/dragon/hp',
        name: 'dragonCalculator',
        component: Dragon,
    },
    {
        path: '/cookies',
        name: 'cookie',
        component: Cookies
    },
    {
        path: '/treasures',
        name: 'treasure',
        component: Treasure
    },
    {
        path: '/topping',
        name: 'topping',
        component: Topping
    },
    {
        path: '/board/community',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/board/community/write',
        name: 'BoardWrite',
        component: BoardForm
    },
    {
        path: '/board/community/view/:boardId',
        name: 'BoardView',
        component: BoardView,
        props: true,
    },
    // {
    //     path: '/event',
    //     name: 'event',
    //     component: Home
    // },
    {
        path: '/coupon',
        name: 'coupon',
        component: Coupon
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
