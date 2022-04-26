import { constants } from '../../helpers/consts';

const SCREEN_KEY = constants.SCREEN_IDS.refusals;

export const getRefusalsDataAction = (payload = {}) =>  ({
  payload,
  type: `${SCREEN_KEY}_grid_${constants.COMMON.REQUESTED}`,
})

export const setFiltersAction = (payload = {}) =>  ({
  payload,
  type: `${SCREEN_KEY}_filtersPanel`,
})
