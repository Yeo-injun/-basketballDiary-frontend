<template>
	<div>
		<v-chip-group>
			<v-chip
				class="foulCnt"
				v-for="foulInfo in foulInfoList"
				:key="foulInfo.number"
				:color="foulInfo.color"
				:text-color="foulInfo.textColor"
			>
				{{ foulInfo.number }}
			</v-chip>
		</v-chip-group>
	</div>
</template>

<script>
	export default {
		props: {
			pFoulCnt: Number,
		},
		data() {
			return {
				foulInfoList: this.generateFoulInfoList(),
			};
		},
		/**
		 *  props가 변경되는것을 실시간으로 감지하여 다시 렌더링해줘야 함.
		 *	참고자료 :  https://ui.toast.com/weekly-pick/ko_20190307
		 **/
		watch: {
			pFoulCnt() {
				this.foulInfoList = this.generateFoulInfoList();
			},
		},
		methods: {
			generateFoulInfoList() {
				const foulInfoList = [];
				const MAX_FOUL_COUNT = 5;
				for (let i = 1; i <= MAX_FOUL_COUNT; ++i) {
					const hasFoul = i <= this.pFoulCnt;
					if (hasFoul) {
						const foulInfo = {
							number: String(i),
							color: 'red',
							textColor: 'white',
						};
						foulInfoList.push(foulInfo);
						continue;
					}
					const noFoulInfo = { number: String(i), color: '', textColor: '' };
					foulInfoList.push(noFoulInfo);
				}
				return foulInfoList;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.foulCnt {
		width: 5px;
		height: 15px;
		margin: 0.5px;
	}
</style>
