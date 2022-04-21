import { all, put, takeLatest } from 'redux-saga/effects';
import { commonHeader, endpoints } from 'helpers/calls';
import { constants } from 'helpers/consts';
import { BasicObject } from 'interfaces/common';

// Get data for each date (method used )
function* getHammurabiJobsDataDate(date: string) {
  try {
    let response: any;

    // @ts-ignore
    response = yield fetch(
      `${endpoints[`hammurabi_${date}`].url}`,
      {
        method: 'GET',
        headers: commonHeader,
      },
    );
    // @ts-ignore
    const data = yield response.json();
    return { ok: true, data, date }
  } catch (e) {
    return { ok: false, data: null, date: null }
  }
}

// Get data for every date
function* getHammurabiJobsDataAllDates() {
  const { TODAY, YESTERDAY, LASTDAYOFMONTH, LASTDAYOFQUARTER } = constants.HAMMURABI;
  const dates = [TODAY, YESTERDAY, LASTDAYOFMONTH, LASTDAYOFQUARTER];

  // Loop to get data for the 4 dates
  // @ts-ignore
  const responses = yield all(dates.map((date) => getHammurabiJobsDataDate(date)));
  let data: any[] = [];

  // Parsed data
  const responseFields: BasicObject = {};
  responseFields[TODAY] = 'jobsTodayCount';
  responseFields[YESTERDAY] = 'jobsYesterdayCount';
  responseFields[LASTDAYOFMONTH] = 'jobsLastDayLastMonthCount';
  responseFields[LASTDAYOFQUARTER] = 'jobsLastDayLastQuarterCount';

  responses.filter((response: any) => response.ok).forEach((response: any) => {
    const { data: dataDate, date: dateData } = response;
    const dataParsed = dataDate.map((row: any) => {
      const nextRow: BasicObject = { ...row };
      dates.forEach((date) => {
        const dateField = responseFields[date];
        if (dateData === date) {
          nextRow[dateField] = nextRow.jobsNumber;
        } else {
          nextRow[dateField] = 0;
        }
      });
      delete nextRow.jobsNumber;
      return nextRow;
    });
    data = data.concat(dataParsed)
  });
  yield put({ type: `hammurabi_grid_${constants.COMMON.SUCCEEDED}`, payload: { data: { data } }});
}

const hammurabiSagas = [
  takeLatest("hammurabi_grid_requested", getHammurabiJobsDataAllDates),
];

export default hammurabiSagas;
