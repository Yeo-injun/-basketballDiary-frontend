<template>
	<div>
		<v-img
			class="ms-5"
			:max-height="this.maxHeight"
			:max-width="this.maxWidth"
			:src="this.src"
		/>
	</div>
</template>

<script>
	const nullTypes = new Set(['', null, undefined, 0]);

	export default {
		props: {
			pImageUrl: {
				type: String,
				required: false,
			},
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
				src: nullTypes.has(this.pImageUrl)
					? 'https://picsum.photos/id/11/500/300'
					: this.pImageUrl,
			};
		},
		methods: {
			getInitImageSize() {
				const hasMaxHeight = nullTypes.has(this.pMaxHeight);
				const hasMaxWidth = nullTypes.has(this.pMaxWidth);
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
