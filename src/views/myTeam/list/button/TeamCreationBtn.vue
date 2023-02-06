<template>
	<AbstractPageMoveBtn :pRouteInfo="this.routeInfo" :pBtnInfo="this.btnInfo" />
</template>

<script>
	import AbstractPageMoveBtn from '@/components/button/AbstractPageMoveBtn.vue';

	export default {
		components: {
			AbstractPageMoveBtn,
		},
		data() {
			return {
				btnInfo: {
					name: '팀생성',
				},
				routeInfo: {
					name: 'TeamRegistrationPage',
					params: '',
				},
			};
		},
	};
</script>

<style lang="scss" scoped></style>
