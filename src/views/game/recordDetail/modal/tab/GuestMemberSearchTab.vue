<template>
	<div>
		<v-container>
			<UserSearchComp
				:pTeamSeq="this.pTeamSeq"
				pRowBtnName="선수추가"
				@click-row-btn="addGameJoinPlayer"
			/>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	
	/** Javasript */
	import {
		ObjectFactory,
		UIPrompter,
	} from '@/views/game/recordDetail/GameRecordDetail.js';

	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/** Code */
	import { PlayerTypeCode } from '@/const/code/PlayerCode.js';

	/** Constant */
	import { GameJoinPlayerManageTabs } from '@/views/game/recordDetail/const/CompConst.js';
	import { GuestMemberSearchTabEvent } from '@/views/game/recordDetail/const/EventConst.js';

	/** Components */
	import UserSearchComp from '@/components/user/search/UserSearchListComp.vue';

	export default {
		components: {
			UserSearchComp,
		},
		data() {
			return {
			};
		},
		props: {
			pTeamSeq: Number,
			pActivatedTabName: String,
		},
		watch: {
			/**
			 *  활성화된 탭이 자기자신이면 다시 서버를 호출한다.
			 *  TODO 해당 정책 반영여부 검토요망 
			 */
			pActivatedTabName(newTabName) {
				// const VueComp = this;
				if (newTabName == GameJoinPlayerManageTabs.GUEST_MEMBER) {
					// VueComp.searchUsersExcludingTeamMember();
				}
			},
		},
		methods: {
			addGameJoinPlayer(targetPlayer) {
				const backNumber = UIPrompter.backNumber(targetPlayer.backNumber);
				if (ValidationUtil.isNull(backNumber)) {
					return;
				}

				const player = ObjectFactory.gameJoinPlayerWithBackNumber(
					targetPlayer,
					PlayerTypeCode.AUTH_GUEST,
					backNumber
				);

				this.$emit(GuestMemberSearchTabEvent.ADD_GAME_JOIN_PLAYER, player);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
