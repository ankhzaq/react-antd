import mockupObjectsNoRules from '../mockups/objectsNoRules.json';
import mockupHammurabi from '../mockups/hammurabi.json';

export const spaces = {
  header: 20,
  standard: 15
};

const pathDQ = '/api';
const pathMicroNBX = 'nbx';
const pathMicroNotifications = 'notifications';

export const endpoints = {
  hammurabi: {
    url: `${pathDQ}/${pathMicroNBX}/pathMicroNBX`,
    mockup: mockupObjectsNoRules
  },
  objectNoRules: {
    url: `${pathDQ}/${pathMicroNotifications}/objects-without-rules`,
    mockup: mockupObjectsNoRules
  }
}
