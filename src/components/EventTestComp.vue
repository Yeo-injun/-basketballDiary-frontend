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
	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		data() {
			return {
				lastTapTime: 0,
				timeSinceLastTap: 0,
				touchPositions: {
					startX: 0,
					startY: 0,
					endX: 0,
					endY: 0,
				},
				isRightSwipe: false,
			};
		},
		methods: {
			isDoubleTap() {
				const currentTime = new Date().getTime();
				this.timeSinceLastTap = currentTime - this.lastTapTime;

				if (this.timeSinceLastTap < 300) {
					return true;
				}
				this.lastTapTime = currentTime;

				return false;
			},
			onRightButtonClick(e) {
				console.log(e);
				console.log(
					'============================== RigthButton Click===================='
				);
				e.preventDefault();
			},
			onTouchStart(e) {
				console.log('TouchStart');
				console.log(e);
				this.touchPositions.startX = e.touches[0].screenX;
				this.touchPositions.startY = e.touches[0].screenY;

				if (this.isDoubleTap()) {
					console.log('DobleTab');
				}
			},
			onTouchEnd(e) {
				console.log('TouchEnd');
				console.log(e);
				if (this.isRightSwipe) {
					console.log('RightSwipeDone');
					alert('RightSwipeDone');
					this.isRightSwipe = false;
				}
			},
			onTouchMove(e) {
				// console.log('MOVE');
				console.log(this.touchPositions.startX - e.touches[0].screenX);
				const distance = 10;
				const isEnoughMoveToRight =
					this.touchPositions.startX - e.touches[0].screenX + distance < 0;
				if (isEnoughMoveToRight) {
					this.isRightSwipe = true;
				}
			},
			onClick() {
				console.log(ValidationUtil.isNull([{}]));
				console.log('CLICK');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
