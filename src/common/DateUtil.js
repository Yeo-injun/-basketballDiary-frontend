import ValidationUtil from './util/ValidationUtil';

const MON = '1';
const TUE = '2';
const WED = '3';
const THU = '4';
const FRI = '5';
const SAT = '6';
const SUN = '7';

const WEEK = function () {
	let week = {};
	week[MON] = '월';
	week[TUE] = '화';
	week[WED] = '수';
	week[THU] = '목';
	week[FRI] = '금';
	week[SAT] = '토';
	week[SUN] = '일';
	return week;
};

export default {
	TheWeek: {
		getDayNameByCode(code) {
			return WEEK()[code];
		},
		getDayOptions() {
			const weekMap = WEEK();
			const dayCodeList = Object.keys(weekMap);
			let dayOptions = [];
			dayCodeList.forEach(function (code) {
				const dayOption = {
					value: code,
					text: weekMap[code],
				};
				dayOptions.push(dayOption);
			});
			return dayOptions;
		},
		getMondayCode() {
			return MON;
		},
		getSundayCode() {
			return SUN;
		},
	},
	// TODO 삭제 예정
	Times: {
		getOptions(intervalMinutes) {
			if (typeof intervalMinutes == 'undefined') {
				intervalMinutes = 30;
			}
			const result = [];
			const theTimeOfTheDay = 24;

			let hour = 0;
			let minute = 0;
			result.push(this._genOptionFormat(hour, minute));
			while (hour < theTimeOfTheDay) {
				minute += intervalMinutes;
				if (minute < 60) {
					result.push(this._genOptionFormat(hour, minute));
					continue;
				}
				minute -= 60;
				hour += 1;
				result.push(this._genOptionFormat(hour, minute));
			}
			return result;
		},
		_genOptionFormat(hour, minute) {
			let result = {};
			result.text = Formatter.toTimes(hour, minute);
			result.value = Formatter.toHHmm(hour, minute);
			return result;
		},
		getFirstOptionValue(intervalMinutes) {
			return this.getOptions(intervalMinutes)[0].value;
		},
		getLastOptionValue(intervalMinutes) {
			const options = this.getOptions(intervalMinutes);
			const lastIndex = options.length - 1;
			return options[lastIndex].value;
		},
	},
	Format: {
		/* @return yyyy-mm-dd */
		toYmd(strYmd) {
			if (ValidationUtil.isNull(strYmd)) {
				return '';
			}
			return Formatter.toYmd(strYmd);
		},
		/* @return yyyyMMdd */
		toString(ymd) {
			if (ValidationUtil.isNull(ymd)) {
				return '';
			}
			return Formatter.toString(ymd);
		},
		/* @return hh:mm */
		toTime(time) {
			if (ValidationUtil.isNull(time)) {
				return Formatter.toTimes('00', '00');
			}

			if (typeof time == 'number') {
				time = String(time);
			}

			const hour = time.substr(0, 2);
			const minute = time.substr(2, 2);
			return Formatter.toTimes(hour, minute);
		},
	},
	getCurrentYmd() {
		const currentTimeStamp = new Date();
		const currentYear = currentTimeStamp.getFullYear();
		const currentMonth = String(currentTimeStamp.getMonth() + 1).padStart(
			2,
			'0'
		);
		const currentDay = String(currentTimeStamp.getDate()).padStart(2, '0');
		return `${currentYear}${currentMonth}${currentDay}`;
	},
}; //export

const Formatter = {
	toTimes(hour, minute) {
		if (typeof hour == 'number') {
			hour = String(hour);
		}
		if (typeof minute == 'number') {
			minute = String(minute);
		}
		return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
	},

	// TODO 삭제 예정
	toHHmm(hour, minute) {
		if (typeof hour == 'number') {
			hour = String(hour);
		}
		if (typeof minute == 'number') {
			minute = String(minute);
		}
		return `${hour.padStart(2, '0')}${minute.padStart(2, '0')}`;
	},
	toYmd(strYmd) {
		if (strYmd.length != 8) {
			throw new Error('날짜의 길이가 맞지 않습니다.');
		}
		const year = strYmd.substr(0, 4);
		const month = strYmd.substr(4, 2);
		const day = strYmd.substr(6, 2);
		const seperator = '-';
		return year + seperator + month + seperator + day;
	},
	toString(ymd) {
		if (typeof ymd != 'string') {
			ymd = String(ymd);
		}
		const regExp = /[0-9]/g;
		const strYmd = ymd.match(regExp).join('');
		return strYmd;
	},
};
