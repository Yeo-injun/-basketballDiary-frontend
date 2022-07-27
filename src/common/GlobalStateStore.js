// 컴포넌트 전역에서 관리하고자 하는 상태를 관리하기 위한 저장소
// GlobalStateStore에 등록되어 있는 변수는 모든 컴포넌트에서 접근 가능
// 공식문서 : https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
// 참고문서 : https://velog.io/@ken1204/Vue%EC%9D%98-Reactivity-System-Vue2
// import { reactive } from 'Vue';

// export const loading = reactive({
//     isLoading: 0,
//   start() {
//     this.isLoaging = true;
//   },
//   end() {
//     this.isLoaging = false;
//   },
// });

// TODO 임시 객체 -> 상태관리를 위해 추가 구현 필요
export const loading = {
    isLoading : false,
    start() {
        this.isLoading = true;
    },
    end() {
        this.isLoading = false;
    }
}