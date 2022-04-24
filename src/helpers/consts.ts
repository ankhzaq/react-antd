import mockupDrilldownGridMetrics from '../mockups/drilldownGridMetrics.json';
import mockupObjectsNoRules from '../mockups/objectsNoRules.json';
import mockupHammurabi from '../mockups/hammurabi.json';
import mockupHammurabigraphicRules from '../mockups/hammurabiGraphicRules.json';
import { BasicObject } from '../interfaces/common';

export const COLORS = {
  GREEN: '#07c375',
  YELLOW: '#fba202'
};

export const spaces = {
  header: 20,
  standard: 15
};

export const heights = {
  header: 87,
  toolbar: 53,
  dockbox: 107
};

export const constants = {
  ALL: 'ALL',
  COMMON: {
    REQUESTED: 'requested',
    SUCCEEDED: 'succeeded',
  },
  HAMMURABI: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LASTDAYOFMONTH: 'lastdayOfMonth',
    LASTDAYOFQUARTER: 'lastDayOfQuarter'
  },
  SCREEN_IDS: {
    drilldown: 'drilldown',
    hammurabi: 'hammurabi',
    objectsNoRules: 'objectsNoRules',
  }
};
