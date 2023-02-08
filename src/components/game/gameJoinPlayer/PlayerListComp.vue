<template>
	<v-container>
		<div>{{ this.title }}</div>
		<v-data-table
			:headers="headers"
			:items="playerList"
			item-key="teamSeq"
			class="elevation-1"
		/>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pHomeAwayCode: String,
			pIsOpen: Boolean,
		},
		data() {
			return {
				isOpen: this.pIsOpen,
				title: '참가선수 목록',
				headers: [
					{ text: '선수구분', value: 'playerTypeCodeName' },
					{ text: '이름', value: 'name' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '등번호', value: 'backNumber' },
					{ text: '이메일', value: 'email' },
				],
				playerList: [],
			};
		},
		methods: {
			async getGameJoinPlayers() {
				const params = {
					gameSeq: this.$route.params.gameSeq,
					homeAwayCode: this.pHomeAwayCode,
				};

				const res = await GameAPI.getGameJoinPlayers(params);

				switch (this.pHomeAwayCode) {
					case HomeAwayCode.HOME_TEAM:
						this.playerList = res.data.homeTeam.players;
						break;
					case HomeAwayCode.AWAY_TEAM:
						this.playerList = res.data.awayTeam.players;
						break;
				}
			},
		},
		mounted() {
			// TODO 모달창이 활성화될때마다 API콜해서 데이터 가져오기
			this.getGameJoinPlayers();
		},
	};
</script>

<style lang="scss" scoped></style>
