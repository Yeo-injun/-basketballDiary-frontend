<template>
	<!-- 등번호를 item-key로 한 이유 : 해당 컴포넌트는 쿼터기록, 전체 경기기록 정보를 보여주는 테이블로 활용될 수 있어서. API내 playerSeq를 가져올 수 있는 구조로 변경가능하면 해당 방식으로 변경하기 -->
	<v-data-table
		:headers="headers"
		:items="this.pPlayersRecord"
		:items-per-page="5"
		item-key="backNumber" 
		class="elevation-1"
	/>
</template>

<script>
	export default {
		props: {
			pPlayersRecord: {
				type : Array,
				default() { 
					return []; 
				},
			},
		},
		// cf. props를 받아서 data 속성에 초기화시켜두면 props로 내려주는 값이 변경되어도 반영되지 않는 오류 존재
		// 부모 컴포넌트에서 props가 변경되면 자식 컴포넌트에도 해당 변경사항이 전달됨.
		//  해당 변경사항을 자식컴포넌트에 반영하기 위해서는 data속성이 아닌 props 속성을 직접 참조해야 함.
		data() {
			return {
				headers : [
					{ text: '등번호'	, value: 'backNumber' },
					{ text: '선수'		, value: 'playerInfo' },
					{ text: '총득점'	, value: 'totalScore' },
					{ text: '자유투'	, value: 'freeThrow' },
					{ text: '2점'		, value: 'twoPoint' },
					{ text: '3점'		, value: 'threePoint' },
					{ text: '어시스트'	 , value: 'assist' },
					{ text: '리바운드'	, value: 'rebound' },
					{ text: '스틸'		, value: 'steal' },
					{ text: '블락'		, value: 'block' },
					{ text: '턴오버'	, value: 'turnover' },
					{ text: '파울'		, value: 'foul' },
				],
			}
		}
	};
</script>

<style lang="scss" scoped></style>
