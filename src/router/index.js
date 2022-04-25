// 해당 방식은 Vue2.x와 Vue3.x 지원
// Vue4.x에서는 VueRouter, Vue 지원 안되고, {}안에 필요한 모듈을 import 시켜야 함
import Vue from 'vue';
import VueRouter from 'vue-router';

// import AppMain from '@/components/AppMain.vue';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);
var myTeamPageChildren = [
    createRoute('views/myTeam/MyTeamMember', 'members'),
    createRoute('views/LoginPage', 'test'),
];

export default new VueRouter({
    // 기본은 Hash모드지만 이경우 웹브라우저 url입력창에 #이 계속 붙음.
    // 이를 방지하기 위해 history 모드로 변경.
    // requires HTML5 History API and server config. See HTML5 History Mode.
    mode: "history",
    // routes: Vue router에 의해서 컨트롤되는 페이지 정보를 담는 array객체
    routes: [
        createRoute('views/AppMain', '/'),
        createRoute('views/LoginPage', '/login'),
        createRoute('views/SignupPage', '/signup'),
        /**
         * 중첩된 라우트 : https://v3.router.vuejs.org/kr/guide/essentials/nested-routes.html
         */
        createRoute('views/myTeam/MyTeamPage', '/myTeams', myTeamPageChildren),
        // {
        //     path: '',
        //     component: () => import('@/views/MyTeamPage.vue'),
        //     children: [
        //         {
        //             path: 'members',
        //             component: () => import('@/views/MyTeamMember.vue')
        //         },
        //         {
        //             path: 'test',
        //             component: () => import('@/views/LoginPage.vue')
        //         }
        //     ]
        // }
        // createRoute('MyTeamPage', '/myTeams'),
        // createRoute('MyTeamMember', '/myTeams/members'),
    ]
})


// TODO  클래스로 만들어서 생성자로 객체 만들기
function createRoute(componentPath, urlPath, childernList) {
    var route = 
    {
        path: urlPath,
        /**
         * https://jess2.xyz/vue/vue-tip/ 의 2. Router&컴포넌트 설계 참고
         * 코드스플리팅 적용요령 설명(추가 학습 필요)
         */
        // TODO 컴포넌트 경로 유연하게 설정할 수 있도록 변경 필요
        component: () => import(`@/${componentPath}.vue`),
        children: childernList,
    }
    return route;
} 
