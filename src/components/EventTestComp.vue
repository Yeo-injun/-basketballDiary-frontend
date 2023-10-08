<template>
	<v-btn
		@click.right="onClick"
		@contextmenu="onRightButtonClick"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
		@touchmove="onTouchMove"
	>
		이벤트 테스트 버튼
	</v-btn>
</template>

<script>
	export default {
		data() {
			return {
				lastTapTime: 0,
				timeSinceLastTap: 0,
			};
		},
		methods: {
			onRightButtonClick(e) {
				console.log(e);
				console.log(
					'============================== RigthButton Click===================='
				);
				e.preventDefault();
			},
			onTouchStart() {
				const currentTime = new Date().getTime();
				this.timeSinceLastTap = currentTime - this.lastTapTime;
				if (this.timeSinceLastTap < 300) {
					console.log('DobleTab');
					// console.log(this.lastTapTime);
				}
				// else {
				// 	console.log('Tab');
				// 	// console.log(this.lastTapTime);
				// }

				this.lastTapTime = currentTime;
			},
			onTouchEnd() {
				if (this.timeSinceLastTap < 300) {
					// console.log('DobleTab');
					// console.log(this.lastTapTime);
				} else {
					console.log('TouchEnd');
				} // console.log(this.lastTapTime);
			},
			onTouchMove(e) {
				console.log('MOVE');
				console.log(e);
			},
			onClick() {
				console.log('CLICK');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
