import expect from 'expect';
import * as dateUtils from '../dateUtils.js';

describe('Date Utilities', () => {

    it('can get current name of day', () => {
        let tuesday = dateUtils.getWeekdayName(new Date('Tue Feb 23 2016 22:41:52 GMT+0000 (GMT)')); 
        let friday = dateUtils.getWeekdayName(new Date('Fri Feb 19 2016 22:41:52 GMT+0000 (GMT)'));

        expect(tuesday).toEqual('Tuesday');
        expect(friday).toEqual('Friday');
    });

    it('can get historical days counting back from current day', () => {
        let date = 'Tue Feb 23 2016 22:41:52 GMT+0000 (GMT)';
        let fourDaysAgo = dateUtils.historicalDate(new Date(date), 4);
        let twentyEightDaysAgo = dateUtils.historicalDate(new Date(date), 28);

        expect(fourDaysAgo).toEqual(new Date('Fri Feb 19 2016 22:41:52 GMT+0000 (GMT)'));
        expect(twentyEightDaysAgo).toEqual(new Date('Fri Jan 26 2016 22:41:52 GMT+0000 (GMT)'));
    });
});
