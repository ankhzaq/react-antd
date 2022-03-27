import mockupObjectsNoRules from '../mockups/objectsNoRules.json';
import mockupHammurabi from '../mockups/hammurabi.json';
import mockupHammurabigraphicRules from '../mockups/hammurabiGraphicRules.json';
import { BasicObject } from '../interfaces/common';

export const spaces = {
  header: 20,
  standard: 15
};

export const heights = {
  header: 87,
  toolbar: 53
};

export const constants = {
  ALL: 'ALL'
};

const pathDQ = '/api';
const pathMicroNBX = 'nbx';
const pathMicroNotifications = 'notifications';

export const endpoints: BasicObject = {
  hammurabi: {
    url: `${pathDQ}/${pathMicroNBX}/pathMicroNBX`,
    mockup: mockupHammurabi
  },
  hammurabiGraphicRules: {
    url: `${pathDQ}/${pathMicroNBX}/hammurabi-rules`,
    mockup: mockupHammurabigraphicRules
  },
  objectNoRules: {
    url: `${pathDQ}/${pathMicroNotifications}/objects-without-rules`,
    mockup: mockupObjectsNoRules
  }
}
