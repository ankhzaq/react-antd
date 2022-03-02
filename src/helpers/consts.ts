import mockupObjectsNoRules from '../mockups/objectsNoRules.json';

export const spaces = {
  header: 20,
  standard: 15
};

const pathDataquality = '/api';
const patMicroNotifications = 'notifications';

export const endpoints = {
  objectNoRules: {
    url: `${pathDataquality}/${patMicroNotifications}/objects-without-rules`,
    mockup: mockupObjectsNoRules
  }
}
