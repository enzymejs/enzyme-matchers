import JSDOMEnvironment from 'jest-environment-jsdom';

export default class EnzymeEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);
    const testEnvironmentOptions = config.testEnvironmentOptions || {};
    this.global.enzymeAdapterDescriptor = testEnvironmentOptions.enzymeAdapter;
    this.global.bootstrapEnzymeEnvironment = true;
  }
}
