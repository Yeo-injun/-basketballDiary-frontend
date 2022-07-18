export default {
    WEEKS : {
        "1" : "월",
        "2" : "화",
        "3" : "수",
        "4" : "목",
        "5" : "금",
        "6" : "토",
        "7" : "일",
    },
    getDayOfTheWeekByCode(code) {
        return this.WEEKS[code];
    },
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
        result.push(this.OptionFactory.time(hour, minute));
        while (hour < day) {
            minute += intervalMinutes;
            if (minute < 60) {
                result.push(this.OptionFactory.time(hour, minute));
                continue;
            }
            minute -= 60;
            hour += 1;
            result.push(this.OptionFactory.time(hour, minute));
        }
        return result;
    },
    Format : {
        toTimes(hour, minute) {
            if (typeof hour == "number") {
                hour = String(hour);
            }
            if (typeof minute == "number") {
                minute = String(minute);
            }
            return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        },
        toHHmm(hour, minute) {
            if (typeof hour == "number") {
                hour = String(hour);
            }
            if (typeof minute == "number") {
                minute = String(minute);
            }
            return `${hour.padStart(2, "0")}${minute.padStart(2, "0")}`;
        },
        toYmd(strYmd) {
            if (strYmd.length != 8) {
                throw new Error("날짜의 길이가 맞지 않습니다.");
            }
            const year = strYmd.substr(0,4);
            const month = strYmd.substr(4,2);
            const day = strYmd.substr(6,2);
            const seperator = '-';
            return year + seperator + month + seperator + day;
        }    
    },
    OptionFactory : {
        time(hour, minute) {
            let result = {};
            result.text = this.Format.toTimes(hour, minute);
            result.value = this.Format.toHHmm(hour, minute);
            return result;
        },
    }
}

