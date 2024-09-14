<template>
	<v-container>
		<!-- Error :  Avoid using non-primitive value as key, use string/number value instead. -->
		<!-- 해결법 : https://crispypotato.tistory.com/33 -->
		<v-card class="mt-10">
			<MyTeamMainInfo :pTeamInfo="this.pTeamInfo" />
			<v-container>
				<MoveMyTeamDetailBtn pBtnName="상세보기"
					pRoutePageName="MyTeamDetailPage"
					:pRouteParams="{
						teamSeq			: this.pTeamInfo.teamSeq,
						teamName		: this.pTeamInfo.teamName,
						teamImagePath 	: this.pTeamInfo.teamImagePath,
						hometown 		: this.pTeamInfo.hometown,
						totMember 		: this.pTeamInfo.totMember,
						foundationYmd 	: this.pTeamInfo.foundationYmd,
						introduction 	: this.pTeamInfo.introduction,

					}"
				/>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	/** Components */
	import MyTeamMainInfo from '@/components/team/FrameTeamMainInfoComp.vue';
	import MoveMyTeamDetailBtn from '@/components/button/FramePageMoveBtn.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamMainInfo,
			MoveMyTeamDetailBtn,
		},
		props: {
			pTeamInfo: {
				type 	: Object,
				default() {
					return { };
				},
			}
		},
	};
</script>

<style></style>
