export default {
    getDaysOfTheWeek() {
        return [
            {text : "월", value: "1"},
            {text : "화", value: "2"},
            {text : "수", value: "3"},
            {text : "목", value: "4"},
            {text : "금", value: "5"},
            {text : "토", value: "6"},
            {text : "일", value: "7"},
        ];  
    },
    getExerciseTimes() {
        const result = [];
        const oneday = 24;
        for (let hour=0; hour<oneday; hour++) {
            let time00 = (hour + ":00").padStart(5, "0");
            result.push(time00);
            let time30 = (hour + ":30").padStart(5, "0");
            result.push(time30);
        }
        return result;
    },
}