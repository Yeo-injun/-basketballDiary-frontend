<template>
	<ModalFrame ref="modal" >
		<template v-slot:modal-activator="{ isActive }">
			<div class="text-right">
				<v-btn class="mt-2 mb-2" color="primary" dark v-on="isActive">
					선수초대하기
				</v-btn>
			</div>
		</template>

		<template v-slot:title>
			<v-toolbar dark color="grey">
				<v-toolbar-title>선수초대하기</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn icon dark @click="closeModal()">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>
		</template>

		<template v-slot:contents>
			<!-- 선수 검색 영역 -->
			<v-card-title>선수 검색</v-card-title>
			<v-container>
				<UserSearchList
					:pTeamSeq="pTeamSeq"
					pRowBtnName="선수초대"
					@click-row-btn="sendInvitation"
				/>
			</v-container>
		</template>

		<template v-slot:actions>
			<!-- 기본 액션 버튼 (부모에서 슬롯 오버라이드 가능) -->
			 <div></div>
		</template>
	</ModalFrame>
</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI.js';
	/** Code */
	/** Utils */
	/** Components */
	import ModalFrame from '@/components/frame/DefaultModalFrame.vue';
	import UserSearchList from '@/components/user/search/UserSearchListComp.vue';
	/** Emit Event */
	
	export default {
		components: {
			ModalFrame,
			UserSearchList,
		},
		props: {
			pTeamSeq: String,
		},
		methods: {
			closeModal() {
				this.$refs.modal.close();
			},	
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
