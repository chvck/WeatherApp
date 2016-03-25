import request from 'superagent';
import * as db from '../../database/database.js';
import * as xml from 'xml2js';

export function getCurrentWeather(req, res) {
    let url = 'http://wxdata.weather.com/wxdata/weather/local/UKXX0085?cc=*&unit=m&dayf=4';
    
    request.get(url)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if(err) {
            res.status(400);
            res.json({error: err});
        } else {
            xml.parseString(response.text, (err, result) => {
                let days = result.weather.dayf[0].day;
                let today = new Date();
                let absoluteDate = new Date(today.getFullYear(), today.getDay(), today.getMonth());
                let yesterdayTimestamp = absoluteDate.setDate(absoluteDate.getDate() - 1);

                db.GetByTimestamp(yesterdayTimestamp, (err, yesterday ) => {
                    let forecast = [];
                    forecast.push(yesterday[0]);

                    days.map((day,index) => {
                        let dateTime = absoluteDate.setDate(absoluteDate.getDate() + index);
                        let weekday = day.$.t;
                        let dayHi = day.hi[0];
                        let dayLow = day.low[0];
                        let conditions = day.part[0].t[0];
                        let weatherObject = db.weatherRow(dateTime, weekday, dayHi, dayLow, conditions);

                        db.insertDateRow(weatherObject);
                        forecast.push(weatherObject);
                    });
                    res.json(forecast);               
                });

            });
        }
    });
}
