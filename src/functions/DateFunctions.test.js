import { formatDate, formatTime, addDaysToDate, getStartOfWeek,getEndOfWeek } from './DateFunctions.js'

test('Format date to MM-DD-YYYYa',()=>{
    var date1 = new Date('December 17, 1995 03:24:00');
    expect(formatDate(date1)).toBe('12-17-95')
})

test('Format time to HHa',()=>{
    var date1 = new Date('December 17, 1995 03:00:00');
    var date2 = new Date('December 17, 1995 00:00:00');
    var date3 = new Date('December 17, 1995 19:00:00');
    var date4 = new Date('December 17, 1995 12:00:00');
    expect(formatTime(date1)).toBe('3am') &&
    expect(formatTime(date2)).toBe('12am') &&
    expect(formatTime(date3)).toBe('7pm') &&
    expect(formatTime(date4)).toBe('12pm')
})
test('Add Days to date',()=>{
    var initialDate = new Date('December 17, 2019 03:24:00');
    var nextDate = new Date('December 24, 2019 03:24:00');
    expect(addDaysToDate(initialDate,7)).toStrictEqual(nextDate)
})

test('Get start of the week',()=>{
    var initialDate = new Date('July 10, 2019 03:24:00');
    var date0 = new Date('July 07, 2019 03:24:00');
    var date1 = new Date('July 08, 2019 03:24:00');
    var date2 = new Date('July 09, 2019 03:24:00');
    var date3 = new Date('July 10, 2019 03:24:00');
    var date4 = new Date('July 04, 2019 03:24:00');
    var date5 = new Date('July 05, 2019 03:24:00');
    var date6 = new Date('July 06, 2019 03:24:00');

    expect(getStartOfWeek(initialDate,0)).toStrictEqual(date0) &&
    expect(getStartOfWeek(initialDate,1)).toStrictEqual(date1) &&
    expect(getStartOfWeek(initialDate,2)).toStrictEqual(date2) &&
    expect(getStartOfWeek(initialDate,3)).toStrictEqual(date3) &&
    expect(getStartOfWeek(initialDate,4)).toStrictEqual(date4) &&
    expect(getStartOfWeek(initialDate,5)).toStrictEqual(date5) &&
    expect(getStartOfWeek(initialDate,6)).toStrictEqual(date6) 
})

test('Get end of the week',()=>{
    var initialDate = new Date('July 10, 2019 03:24:00');
    var date0 = new Date('July 13, 2019 03:24:00');
    var date1 = new Date('July 14, 2019 03:24:00');
    var date2 = new Date('July 15, 2019 03:24:00');
    var date3 = new Date('July 16, 2019 03:24:00');
    var date4 = new Date('July 10, 2019 03:24:00');
    var date5 = new Date('July 11, 2019 03:24:00');
    var date6 = new Date('July 12, 2019 03:24:00');

    expect(getEndOfWeek(initialDate,0)).toStrictEqual(date0)
    expect(getEndOfWeek(initialDate,1)).toStrictEqual(date1) &&
    expect(getEndOfWeek(initialDate,2)).toStrictEqual(date2) &&
    expect(getEndOfWeek(initialDate,3)).toStrictEqual(date3) &&
    expect(getEndOfWeek(initialDate,4)).toStrictEqual(date4) &&
    expect(getEndOfWeek(initialDate,5)).toStrictEqual(date5) &&
    expect(getEndOfWeek(initialDate,6)).toStrictEqual(date6) 
})