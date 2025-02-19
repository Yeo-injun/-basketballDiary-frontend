<template>
	<v-container class="px-15"  v-if="this.isAsyncComplete">
		<v-container>
			<TeamProfileSubTitle class="pb-2" pTitleName="회비 잔액" />
			{{ this.pTabParams }}
		</v-container>

		<v-container>
		</v-container>

		<v-container>
		</v-container>

	</v-container>
</template>

<script>
	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import TeamProfileSubTitle from '@/components/title/FrameTabSubTitle.vue';


	export default {
		components: {
			TeamProfileSubTitle,

		},
		props: {
			pTabParams : {
				type : Object,
				required : true,
			},
		},
		data() {
			return {
				/** 비동기 통신 후 컴포넌트 제어 */
				isAsyncComplete: true,
				profile: {},
				managers: [],
				teamMembers: [],
				pagination: {}, // 비어있는객체로 초기화해서 자식컴포넌트에 props 로 넘겨주면 초기화값 반영
			};
		},
		methods: {
			
		},
	};
</script>

<style lang="scss" scoped></style>
