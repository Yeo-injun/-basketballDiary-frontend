<template>
	<div>
		<v-data-table
			:headers="this.getHeaders()"
			:items="pPlayers"
			:options="{
				page : pageNo,
				itemsPerPage : pRowCount
			}"
			hide-default-footer
			class="elevation-1"
			item-key="userSeq"
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
		<!-- 하단 페이지네이션 -->
		<div class="text-center pt-2">
			<v-pagination
				v-model="pageNo"
				:length="pPageCount"
				@input="fetchPagingItems"
			/>
		</div>

	</div>
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
			pTotalCount: {
				type : Number,
				default() { return 0 },
			},
			pPageCount: {
				type : Number,
				default() { return 1 }
			},
			pLoading: Boolean,
			pRowBtnName: {
				type: String,
				default: '삭제',
			},
		},
		data() {
			return {
				pageNo : 1,
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
		updated( ) {
			console.log( "updateed!!");
			console.log( this.pPlayers );
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
			fetchPagingItems( pageNo ) {
				this.$emit('fetch-paging-items', { pageNo : pageNo } );
			},
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			emitClickedPlayerInfo(targetPlayer) {
				this.$emit('get-row-player-info', targetPlayer);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
