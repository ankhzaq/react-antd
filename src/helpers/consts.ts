import mockupObjectsNoRules from '../mockups/objectsNoRules.json';

export const spaces = {
  header: 20,
  standard: 15
};

const pathDataquality = '/c/s/360-dataquality';
const patMicroNotifications = 'nbx-notifications/api/v0';

export const endpoints = {
  objectNoRules: {
    url: `${pathDataquality}/${patMicroNotifications}/objects-without-rules`,
    mockup: mockupObjectsNoRules
  }
}
