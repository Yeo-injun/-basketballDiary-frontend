<template>
<div>
    <v-chip label color="green" text-color="white">내정보</v-chip>        
    <v-container>
        <v-card>
            <v-row>
                <v-col>이름 :</v-col>
                <v-col>{{myinfo.userName}}</v-col>
            </v-row>
            <v-row>
                <v-col>이메일 :</v-col>
                <v-col>{{myinfo.email}}</v-col>
            </v-row>
            <v-row>
                <v-col>포지션 : </v-col>
                <v-col>
                    <v-row>
                        <v-checkbox v-model="selected" label="포인트가드" value="10"></v-checkbox>
                        <v-checkbox v-model="selected" label="슈팅가드" value="20"></v-checkbox>                
                        <v-checkbox v-model="selected" label="스몰포워드" value="30"></v-checkbox>                
                        <v-checkbox v-model="selected" label="파워포워드" value="40"></v-checkbox>                
                        <v-checkbox v-model="selected" label="센터" value="50"></v-checkbox>
                    </v-row>                 
                </v-col>                
            </v-row>
            <v-row>
                <v-col>키 : </v-col>
                <v-col>{{myinfo.height}}</v-col>
            </v-row>
            <v-row>
                <v-col>몸무게 : </v-col>
                <v-col>{{myinfo.weight}}</v-col>
            </v-row>
            <v-row>
                <v-col>활동지역 : </v-col>
                <v-col>
                    <v-select :items="items" label="시도" solo></v-select>
                </v-col>
            </v-row>
        </v-card>
        <v-btn class="float-right" v-on:click="save()">수정</v-btn>
    </v-container>
</div>
        
</template>

<script>
import myProfileApi from '@/api/AuthUserAPI';

export default {
    data: () => {
        return {
            myinfo:{},
            selected:[],
            items: ['시도','서울시','부산시','대구시','대전시','광주시','울산시','세종시','인천시','경기도','강원도','충청북도','충청남도','경상북도','경상남도','전라북도','전라남도','제주도'],
        }
    },
    methods: {
        async load(){
            const params = {//eslint-disable-line no-unused-vars
                userSeq: 3,
            };
            this.myinfo = (await myProfileApi.getMyInfo()).data;
            this.selected.push(this.myinfo.positionCode);
            console.log(this.myinfo.data);
        },
        async save(){
            this.selected.forEach(e=>this.myinfo.positionCode=e);
            await myProfileApi.updateUser(this.myinfo);
        }
    },
    mounted () {
        this.load();
    }
}
</script>

<style>

</style>