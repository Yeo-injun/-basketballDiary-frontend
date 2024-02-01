import Vue from 'vue';
import VueRouter from 'vue-router';

// 해당 방식은 Vue2.x와 Vue3.x 지원
// Vue4.x에서는 VueRouter, Vue 지원 안되고, {}안에 필요한 모듈을 import 시켜야 함
Vue.use(VueRouter);

/** REFERENCE
 * -중첩된 라우트 : https://v3.router.vuejs.org/kr/guide/essentials/nested-routes.html
 */

const router = new VueRouter({
	// Named Router 사용 - 참고자료 : https://velog.io/@yjyoo/vue.js-Vue-Router-%EC%A0%95%EB%A6%AC
	// 기본은 Hash모드지만 이경우 웹브라우저 url입력창에 #이 계속 붙음.
	// 이를 방지하기 위해 history 모드로 변경.
	// requires HTML5 History API and server config. See HTML5 History Mode.
	mode: 'history',
	// routes: Vue router에 의해서 컨트롤되는 페이지 정보를 담는 array객체
	routes: [
		createRoute('views/AppMain', '/', 'MainPage'),
		createRoute('views/user/LoginPage', '/login', 'LoginPage'),
		createRoute('views/user/SignupPage', '/signup', 'SignUpPage'),

		/**
		 * error페이지
		 */
		createRoute('views/errors/ErrorPage', '/error'),

		/**
		 * game페이지
		 */
		createRoute(
			'views/game/creation/GameCreationPage',
			'/game/creation',
			'GameCreationPage'
		),
		createRoute(
			'views/game/joinTeamSelection/GameJoinTeamSelectionPage',
			'/game/joinTeam/selection',
			'GameJoinTeamSelectionPage'
		),
		createRoute(
			'views/game/recordDetail/GameRecordDetailPage',
			'/game/record',
			'GameRecordDetailPage'
		),
		createRoute(
			'views/game/quarterRecordInputBoard/QuarterRecordInputBoardPage',
			'/game/quarter/record/inputBoard',
			'QuarterRecordInputBoardPage'
		),
		createRoute(
			'views/game/quarterRecordDetail/QuarterRecordDetailPage',
			'/game/quarter/record',
			'QuarterRecordDetailPage'
		),

		/**
		 * myTeam페이지
		 */
		createRoute(
			'views/myTeam/list/MyTeamListPage',
			'/myTeams',
			'MyTeamListPage'
		),
		createRoute(
			'views/myTeam/detail/MyTeamDetailPage',
			'/myTeam',
			'MyTeamDetailPage'
		),
		createRoute(
			'views/myTeam/memberManage/MyTeamMemberManagePage',
			'/myTeam/teamMemberManage',
			'MyTeamMemberManagePage'
		),

		/**
		 * team페이지
		 */
		createRoute('views/team/list/TeamListPage', '/teams', 'TeamListPage'),
		createRoute(
			'views/team/registration/TeamRegistrationPage',
			'/team/registration',
			'TeamRegistrationPage'
		),

		/**
		 * authUser페이지 TODO 이름 통일하기 - authUser컨트롤러와 이름 통일(API url도 같이)
		 */
		createRoute(
			'views/authUser/profile/MyProfilePage',
			'/account/profile',
			'MyProfilePage'
		),
		createRoute(
			'views/authUser/PasswordUpdatePage',
			'/account/profile/passwordUpdate',
			'PasswordUpdatePage'
		),
		createRoute(
			'views/authUser/AccountSignOutPage',
			'/account/profile/accountSignOut',
			'AccountSignOutPage'
		),
	],
	// catch (err) {
	// 	alert("dddd");
	// 	if (err.name === 'NavigationDuplicated') {
	// 	  // 중복 내비게이션 오류를 무시하거나 처리합니다.
	// 	  console.log('Avoided redundant navigation error:', err);
	// 	  return;
	// 	} 
	// 	// 그 외의 오류에 대한 처리
	// 	console.error(err);
	// 	throw err;
	// },

});

// // 라우팅 처리전 동작 정의
// router.beforeEach( ( to, from, next ) => {
// 	console.log( to );
// 	console.log( from );
// 	console.log( next );
// 	// 중복 네이게이션 확인 및 처리
// 	const isSameRoute = to.name == from.name && to.path == from.path;
// 	if ( isSameRoute ) {
// 		return;
// 	}

// 	// 이상이 없을경우 다음동작 수행
// 	next();
// });

// TODO  클래스로 만들어서 생성자로 객체 만들기
function createRoute(componentPath, urlPath, componentName, childernList) {
	return {
		path: urlPath,
		/**
		 * https://jess2.xyz/vue/vue-tip/ 의 2. Router&컴포넌트 설계 참고
		 * 코드스플리팅 적용요령 설명(추가 학습 필요)
		 */
		// TODO 컴포넌트 경로 유연하게 설정할 수 있도록 변경 필요
		component: () => import(`@/${componentPath}.vue`),
		children: childernList,
		name: componentName,
		props: true,
	};
}

export default router;

