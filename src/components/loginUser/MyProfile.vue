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
                        <v-checkbox v-model="selected" label="포인트가드" value="10" ></v-checkbox>
                        <v-checkbox v-model="selected" label="슈팅가드" value="20" ></v-checkbox>                
                        <v-checkbox v-model="selected" label="스몰포워드" value="30" ></v-checkbox>                
                        <v-checkbox v-model="selected" label="파워포워드" value="40" ></v-checkbox>                
                        <v-checkbox v-model="selected" label="센터" value="50" ></v-checkbox>
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
                <v-col>주소 : </v-col>
                <v-col>
                    <v-text-field v-model="address" @click="showAPI()" solo></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="float-right" @click="save()">수정</v-btn>    
                </v-col>
            </v-row>  
            <v-row justify="center">                
                <v-btn to="/updatePassword">비밀번호 변경</v-btn>
                <v-btn to="/signOutAccount">회원탈퇴</v-btn>                             
            </v-row>      
        </v-card>
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
            address:'',
        }
    },
    methods: {
        async load(){
            this.myinfo = (await myProfileApi.getMyInfo()).data;
            this.selected.push(this.myinfo.positionCode);
            // console.log(this.myinfo.data);
        },
        async save(){
            this.selected.forEach(e=>this.myinfo.positionCode=e);
            const success = await myProfileApi.updateUser(this.myinfo);
            console.log(success);
        },
        // kakao Address API 사용 설명 : https://chlost.tistory.com/53
        showAPI(){            
            // 단, 왜 arrow function을 사용했을까?
            // 출처 : https://medium.com/@hozacho/vuejs%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-ec067c342412
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.address = data.address;
                    // console.log(this.address);
                    console.log(data);
                }
            }).open();
        }
    },
    mounted () {
        this.load();
    }
}
</script>

<style>

</style>