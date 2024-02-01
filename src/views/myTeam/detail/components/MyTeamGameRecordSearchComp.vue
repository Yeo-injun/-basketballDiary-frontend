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
		<GamePlaceNameInput pLabel="경기장명"
			:pData="gamePlaceName"
			@compliance="setGamePlaceName"
		/>
		<MyTeamGameSearchBtn @do-search="onSearchMyTeamGames()" />
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil.js';

	/** Components */
	import MyTeamGameSubTitle from '@/components/title/FramePageSubTitle.vue'
	import SearchStartDateInput from '@/components/input/DatePickerInput.vue';
	import SearchEndDateInput from '@/components/input/DatePickerInput.vue';

	import GameTypeSelect from '@/components/selectbox/GameTypeSelect.vue';
	import HomeAwaySelect from '@/components/selectbox/HomeAwaySelect.vue';

	import GamePlaceNameInput from '@/components/input/FrameTextFieldInput.vue';

	import MyTeamGameSearchBtn from '@/components/button/FrameSearchBtn.vue';
import ValidationUtil from '@/common/util/ValidationUtil';

	/** Emit Event */

	export default {
		components: {
			MyTeamGameSubTitle,
			SearchStartDateInput,
			SearchEndDateInput,
			GameTypeSelect,
			HomeAwaySelect,
			GamePlaceNameInput,
			MyTeamGameSearchBtn,
		},
		data() {
			return {
				gameTypeCode	: "",	// 경기유형코드
				homeAwayCode	: "",	// 경기구분 - 홈/어웨이코드
				gameStartYmd 	: "",	// 경기시작일자
				gameEndYmd 		: "",	// 경기종료일자
				gamePlaceName	: "",	// 경기장소명
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
			setGamePlaceName( e ) {
				this.gamePlaceName = e.data;
			},
			onSearchMyTeamGames() {
				// 검색일자가 하나라도 없으면 검색 불가
				if ( ( ValidationUtil.isNotNull( this.gameStartYmd ) && ValidationUtil.isNull( this.gameEndYmd ) )
				  || ( ValidationUtil.isNull( this.gameStartYmd ) && ValidationUtil.isNotNull( this.gameEndYmd ) )
				) {
					alert( "검색일자가 유효하지 않습니다. 검색시작일자와 종료일자 모두 입력해주시기 바랍니다." );
					return;
				}
				// 검색일자범위 유효성 검사
				const daysOfBetween = DateUtil.getDaysBetween( this.gameStartYmd, this.gameEndYmd );
				if ( daysOfBetween < 0 ) {
					alert( "검색일자의 범위가 유효하지 않습니다. 검색 시작일자가 검색 종료일자와 같거나 빨라야 합니다." );
					return;
				}
				this.$emit( 'do-search', {
					gameStartYmd	: this.gameStartYmd,
					gameEndYmd		: this.gameEndYmd,
					gameTypeCode	: this.gameTypeCode,
					homeAwayCode	: this.homeAwayCode,
					gamePlaceName	: this.gamePlaceName,
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
