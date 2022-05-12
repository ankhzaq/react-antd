import { all, put, takeLatest } from 'redux-saga/effects';
import { commonHeader, endpoints } from 'helpers/calls';
import { constants } from 'helpers/consts';
import { BasicObject } from 'interfaces/common';

const SCREEN_ID = constants.SCREEN_IDS.refusals;

// Get data for every date
function* getRefusalsJobsDataAllDates() {
  // @ts-ignore
  const response: any = yield fetch(
    `${endpoints[`${SCREEN_ID}_grid`].url}`,
    {
      method: 'GET',
      headers: commonHeader,
    },
  );
  // @ts-ignore
  const responseParsed = yield response.json();


  const { TODAY, YESTERDAY, LASTDAYOFMONTH, LASTDAYOFQUARTER } = constants.HAMMURABI;
  const dates = [TODAY, YESTERDAY, LASTDAYOFMONTH, LASTDAYOFQUARTER];

  let data: any = [];

  // Parsed data
  const responseFields: BasicObject = {};
  responseFields[TODAY] = 'jobsTodayCount';
  responseFields[YESTERDAY] = 'jobsYesterdayCount';
  responseFields[LASTDAYOFMONTH] = 'jobsLastDayLastMonthCount';
  responseFields[LASTDAYOFQUARTER] = 'jobsLastDayLastQuarterCount';

  dates.forEach((date: string) => {
    const dataDate = responseParsed[date];
    const dataDateParsed = dataDate.map((row: any) => {
      const countDate = responseFields[date];
      row[countDate] = row.count;
      delete row.count;
      return row;
    });
    data = data.concat(dataDateParsed);
  });

  yield put({ type: `${SCREEN_ID}_grid_${constants.COMMON.SUCCEEDED}`, payload: { data: { data } }});
}

const refusalsSagas = [
  takeLatest(`${SCREEN_ID}_grid_${constants.COMMON.REQUESTED}`, getRefusalsJobsDataAllDates),
];

export default refusalsSagas;
