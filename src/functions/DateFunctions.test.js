import { formatDate } from './DateFunctions.js'

test(' Format dat to MM-DD-YYYYa',()=>{
    var date1 = new Date('December 17, 1995 03:24:00');
    expect(formatDate(date1)).toBe('12-17-95')
})