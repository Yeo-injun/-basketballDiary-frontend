<template>
    <v-dialog v-model="isActive" max-width="800px">
        
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<template v-slot:activator="{ on }">
            <slot name="modal-activator" :isActive="on" ></slot>
		</template>

        <!-- 모달 영역 -->
        <v-card>
            <!-- 모달 제목 영역 -->
            <slot name="title">모달 제목</slot>

            <!-- 모달 본문 영역 -->
            <slot name="contents">기본 내용</slot>

            <!-- 모달 액션 영역: 슬롯으로 버튼 등을 자유롭게 구성 -->
            <v-card-actions>
                <slot name="actions">
                    <!-- 기본 액션 버튼 (부모에서 슬롯 오버라이드 가능) -->
                    <v-btn text color="primary" @click="onCancel">취소</v-btn>
                    <v-btn text color="primary" @click="onConfirm">확인</v-btn>
                </slot>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>
  
<script>
export default {
    data() {
        return {
            isActive: false,
        };
    },
    watch: {
        isActive( openStatus ) {
            if ( openStatus ) {
                // 모달이 열릴 때 동작
                return;
            }
            // 모달이 닫힐 때 동작
        }
    },
    methods: {
        // 모달 닫기
        close() {
            this.isActive = false;
        },
        onCancel() {
            this.$emit('cancel');
            this.close();
        },
        onConfirm() {
            this.$emit('confirm');
            this.close();
        },
    },
};
</script>
  