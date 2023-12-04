<template>
	<v-container>
		<h2>팀 정보</h2>
		<v-container v-if="this.isLoadingComplete">
			<v-row dense>
				<HomeTeamInfoComp
					:pGameJoinTeamInfo="this.gameJoinTeamsInfo.homeTeamInfo"
				/>
				<AwayTeamInfoComp
					:pGameJoinTeamInfo="this.gameJoinTeamsInfo.awayTeamInfo"
				/>
			</v-row>
		</v-container>
	</v-container>
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

	import HomeTeamInfoComp from '@/views/game/recordDetail/components/GameJoinTeamInfoComp.vue';
	import AwayTeamInfoComp from '@/views/game/recordDetail/components/GameJoinTeamInfoComp.vue';

	export default {
		components: {
			HomeTeamInfoComp,
			AwayTeamInfoComp,
		},
		props: {
			pGameJoinTeamsInfo: Object,
			pGameSeq: Number,
		},
		data() {
			return {
				isLoadingComplete: false,
				gameJoinTeamsInfo: {},
			};
		},
		methods: {
			async getGameJoinTeamsInfo() {
				const res = await GameAPI.getGameJoinTeamsInfo({
					gameSeq: this.pGameSeq,
				});
				// TODO mounted() 되는 시점과 data() 내부의 메소드가 호출되는 시점을 비교할 필요가 있음
				// 데이터 초기화를 위한 메소드를 언제 호출할 것인지 고민 필요
				// mounted()는 재렌더링이 안되는지..?
				this.gameJoinTeamsInfo = {
					homeTeamInfo: res.data.homeTeamInfo,
					awayTeamInfo: res.data.awayTeamInfo,
				};
				this.isLoadingComplete = true;
			},
		},
		mounted() {
			this.getGameJoinTeamsInfo();
		},
	};
</script>

<style lang="scss" scoped></style>
