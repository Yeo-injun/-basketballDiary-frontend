<template>
    <v-row>
        <v-col :cols="pLabelAreaSize"> {{ this.pLabel }} </v-col>
        <v-col>
            <v-radio-group v-if="'row' === this.pArrangeType" v-model="model" row>
                <div v-for="radio in pButtons" :key="radio.label">
                    <v-radio 
                        :label="radio.label"
                        :value="radio.value">
                    </v-radio>
                </div>
            </v-radio-group>
            <v-radio-group v-else-if="'column' === this.pArrangeType" v-model="model" column>
                <div v-for="radio in pButtons" :key="radio.label">
                    <v-radio 
                        :label="radio.label"
                        :value="radio.value">
                    </v-radio>
                </div>
            </v-radio-group>

        </v-col>
    </v-row>

</template>

<script>
    /** Backend API */
    /** Code */
    /** Utils */
    import ValidationUtil from '@/common/util/ValidationUtil';
    /** Components */
    /** Emit Event */

	export default {
        props : {
            pLabelAreaSize : {          // 라벨영역의 크기
                type    : Number ,   
                default : 2,
            },
            pLabel      : String    ,   // input의 Label명칭
            pData       : String    ,   // input의 초기화 데이터
            pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
            pButtons : {
                type : Array,
                required : true,
            },
            pArrangeType : {
                type    : String,
                default : "row",
            },
        },
        data() {
            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
            }
        },
        methods: {
            getSelected() {
                return this.model;
            },
            checkValue() {
                if ( !this.pRequired ) {
                    return true;
                }
                if ( ValidationUtil.isNull( this.model ) ) {
                    return "라디오는 필수 선택값입니다.";
                }
                return true;
            }
        },
    }

</script>

<style>
</style>



