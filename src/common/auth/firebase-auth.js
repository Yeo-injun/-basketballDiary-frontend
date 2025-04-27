/**
 * Add SDKs for Firebase products that you want to use
 * https://firebase.google.com/docs/web/setup#available-libraries
 */
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// Firebase Console > 프로젝트 선택 > 좌측 프로젝트 개요 옆 톱니바퀴 아이콘 클릭 > 프로젝트 설정 화면의 일반 탭 > 내 앱 > SDK 설정 및 구성 제공
// cf. Firebase 환경변수는 인프라 프로젝트에서 젠킨스파일에서 관리하고 있음
const firebaseConfig = {
  apiKey            : process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain        : "basketball-diary-auth.firebaseapp.com",
  projectId         : "basketball-diary-auth",
  storageBucket     : "basketball-diary-auth.firebasestorage.app",
  messagingSenderId : process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId             : process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId     : process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// firebaseConfig를 이용하여 Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // TODO 사용방법 확인 필요

// 인증 서비스 객체 획득
const auth = getAuth( app );

/**
 * 구글 소셜 로그인
 * @return {Promise<string>} idToken 인증토큰( 로그인 성공시 )
 */
export async function googleLogin() {
    // 팝업을 통한 로그인 시도
    const result = await signInWithPopup(auth, new GoogleAuthProvider() );
    console.log( result );
    // 로그인 성공 시 사용자 정보 + idToken
    const user = result.user;
    const idToken = await user.getIdToken();
    return idToken;
}