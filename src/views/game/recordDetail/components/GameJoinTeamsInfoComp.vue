<template >
	<v-row dense>
		<HomeTeamInfoComp
			:pGameJoinTeamInfo="this.homeTeamInfo"
		/>
		<AwayTeamInfoComp
			:pGameJoinTeamInfo="this.awayTeamInfo"
		/>
	</v-row>
</template>

<script>
	/**
	 * 23.02.02(목) 인준
	 * >> 참고자료 / Vue 라이프 사이클 -> Rendering 방식순서 원리 파악 필요
	 * : Vue Rendering 방식 : https://vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom
	 * : https://pinokio0702.tistory.com/363
	 * : Component의 Created와 mounted 순서 이해 : https://pooney.tistory.com/87
	 *
	 * API(비동기) 데이터를 자식 컴포넌트로 내려줄 경우
	 * 데이터가 없는 상태에서 하위 컴포넌트가 먼저 Rendering 됨.
	 *
	 * 이는, Vue의 컴포넌트 Rendering 순서가 자식 -> 부모 순이기 때문.
	 * 따라서 if 디렉티브를 사용해서 API(비동기 통신)로 데이터를 가져왔을때
	 * 자식 컴포넌트가 렌더링 될 수 있도록 제어해야함.
	 *
	 * if 디렉티브로 컴포넌트를 제어했을 경우 true일 경우에만
	 * 해당 컴포넌트가 DOM에 그려짐
	 *
	 * Vue Component는 created된 후 V-DOM이 만들어지고,
	 * V-DOM을 기준으로 Real-DOM이 렌더링 된다.
	 * 렌더링 과정을 mounted된다(?)라고 칭한다.
	 *
	 * created는 부모 -> 자식순으로
	 * mounted는 자식 -> 부모순으로 진행된다.
	 *
	 * <VueParent>
	 * 		<VueChild></VueChild>
	 * </VueParent>
	 * 의 구조일 경우
	 *
	 * 1. VueParent created
	 * 2. VueChild created
	 * 3. VueChild mounted
	 * 4. VueParent mounted
	 *
	 * 순으로 작동할 것이다.
	 *
	 */
	import GameAPI from '@/api/GameAPI.js';

	import HomeTeamInfoComp from '@/views/game/recordDetail/components/team/GameJoinTeamInfoComp.vue';
	import AwayTeamInfoComp from '@/views/game/recordDetail/components/team/GameJoinTeamInfoComp.vue';

	export default {
		/**
		 * 24.06.07 ( 금 )
		 * 컴포넌트의 생명주기상 부모 -> 자식 순으로 created()훅이 호출됨.
		 * 따라서 자식 컴포넌트의 created()되기 전에 부모의 created()가 먼저 호출됨.
		 * 이에 따라 부모에서 자식으로 props를 넘겨준다면 해당 props를 부모의 created()가 호출되는 시점에 초기화시켜주는 것이 순서상 맞음.
		 * cf. 하지만, 비동기 API통신을 통해 데이터를 세팅해줄 경우 호출 순서가 예상처럼 동작하진 않음...
		 * 	   자식 컴포넌트의 props 오류 발생을 회피 방법 : props가 없을 경우 기본값을 세팅하거나 null처리를 추가.
		 */
		created() {
			this.initComponentData();
		},
		components: {
			HomeTeamInfoComp,
			AwayTeamInfoComp,
		},
		props: {
			pGameSeq: String,
		},
		data() {
			return {
				homeTeamInfo : {},
				awayTeamInfo : {},
			};
		},
		methods: {
			async initComponentData() {
				const { data } = await GameAPI.getGameJoinTeamsInfo({
					gameSeq: this.pGameSeq,
				});
				this.homeTeamInfo = data.homeTeamInfo;
				this.awayTeamInfo = data.awayTeamInfo;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
