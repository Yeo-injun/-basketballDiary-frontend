<template>
	<v-container>
		<v-row>
			<v-col>
				<h3>선수기록지</h3>
			</v-col>
			<v-col>
				<!-- <div class="text-right" v-bind="attrs" v-on="on">
					<EntryManageModalOpenBtn
						@do-open="openEntryManageModal"
						pBtnName="엔트리관리"
					/>
				</div> -->
				<!-- <EntryManageModal
					v-if="this.modalState.isOpenEntryManage"
					:pModalState="this.modalState.isOpenEntryManage"
					:pHomeAwayCode="this.pHomeAwayCode"
					@save-entry="emitSaveEntryEvent"
				/> -->
				<EntryManageModal
					:pHomeAwayCode="this.pHomeAwayCode"
					@save-entry="emitSaveEntryEvent"
				/>
			</v-col>
		</v-row>
		<!-- Stat이 Input되면 input-stat이벤트가 먼저 실행되고, 그다음 select-player 이벤트가 실행된다. Stack으로 기록 데이터를 관리 -->
		<InGameRecordSheet
			:pEntry="pEntry"
			@emit-stat-info="createRecord"
			@post-emit-stat-info="emitPlayerRecord"
		/>
	</v-container>
</template>

<script>
	// import EntryManageModalOpenBtn from '@/components/button/FrameOpenBtn.vue';
	import EntryManageModal from '@/views/game/quarterRecordInputBoard/modal/EntryManageModal.vue';
	import InGameRecordSheet from '@/views/game/quarterRecordInputBoard/components/InGameRecordSheetComp.vue';

	export default {
		created() {
			alert('RecordTableSheet CREATED!!!');
		},
		mounted() {
			alert('RecordTableSheet MOUNTED!!!');
		},
		destroy() {
			alert('RecordTableSheet Destroy!!!');
		},
		components: {
			// EntryManageModalOpenBtn,
			EntryManageModal,
			InGameRecordSheet,
		},
		props: {
			pHomeAwayCode: String,
			pEntry: Array,
		},
		data() {
			return {
				modalState: {
					isOpenEntryManage: false,
				},
				latestRecord: {},
			};
		},
		methods: {
			openEntryManageModal() {
				this.modalState.isOpenEntryManage = true;
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			createRecord(statInfo) {
				this.latestRecord = {
					statType: statInfo.statType,
					mode: statInfo.mode,
					timeStamp: new Date(),
				};
			},
			emitPlayerRecord(player) {
				this.$emit('add-player-record', {
					gameJoinPlayerSeq: player.gameJoinPlayerSeq,
					homeAwayCode: this.pHomeAwayCode,
					statType: this.latestRecord.statType,
					mode: this.latestRecord.mode,
					timeStamp: this.latestRecord.timeStamp,
				});
				// 새로운 객체로 초기화
				this.latestRecord = {};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
