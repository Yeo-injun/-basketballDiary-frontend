<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="pGameRecorders"
			item-key="userSeq"
			class="elevation-1"
		>
			<!-- row별 버튼 -->
			<template v-slot:[`item.button`]="{ item }">
				<template>
					<v-btn class="mr-2" small @click="emitClickedPlayerInfo(item)">
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
			pGameRecorders: Array,
			pRowBtnName: {
				type: String,
				default: '삭제',
			},
		},
		data() {
			return {
				headers: [
					{ text: '소속팀', value: 'teamName' },
					{ text: '이름', value: 'name' },
					{ text: '등번호', value: 'backNumber' },
					{ text: '이메일', value: 'email' },
					{ text: '권한구분', value: 'gameRecordAuthCodeName' },
					{ test: '버튼', value: 'button', sortable: false },
				],
			};
		},
		methods: {
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			emitClickedPlayerInfo(targetPlayer) {
				this.$emit('get-row-player-info', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
