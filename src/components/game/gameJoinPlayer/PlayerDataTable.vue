<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="pPlayers"
			item-key="userSeq"
			class="elevation-1"
		>
			<!-- row별 버튼 -->
			<template v-slot:[`item.button`]="{ item }">
				<template>
					<v-btn class="mr-2" small @click="clickRowButton(item)">
						{{ pRowBtnName }}
					</v-btn>
				</template>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	export default {
		props: {
			pHomeAwayCode: String,
			pPlayers: Array,
			pRowBtnName: {
				type: String,
				default: '삭제',
			},
		},
		data() {
			return {
				headers: [
					{ text: '선수구분', value: 'playerTypeCodeName' },
					{ text: '이름', value: 'userName' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '등번호', value: 'backNumber' },
					{ text: '이메일', value: 'email' },
					{ test: '버튼', value: 'button', sortable: false },
				],
				// [
				// 	{
				// 		gameJoinPlayerSeq: 1,
				// 		playerTypeCode: '01',
				// 		playerTypeCodeName: '팀원',
				// 		userSeq: 1,
				// 		name: '여인준',
				// 		backNumber: '93',
				// 		positionCode: '10',
				// 		positionCodeName: '가드',
				// 		email: 'test01@nongguilgi.com',
				// 	},
				// 	{
				// 		gameJoinPlayerSeq: 2,
				// 		playerTypeCode: '01',
				// 		playerTypeCodeName: '팀원',
				// 		userSeq: 2,
				// 		name: '여인준22',
				// 		backNumber: '93',
				// 		positionCode: '10',
				// 		positionCodeName: '가드',
				// 		email: 'test01@nongguilgi.com',
				// 	},
				// 	{
				// 		gameJoinPlayerSeq: 3,
				// 		userSeq: 3,
				// 		name: '여33인준22',
				// 	},
				// 	{
				// 		gameJoinPlayerSeq: 4,
				// 		userSeq: 4,
				// 		name: '여인44준22',
				// 	},
				// 	{
				// 		gameJoinPlayerSeq: 5,
				// 		userSeq: 5,
				// 		name: '여545인준22',
				// 	},
				// ],
			};
		},
		methods: {
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			clickRowButton(targetPlayer) {
				this.$emit('row-btn-click', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
