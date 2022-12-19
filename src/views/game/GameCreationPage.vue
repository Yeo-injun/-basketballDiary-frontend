/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<!-- props를 내려줄때 Tips
	내려주는 props가 변수에 담겨있을 때는 :props명으로
	내려주는 props가 값일때는 props명으로 작성
	-->
	<v-container>
		<h2>경기 정보</h2>
		<PageMoveBtn :pRouteCompName="this.routeCompName" />
		<v-btn @click="createGame()">게임생성(임시)</v-btn>

		<!-- 경기시작시간 및 종료시간 셀렉트박스로 만드는거 검토 -->
		<tr>
			<td>
				<CustomDatePickerComp
					p-label-name="경기일자"
					:p-init-value="gameCreationDTO.gameYmd"
					@pickup-date="setGameYmd"
				/>
			</td>
			<td>
				<GameTimeSelect
					p-label-name="경기시작시간"
					@select-value="setGameStartTime"
				/>
			</td>
			<td>~</td>
			<td>
				<GameTimeSelect
					p-label-name="경기종료시간"
					@select-value="setGameEndTime"
				/>
			</td>
		</tr>

		<!-- TODO 공통컴포넌트로 AddressInputComp.vue -->
		<tr>
			<td>
				<v-text-field
					label="주소"
					v-model="gameCreationDTO.gamePlaceAddress"
					disabled
				/>
			</td>
			<td>
				<v-btn @click="popupAddressSearch()">주소검색</v-btn>
			</td>
		</tr>

		<v-text-field label="경기장명" v-model="gameCreationDTO.gamePlaceName" />
	</v-container>
</template>

<script>
	import gameApi from '@/api/GameAPI.js';
	import AddressOpenApi from '@/common/address/AddressOpenApi.js';

	import GameTimeSelect from '@/components/selectbox/GameTimeSelect.vue';
	import CustomDatePickerComp from '@/components/common/CustomDatePickerComp.vue';
	import PageMoveBtn from '@/components/button/PageMoveBtn.vue';

	import DateUtil from '@/common/DateUtil.js';

	export default {
		components: {
			GameTimeSelect,
			CustomDatePickerComp,
			PageMoveBtn,
		},
		props: {
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				routeCompName: 'GameJoinTeamSelectionPage',
				// TODO 파라미터값 정리 / rule부여해서 필수값 체크
				gameCreationDTO: {
					teamSeq: this.pTeamSeq, // TODO 파라미터 값으로 가져오기...
					gameYmd: DateUtil.getCurrentYmd(),
					gameStartTime: '',
					gameEndTime: '',
					gamePlaceAddress: '',
					gamePlaceName: '',
					sidoCode: '',
					sigunguCode: '',
				},
			};
		},
		methods: {
			popupAddressSearch() {
				const gameCreationDTO = this.gameCreationDTO;
				AddressOpenApi.open(function (data) {
					gameCreationDTO.gamePlaceAddress = data.address;

					const sidoSigunguCode = data.sigunguCode;
					gameCreationDTO.sidoCode = sidoSigunguCode.substr(0, 2);
					gameCreationDTO.sigunguCode = sidoSigunguCode.substr(2, 3);
				});
			},
			getCurrentYmd() {
				return DateUtil.getCurrentYmd();
			},
			setGameYmd(ymd) {
				this.gameCreationDTO.gameYmd = DateUtil.Format.toString(ymd);
			},
			setGameStartTime(time) {
				this.gameCreationDTO.gameStartTime = time;
			},
			setGameEndTime(time) {
				this.gameCreationDTO.gameEndTime = time;
			},
			createGame() {
				const params = this.gameCreationDTO;
				console.log(params);
				gameApi.createGame(params);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
