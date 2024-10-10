<template>
	<v-list-item>
		<!-- 왼쪽 영역 -->
		<v-list-item-avatar>
			<ProfileImage :pImageUrl="pProfileImageUrl"/>
		</v-list-item-avatar>

		<!-- 중앙 영역 -->
		<v-list-item-content>
			<v-list-item-title >
				<v-icon :color=teamAuthBadgeColor >{{ teamAuthBadgeIcon }}</v-icon>
				<strong>{{ pUserName }}</strong> | {{ birthDayDashFormat }}
			</v-list-item-title>
			<v-list-item-subtitle>
				{{ `${pHeight}cm / ${pWeight}kg` }}						
			</v-list-item-subtitle>
			<span>{{ pPositionCodeName }} | {{ pBackNumber }}</span>
			<span>{{ joinYmdKorFormat }} 부터 총 {{ pTotalGameCount }} 번의 경기를 뛰었습니다.</span>
			<!-- 구분선 (마지막 아이템에는 표시 안 함) -->
		</v-list-item-content>

		<!-- 오른쪽 영역 : 주로 제어용 버튼 삽입시 사용 -->
		<slot name="action-slot" >

		</slot>

	</v-list-item>
</template>

<script>
	/** Backend API */
	/** CODE */
	import { TeamAuth } from '@/const/code/TeamCode.js';
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import DateUtil from '@/common/DateUtil.js';
	/** Components */
	import ProfileImage from '@/components/image/FrameImageComp.vue';
	
	/**
	 * 팀권한별 Icon설정 상수 관리 
 	 * cf. mid 아이콘 찾기
	 * https://pictogrammers.com/library/mdi/
 	 */
	const TEAM_AUTH_BADGE_CONFIG = {};
	TEAM_AUTH_BADGE_CONFIG[ TeamAuth.LEADER.code ] = {
		iconName 	: "mdi-crown-circle-outline",
		color 		: "blue",
	};
	TEAM_AUTH_BADGE_CONFIG[ TeamAuth.MANAGER.code ] = {
		iconName 	: "mdi-asterisk-circle-outline",
		color 		: "green",
	};
	TEAM_AUTH_BADGE_CONFIG[ TeamAuth.TEAM_MEMBER.code ] = {
		iconName 	: "",
		color 		: "",
	};

	export default {
		components: {
			ProfileImage,
		},
		props: {
			pProfileImageUrl	: { type : String, default() { return ""; } },
			pUserName 			: { type : String, required : true },
			pBirthYmd 			: { type : String, },
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
				return TEAM_AUTH_BADGE_CONFIG[ this.pTeamAuthCode ].iconName;
			},
			teamAuthBadgeColor() {
				return TEAM_AUTH_BADGE_CONFIG[ this.pTeamAuthCode ].color;
			},
			birthDayDashFormat() {
				return DateUtil.Format.toYmd( ValidationUtil.isNull( this.pBirthYmd ) ? "99991231" : this.pBirthYmd );
			},
			joinYmdKorFormat() {
				return DateUtil.Format.toKorYmd( this.pJoinYmd );
			}
		},
	};
</script>

<style></style>
