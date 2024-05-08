<template>
	<v-dialog v-model="isModalOpen" max-width="800px">
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<v-container>
					<GameJoinPlayerManageBtn pBtnName="참가선수관리" />
				</v-container>
			</div>
		</template>

		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				{{ pModalTitlePrefix }} 참가선수관리
			</v-card-title>

			<GameJoinPlayerSelectionTabs
				v-if="isGetGameJoinPlayersLoadOk"
				:pTeamSeq="this.teamSeq"
				@add-game-join-player="addGameJoinPlayer"
			/>

			<v-container>
				<PlayerSubTitle pTitleName="참가선수 목록" />
				<PlayerTable
					v-if="isGetGameJoinPlayersLoadOk"
					:pPlayers="playersItems"
					:pTotalCount="pagination.totalCount"
					:pPageCount="pagination.totalPageCount"
					:pRowCount="pagination.rowCount"
					:pLoading="playersLoading"
					pRowBtnName="삭제"
					@fetch-paging-items="getGameJoinPlayers"
					@get-row-player-info="deleteGameJoinPlayer"
				/>
				<v-container>
					<ModalCloseBtn pBtnName="닫기" @do-close="closeModal"/>
				</v-container>
			</v-container>

		</v-card>
	</v-dialog>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';

	/** CODE */
	import { PlayerTypeCode } from '@/const/code/PlayerCode';

	/** Utils */
	import ArrayUtil from '@/common/util/ArrayUtil.js';

	/** Components */
	import GameJoinPlayerManageBtn from '@/components/button/FrameOpenBtn.vue';

	import GameJoinPlayerSelectionTabs from '@/views/game/recordDetail/modal/tab/GameJoinPlayerSelectionTabs.vue';

	import PlayerSubTitle from '@/components/title/FrameTabSubTitle.vue';
	import PlayerTable from '@/components/game/table/PlayerPaginationTable.vue';

	import ModalCloseBtn from '@/components/button/FrameCloseBtn.vue';
	
	export default {
		components: {
			GameJoinPlayerManageBtn,
			GameJoinPlayerSelectionTabs,
			PlayerSubTitle,
			PlayerTable,
			ModalCloseBtn,
		},
		props: {
			pModalTitlePrefix: String,
			pHomeAwayCode: String,
		},
		data() {
			const query = this.$route.query;
			return {
				isModalOpen: false,
				gameSeq: query.gameSeq,
				teamSeq: '',
				isGetGameJoinPlayersLoadOk: false,
				playersItems			: [],
				pagination : {
					totalCount 		: 0,
					totalPageCount 	: 1,
					rowCount 		: 5,
				},
				playersLoading 			: false,
			};
		},
		// 참고자료 : https://velog.io/@yeoonnii/Vue.js-watch-%EC%86%8D%EC%84%B1
		// watch 객체의 속성은 감시하고자 하는 속성을 함수로 선언. 함수의 인자는 <새로운 값> 과 <이전값> 이 들어옴
		// 모달이 OPEN됐을때 초기화하기
		// TODO 모달을 공통 컴포넌트로 구현하고 대체하기
		watch: {
			isModalOpen(isOpen) {
				if (!isOpen) {
					// 모달 닫히고, 이벤트를 부모 컴포넌트로 전달해서 등록된 선수 목록을 API재호출 할 수 있도록 처리
					this.$emit('register-complete', {
						homeAwayCode: this.pHomeAwayCode,
					});
					return;
				}
				// 모달이 열리면 참가선수 세팅 기본값 : 첫번째 페이지 세팅 
				this.getGameJoinPlayers( { pageNo : 1 } );
			},
		},
		methods: {
			// TODO 페이징 처리 없이 조회하기
			async getGameJoinPlayers( { pageNo } ) {
				this.playersLoading = true;
				const { data } = await GameAPI.getGameJoinPlayers({
					gameSeq			: this.gameSeq,
					homeAwayCode	: this.pHomeAwayCode,
					pageNo 			: pageNo,
				});

				this.teamSeq 			= data.teamSeq;
				this.playersItems 		= data.players;
				
				const pagination = this.pagination;
				pagination.totalCount 		= data.pagination.totalCount;
				pagination.totalPageCount	= data.pagination.totalPageCount;

				this.isGetGameJoinPlayersLoadOk = true;
				this.playersLoading				= false;
			},
			/** userSeq는 게임참가선수로 등록되기 전에도 가지고 있기 때문 */
			async deleteGameJoinPlayer(targetPlayer) {
				console.log( targetPlayer );
				// TODO 추가 로직을 API로 만들때 화면 삭제 로직 참고.
				await GameAPI.deleteGameJoinPlayer({
					gameJoinPlayerSeq	: targetPlayer.gameJoinPlayerSeq,
					gameSeq 			: targetPlayer.gameSeq,
					homeAwayCode 		: targetPlayer.homeAwayCode,
				});

				// 비회원일떄는 email로 지우고
				if (this.isUnauthGuest(targetPlayer.playerTypeCode)) {
					this.playersItems = ArrayUtil.deleteItemById(
						this.playersItems,
						targetPlayer,
						'email'
					);
				} else {
					// 회원일떄는 userSeq로 지우기
					this.playersItems = ArrayUtil.deleteItemById(
						this.playersItems,
						targetPlayer,
						'userSeq'
					);
				}
				this.updatePlayersPagination();
			},
			async addGameJoinPlayer(targetPlayer) {
				if (this.checkDuplicate(targetPlayer)) {
					return;
				}

				if (!this.validateDataFormat(targetPlayer)) {
					return;
				}

				await GameAPI.addGameJoinPlayer({
					gameSeq 		: this.gameSeq,
					homeAwayCode 	: this.pHomeAwayCode,
   					playerTypeCode	: targetPlayer.playerTypeCode,      // 선수유형코드
   					userSeq			: targetPlayer.userSeq,             // 사용자Seq
   					userName		: targetPlayer.userName,            // 사용자이름
   					backNumber		: targetPlayer.backNumber,          // 등번호
   					positionCode	: targetPlayer.positionCode,        // 포지션코드
   					email			: targetPlayer.email,               // 이메일
				});
				this.playersItems.unshift(targetPlayer);
				this.updatePlayersPagination();
			},
			updatePlayersPagination() {
				const pagination = this.pagination;
				pagination.totalCount 		= this.playersItems.length;
				pagination.totalPageCount 	= Math.ceil( pagination.totalCount / pagination.rowCount );
			},
			checkDuplicate(targetPlayer) {
				if (this.isUnauthGuest(targetPlayer.playerTypeCode)) {
					if (ArrayUtil.hasItem(this.playersItems, targetPlayer, 'email')) {
						alert('선수 등록시 이메일이 중복되면 안됩니다.');
						return true;
					}
				} else {
					if (
						ArrayUtil.hasItem(this.playersItems, targetPlayer, 'userSeq')
					) {
						alert('이미 등록되어 있는 선수입니다.');
						return true;
					}
				}

				if (
					ArrayUtil.hasItem(this.playersItems, targetPlayer, 'backNumber')
				) {
					alert('등번호가 중복됩니다. 등번호를 수정해주세요.');
					return true;
				}

				return false;
			},
			isUnauthGuest(playerTypeCode) {
				return PlayerTypeCode.UNAUTH_GUEST.code == playerTypeCode;
			},
			validateDataFormat(targetPlayer) {
				// 등번호는 3자리수까지만 허용
				const backNumber = targetPlayer.backNumber;
				if (backNumber >= 1000) {
					alert('선수의 등번호는 3자리까지만 입력가능합니다.');
					return false;
				}

				return true;
			},
			// 모달 Open/Close 상태 변경
			closeModal() {
				this.isModalOpen = false;
			},
			

		},
	};
</script>

<style lang="scss" scoped></style>
