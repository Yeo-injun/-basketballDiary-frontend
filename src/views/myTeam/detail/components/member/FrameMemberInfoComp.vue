<template>
	<v-list-item>
		<!-- 왼쪽 영역 -->
		<v-list-item-avatar>
			<ProfileImage :pImageUrl="pProfileImageUrl"/>
		</v-list-item-avatar>

		<!-- 중앙 영역 -->
		<v-list-item-content>
			<v-list-item-title >
				<v-icon color="blue">{{ teamAuthBadgeIcon }}</v-icon>
				<strong>{{ pUserName }}</strong> | {{ pBirthYmd }}
			</v-list-item-title>
			<v-list-item-subtitle>
				{{ `${pHeight}cm / ${pWeight}kg` }}						
			</v-list-item-subtitle>
			<span>{{ pPositionCodeName }} | {{ pBackNumber }}</span>
			<span>{{ pJoinYmd }}부터 총 {{ pTotalGameCount }} 번의 경기를 뛰었습니다.</span>
			<!-- 구분선 (마지막 아이템에는 표시 안 함) -->
		</v-list-item-content>

		<!-- 오른쪽 영역 -->
		<slot name="action-slot" >

		</slot>

	</v-list-item>
</template>

<script>
	/** Backend API */
	/** CODE */
	import { TeamAuth } from '@/const/code/TeamCode.js';
	/** Utils */
	/** Components */
	import ProfileImage from '@/components/image/FrameImageComp.vue';

	export default {
		components: {
			ProfileImage,
		},
		props: {
			pProfileImageUrl	: { type : String, default() { return ""; } },
			pUserName 			: { type : String, required : true },
			pBirthYmd 			: { type : String, default() { return "99991231"; } },
			pHeight 			: { type : String, required : true },
			pWeight 			: { type : String, required : true },
			pPositionCodeName 	: { type : String, required : true },
			pBackNumber 		: { type : String, default() { return "-"; } },
			pJoinYmd 			: { type : String, required : true },
			pTotalGameCount 	: { type : String, },
			pTeamAuthCode		: { type : String, required : true },
		},
		computed :{
			teamAuthBadgeIcon() {
				/**
				 * cf. mid 아이콘 찾기
				 * https://pictogrammers.com/library/mdi/
				 */
				switch( this.pTeamAuthCode ) {
					case TeamAuth.LEADER.code 	: return "mdi-crown-circle-outline";
					case TeamAuth.MANAGER.code	: return "mdi-asterisk-circle-outline";
					default : return "";
				}
			},
		},
		mounted() {
			console.log( "프레임팀원정보");
			console.log( this.pUserName );
		}

	};
</script>

<style></style>
