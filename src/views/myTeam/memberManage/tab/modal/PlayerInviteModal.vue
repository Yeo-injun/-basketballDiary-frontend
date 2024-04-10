<template>
	<!-- v-dialog태그 안에는 2가지 영역으로 분리됨. (컨텐츠 영역과 activator 영역) -->
	<!-- activator영역이 팝업 이전의 영역으로 팝업창을 띄울 수 있는 버튼이 존재 -->
	<!-- 컨텐츠 영역은 팝업될 내용들이 존재하는 영역 -->
	<v-dialog v-model="dialog" max-width="800px">
		<!-- 컨텐츠 영역 -->
		<div>
			<v-card>
				<v-toolbar dark color="grey">
					<v-toolbar-title>선수초대하기</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn icon dark @click="dialog = false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>

				<!-- 선수 검색 영역 -->
				<v-card-title>선수 검색</v-card-title>
				<v-container>
					<UserSearchList
						:pTeamSeq="this.pTeamSeq"
						pRowBtnName="선수초대"
						@click-row-btn="sendInvitation"
					/>
				</v-container>
			</v-card>
		</div>

		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right">
				<v-btn class="mt-2 mb-2" color="primary" dark v-bind="attrs" v-on="on">
					선수초대하기
				</v-btn>
			</div>
		</template>
	</v-dialog>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';
	/** Code */
	/** Utils */
	/** Components */
	import UserSearchList from '@/components/user/search/UserSearchListComp.vue';
	/** Emit Event */
	
	export default {
		components: {
			UserSearchList,
		},
		props: {
			pTeamSeq: Number,
		},
		data() {
			return {
				dialog: false, // 모달창 제어목적의 변수
			};
		},
		watch: {
			// 팝업창을 열고 닫는 dialog data를 감시하여 해당 데이터에 따라 콜백 함수 처리
			dialog: function (isDialogOpend) {
				if (isDialogOpend) {
					return;
				}
				// 팝업창이 닫히면 검색조건 초기화 
				// TODO 자식 컴포넌트에서 제어할 수 있도록 구현하기
				this.$emit('close');
			},
		},
		methods: {
			async sendInvitation(e) {
				if (!confirm('초대요청을 보내시겠습니까?')) {
					return;
				}
				const params = {
					teamSeq: this.pTeamSeq,
					userSeq: e.userSeq,
				};
				await MyTeamAPI.inviteTeamMember(params);
				alert('초대 완료했습니다. 선수의 승인을 기다리세요.');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
