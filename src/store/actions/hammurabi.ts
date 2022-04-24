import { constants } from '../../helpers/consts';

const SCREEN_KEY = constants.SCREEN_IDS.hammurabi;

export const getHammurabiDataAction = (payload = {}) =>  ({
  payload,
  type: `${SCREEN_KEY}_grid_${constants.COMMON.REQUESTED}`,
})

export const setFiltersAction = (payload = {}) =>  ({
  payload,
  type: `${SCREEN_KEY}_filtersPanel`,
})
