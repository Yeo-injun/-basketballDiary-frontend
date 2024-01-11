<template>
	<v-container>
		<MyTeamGameSubTitle pTitleName="검색조건" />
		<v-row>
			<v-col>
				<GameTypeSelect @value="setGameTypeCode" />
				
			</v-col>
			<v-col>
				<HomeAwaySelect @value="setHomeAwayCode" />
				
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<SearchStartDateInput pLabel="검색시작일자"
					:pData="gameStartYmd"
					:pRequired="true"
					@compliance="setGameStartYmd"
				/>	
			</v-col>
			<v-col>
				<SearchEndDateInput pLabel="검색종료일자"
					:pData="gameEndYmd"
					:pRequired="true"
					@compliance="setGameEndYmd"
				/>				
			</v-col>
		</v-row>
		<v-text-field label="경기장주소" />
		<v-text-field label="경기장명" />
		<MyTeamGameSearchBtn @do-search="onSearchMyTeamGames()" />
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	/** Components */
	import MyTeamGameSubTitle from '@/components/title/FramePageSubTitle.vue'
	import SearchStartDateInput from '@/components/input/DatePickerInput.vue';
	import SearchEndDateInput from '@/components/input/DatePickerInput.vue';

	import GameTypeSelect from '@/components/selectbox/GameTypeSelect.vue';
	import HomeAwaySelect from '@/components/selectbox/HomeAwaySelect.vue';

	import MyTeamGameSearchBtn from '@/components/button/FrameSearchBtn.vue';

	/** Emit Event */

	export default {
		components: {
			MyTeamGameSubTitle,
			SearchStartDateInput,
			SearchEndDateInput,
			MyTeamGameSearchBtn,
			GameTypeSelect,
			HomeAwaySelect,
		},
		data() {
			return {
				gameStartYmd : "",
				gameEndYmd : "",
				gameTypeCode: '',
				homeAwayCode: '',
			};
		},
		methods: {
			setGameStartYmd( e ) {
				this.gameStartYmd = e.data;
			},
			setGameEndYmd( e ) {
				this.gameEndYmd = e.data;
			},
			setGameTypeCode(value) {
				this.gameTypeCode = value;
			},
			setHomeAwayCode(value) {
				this.homeAwayCode = value;
			},
			onSearchMyTeamGames() {
				console.log('adsf');
				alert('TODO 검색 API붙이기');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
