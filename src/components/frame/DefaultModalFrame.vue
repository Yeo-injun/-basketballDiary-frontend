<template>
    <v-dialog v-model="isActive" :max-width=this.pSize.maxWidth>
        
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<template v-slot:activator="{ on }">
            <slot name="modal-activator" :isActive="on" ></slot>
		</template>

        <!-- 모달 영역 -->
        <v-card v-if="isActive && isDataInit">
            <!-- 제목 영역 -->
            <slot name="title">모달 제목</slot>

            <!-- 본문 영역 -->
            <slot name="contents">기본 내용</slot>

            <!-- 액션 영역: 버튼 등을 자유롭게 구성 -->
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
    props: {
        pSize: {
            type: Object,
            default() {
                return {
                    maxWidth : '800px',
                };
            },
        },
        onOpen: {
            type    : Function,
            default : () => {},
        },
        onClose: {
            type    : Function,
            default : () => {},
        },
    },
    data() {
        return {
            isActive: false,
            isDataInit: false,
        };
    },
    watch: {
        isActive( openStatus ) {
            if ( openStatus ) {
                // 모달이 열릴 때 동작
                this._onOpen();
                return;
            }
            // 모달이 닫힐 때 동작
            this._onClose();
        }
    },
    methods: {
        // 모달 초기화를 위한 데이터 로드 처리
        async _onOpen() {
            await this.onOpen();
            this.isDataInit = true;
        },
        // 모달 닫히고 후처리
        async _onClose() {
            await this.onClose();
        },
        // 모달 열기
        open() {
            this.isActive = true;
        },
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
  