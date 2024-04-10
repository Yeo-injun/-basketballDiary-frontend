<template>
	<v-data-table
		:headers="this.getHeaders()"
		:items="pPlayers"
		:items-per-page="pRowCount"
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
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	export default {
		props: {
			pHeaders: Array,
			pPlayers: Array,
			pRowCount: {
				type : Number,
				default() { return 5; },
			},
			pRowBtnName: {
				type: String,
				default: '삭제',
			},
		},
		data() {
			return {
				defaultHeaders: [
					{ text: '선수구분', value: 'playerTypeCodeName' },
					{ text: '이름', value: 'userName' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '등번호', value: 'backNumber' },
					{ text: '이메일', value: 'email' },
					{ test: '버튼', value: 'button', sortable: false },
				],
			};
		},
		methods: {
			getHeaders() {
				if (ValidationUtil.isNull(this.pHeaders)) {
					return this.defaultHeaders;
				}
				if (this.pHeaders.length > 0) {
					return this.pHeaders;
				}
				return this.defaultHeaders;
			},
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			emitClickedPlayerInfo(targetPlayer) {
				this.$emit('get-row-player-info', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
