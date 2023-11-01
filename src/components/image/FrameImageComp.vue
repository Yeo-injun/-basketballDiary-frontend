<template>
	<v-layout align-center justify-center>
		<v-img
			contain
			class="ms-5"
			:max-height="this.maxHeight"
			:max-width="this.maxWidth"
			:lazy-src="this.lazySrc"
			:src="this.src"
			@error="handleLoadError"
		>
		</v-img>
	</v-layout>
</template>

<script>
	import ImageClient from '@/http/ImageClient.js';

	const nullTypes = new Set(['', null, undefined, 0]);
	const DEFAULT_IMAGE_URL = 'https://picsum.photos/id/11/500/300'; // TODO 기본 이미지도 변경 필요
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
			return {
				maxHeight: initImageSize.maxHeight,
				maxWidth: initImageSize.maxWidth,
				lazySrc: DEFAULT_IMAGE_URL, // 본 이미지 로딩되기 전 이미지
				src: nullTypes.has(this.pImageUrl)
					? DEFAULT_IMAGE_URL
					: ImageClient.toImageServerUrl(this.pImageUrl),
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
			handleLoadError() {
				// 이미지 로드 에러발생시 기본이미지로 세팅
				this.src = DEFAULT_IMAGE_URL;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
