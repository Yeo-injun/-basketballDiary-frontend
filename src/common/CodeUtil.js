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
    getExerciseTimes(intervalMinutes) {
        if (typeof intervalMinutes == "undefined") {
            intervalMinutes = 30;
        }
        const result = [];
        const day = 24;
        
        let hour = 0;
        let minute = 0;
        result.push(Format.toTimes(hour, minute));
        while (hour < day) {
            minute += intervalMinutes;
            if (minute < 60) {
                result.push(Format.toTimes(hour, minute));
                continue;
            }
            minute -= 60;
            hour += 1;
            result.push(Format.toTimes(hour, minute));
        }
        return result;
    },
}

const Format = {
    toTimes(hour, minute) {
        if (typeof hour == "number") {
            hour = String(hour);
        }
        if (typeof minute == "number") {
            minute = String(minute);
        }
        return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    }    
}