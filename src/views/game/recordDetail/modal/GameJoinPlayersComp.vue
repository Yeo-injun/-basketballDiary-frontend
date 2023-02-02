<template>
	<v-dialog v-model="dialog" max-width="800px">
		<div>{{ this.title }}</div>
		<v-data-table
			:headers="headers"
			:items="joinPlayers"
			v-model="todo"
			item-key="teamSeq"
			class="elevation-1"
		/>

		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<GameJoinPlayerManageBtn />
			</div>
		</template>
	</v-dialog>
</template>

<script>
	import GameJoinPlayerManageBtn from '@/views/game/recordDetail/button/GameJoinPlayerManageBtn.vue';

	export default {
		components: {
			GameJoinPlayerManageBtn,
		},
		data() {
			return {
				title: '참가선수 목록',
				headers: [
					{ text: '선수구분', value: 'playerTypeCodeName' },
					{ text: '이름', value: 'name' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '등번호', value: 'backNumber' },
					{ text: '이메일', value: 'email' },
				],
			};
		},
	};
</script>

<style lang="scss" scoped></style>
