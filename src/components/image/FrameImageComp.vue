<template>
	<v-layout align-center justify-center>
		<v-img
			contain
			class="ms-5"
			:max-height="this.maxHeight"
			:max-width="this.maxWidth"
			:src="this.src"
		/>
	</v-layout>
</template>

<script>
	const nullTypes = new Set(['', null, undefined, 0]);

	export default {
		props: {
			pImageUrl: {
				type: String,
				required: false,
			},
			/**------------------------------------------
			 * 사이즈를 String으로 받는 이유
			 *	- Number로 받으면 지정을 안해줄 경우 0이됨.
			 *  - 최대 사이즈 값이 없는것과 0이 구분이 안되어 기본값 적용이 어려워지기 때문
			 **------------------------------------------*/
			pMaxHeight: {
				type: String,
				required: false,
			},
			pMaxWidth: {
				type: String,
				required: false,
			},
		},
		data() {
			const initImageSize = this.getInitImageSize();
			console.log(initImageSize);
			return {
				maxHeight: initImageSize.maxHeight,
				maxWidth: initImageSize.maxWidth,
				// TODO 기본 이미지도 변경 필요
				src: nullTypes.has(this.pImageUrl)
					? 'https://picsum.photos/id/11/500/300'
					: this.pImageUrl,
			};
		},
		methods: {
			getInitImageSize() {
				const hasMaxHeight = !nullTypes.has(this.pMaxHeight);
				const hasMaxWidth = !nullTypes.has(this.pMaxWidth);
				if (hasMaxHeight && hasMaxWidth) {
					return {
						maxHeight: this.pMaxHeight,
						maxWidth: this.pMaxWidth,
					};
				}

				if (!hasMaxHeight && !hasMaxWidth) {
					return {
						maxHeight: 120,
						maxWidth: 120,
					};
				}

				if (hasMaxHeight) {
					return {
						maxHeight: this.pMaxHeight,
						maxWidth: '',
					};
				}

				return {
					maxHeight: '',
					maxWidth: this.pMaxWidth,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
