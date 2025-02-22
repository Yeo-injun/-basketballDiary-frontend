<template>
	<div>
		<div v-if="['local', 'development'].includes(this.env)">
			{{ loginUserInfo() }}
			<TestTabLayout :pTabComponents="TabComponents" />
			<GameTimeSelectbox @select-value="onSelectValue" pInitVal="0311"/>
			사용자 브라우저 : {{ this.agentType }}
			<div v-if="$platform.isWeb">
				사용자 클라이언트 Web
			</div>
			<div v-if="$platform.isTablet">
				사용자 클라이언트 Tablet
			</div>
			<EventTestComp />
			<TestSlot :pList="list" :pPagination="pagination" @click-page="onClick">
				<!-- 하위컴포넌트에서 slot에 할당한 데이터를 상위컴포넌트에서는 data라는 변수명으로 사용한다는 문법 -->
				<!-- 상위컴포넌트에서 정의한 변수명 다음으로 하위 컴포넌트에서 정의한 변수명을 사용해야 해당 데이터에 접근가능 -->
				<template v-slot:itemSlot="data">
					<v-container>
						<TestBtn :pBtnName="data.item.name" @do-add="onClick" />
					</v-container>
				</template>
				<!-- 목록이 존재하지 않을 경우 보여줄 컴포넌트 -->
				<template v-slot:itemEmptySlot> 검색결과가 없습니다. </template>
			</TestSlot>
			<StatInput pType="freeThrow" :pCount=3 />
			<RadioInput pLabel="테스트라디오버튼" :pButtons="radioList" pArrangeType="row"/>
		</div>
		<div v-if="this.env == 'production'">
			테스트 컴포넌트 :: 운영 서버입니다.
		</div>
	</div>
</template>

<script>
	import TestTabLayout from '@/components/tab/FrameDefaultTabContainer.vue';

	import AuthManager from '@/common/auth/AuthManager.js';
	
	import GameTimeSelectbox from '@/components/selectbox/game/GameTimeSelectbox.vue';
	import EventTestComp from '@/components/EventTestComp.vue';
	import TestSlot from '@/components/list/FramePaginationList.vue';
	import TestBtn from '@/components/button/FrameAddBtn.vue';
	/** 스탯 버튼 테스트 */
	import StatInput from '@/components/game/stat/StatClickInputComp.vue';
	// 라디오 컴포넌트
	import RadioInput from '@/components/input/FrameRadioInput.vue';

	import BytesUtil from '@/common/util/BytesUtil';

	/**
	 * 부모-자식 컴포넌트간 LifeCycle 정리
	 * 1. <script> 초기화하여 VueInstance생성
	 * 		- 자식 => 부모 순으로 <script>태그가 실행됨
	 * 		- 이를 비춰볼때 자식 => 부모 순으로 VueInstance생성 추정 
	 * 2. LifeCycle Hook 호출 순서
	 * 		- 부모 컴포넌트의 template 컴파일까지 실행( beforeCreated - Created - beforeMounted )
	 * 		- 자식 컴포넌트의 DOM생성까지 진행( beforeCreated - Created - beforeMounted - Mounted )
	 * 		- 부모 컴포넌트의 DOM생성 ( Mounted )
	 */

	export default {
		/**
		 * Vue Life Cycle 테스트 : Hook 호출 테스트
		 */
		beforeCreate() {
			console.log( "LifeCyle테스트 :: beforeCreate()" );
			console.log( this );
			console.log( "===================================" );
		},
		created() {
			console.log( "LifeCyle테스트 :: created()" );
			console.log( this );
			console.log( "===================================" );
		},
		beforeMount() {
			console.log( "LifeCyle테스트 :: beforeMount()" );
			console.log( this );
			console.log( "===================================" );
		},
		mounted() {
			console.log( "LifeCyle테스트 :: mounted()" );
			console.log( this );
			console.log( "===================================" );
		},
		components: {
			TestTabLayout,
			GameTimeSelectbox,
			EventTestComp,
			TestSlot,
			TestBtn,
			StatInput,
			RadioInput,
		},
		data() {
			console.log( "LifeCyle테스트 :: VueInstance.data()" );
			console.log( this );
			console.log( "===================================" );
			const userAgentType = navigator.userAgent;
			return {
				// 실행 환경 확인
				env: process.env.NODE_ENV,
				list: [{ name: '가' }, { name: '나' }, { name: '다' }],
				pagination: null,
				dataSize : "",
				agentType : userAgentType,
				radioList : [{ value : "1", label : "테스트" }, { value : "2", label : "테스트ㅇ" }],
				TabComponents : [
					{ component: TestBtn , label: '팀원'     , },
					{ component: StatInput   , label: '팀경기'   , },
					{ component: StatInput    , label: '회비'     , },
				],
			};
		},
		methods: {
			loginUserInfo() {
				return AuthManager.getUserInfo();
			},
			onClick() {
				this.pagination = {
					pageNo: 2,
					totalPageCount: 5,
					totalCount: 0,
				};
			},
			onChangeByteUtilTest( bytes ) {
				this.dataSize = BytesUtil.withUnit( bytes );
			},
			onSelectValue( val ) {
				console.log( val );
			},
		},
	};
</script>
