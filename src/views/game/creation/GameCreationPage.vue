/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<!-- props를 내려줄때 Tips
	내려주는 props가 변수에 담겨있을 때는 :props명으로
	내려주는 props가 값일때는 props명으로 작성
	-->
	<v-container>
		<MainTitle pTitleName="경기정보" />
		<!-- 경기시작시간 및 종료시간 셀렉트박스로 만드는거 검토 -->
		<v-form ref="gameCreationInfo">
			<GameDatePickerInput pLabel="경기일자"
				:pData="gameYmd"
				:pRequired="true"
				@compliance="setGameYmd"
			/>
			<tr>
				<td>
					<GameStartTimeSelectbox
						p-label-name="경기시작시간"
						@select-value="setGameStartTime"
					/>
				</td>
				<td>~</td>
				<td>
					<GameEndTimeSelectbox
						p-label-name="경기종료시간"
						@select-value="setGameEndTime"
					/>
				</td>
			</tr>
			<GamePlaceAddressInput pLabel="경기장주소"
				:pData="{ 
					address : gamePlaceAddress,
					sidoCode : sidoCode,
					sigunguCode : sigunguCode,
				}"
				@data="onComplianceGamePlaceAddressInfo"
			/>
			<GamePlaceNameInput pLabel="경기장명"
				:pData="gamePlaceName"
				:pRequired="true"
				:pRules="rules.gamePlaceName"
				@compliance="onComplianceGamePlaceName"
			/>
		</v-form>
		<GameCreationBtn @do-save="createGame()" pBtnName="게임생성" />
	</v-container>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** Code */
	/** Utils */
	import DateUtil from '@/common/DateUtil.js';
	import ValidationUtil from '@/common/util/ValidationUtil';

	/** Components */
	import MainTitle from '@/components/title/FrameTabMainTitle.vue';
	import GameDatePickerInput from '@/components/input/DatePickerInput.vue';

	import GameStartTimeSelectbox from '@/components/selectbox/GameTimeSelect.vue';
	import GameEndTimeSelectbox from '@/components/selectbox/GameTimeSelect.vue';

	import GamePlaceAddressInput from '@/components/input/AddressInput.vue';
	import GamePlaceNameInput from '@/components/input/FrameTextFieldInput.vue';

	import GameCreationBtn from '@/components/button/FrameSaveBtn.vue';

	/** Emit Event */


	export default {
		components: {
			MainTitle,
			GameDatePickerInput,
			GameStartTimeSelectbox,
			GameEndTimeSelectbox,
			GamePlaceAddressInput,
			GamePlaceNameInput,
			GameCreationBtn,
		},
		data() {
			return {
				/**-------------------
				 * 경기생성 정보
				 *--------------------*/
				gameYmd: DateUtil.getCurrentYmd(),
				gameStartTime: '',
				gameEndTime: '',
				gamePlaceAddress: '',
				sidoCode: '',
				sigunguCode: '',
				gamePlaceName: '',
				/**-------------------
				 * 경기생성 정보 (Validation)
				 *--------------------*/
				rules: {
					gamePlaceName: [
						(value) =>
							ValidationUtil.input.checkMaxLength(value, {
								maxLength: 10,
							}),
					],
				},
			};
		},
		methods: {
			setGameYmd( e ) {
				this.gameYmd = e.data;
			},
			setGameStartTime(time) {
				// TODO 입력값이 정상값인지 확인
				this.gameStartTime = time;
			},
			setGameEndTime(time) {
				// TODO 입력값이 정상값인지 확인
				this.gameEndTime = time;
			},
			onComplianceGamePlaceAddressInfo( e ) {
				this.gamePlaceAddress	= e.address;
				this.sidoCode			= e.sidoCode;
				this.sigunguCode		= e.sigunguCode;
			},
			onComplianceGamePlaceName( e ) {
				this.gamePlaceName	= e.data;
			},
			async createGame() {
				if (!this.checkValidGameCreationInfo()) {
					alert('입력값을 확인해주시기 바랍니다.');
					return;
				}
				const query = this.$route.query;

				const reqBody = {
					gameCreationInfo: {
						teamSeq: query.teamSeq,
						gameYmd: this.gameYmd,
						gameStartTime: this.gameStartTime,
						gameEndTime: this.gameEndTime,
						gamePlaceAddress: this.gamePlaceAddress,
						gamePlaceName: this.gamePlaceName,
						sidoCode: this.sidoCode,
						sigunguCode: this.sigunguCode,
					},
				};

				const { data } = await GameAPI.createGame(reqBody);

				this.$router.push({
					name: 'GameJoinTeamSelectionPage',
					query: {
						gameSeq: data.gameSeq,
						teamSeq: query.teamSeq,
					},
				});
			},
			checkValidGameCreationInfo() {
				// TODO 시작시간이 종료시간보다 늦을 수 없음

				const isValidGameInfo = this.$refs.gameCreationInfo.validate();
				if (isValidGameInfo) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
