import wrapperToJSON from 'enzyme-to-json';

const GLOBAL_STATE = Symbol.for('$$jest-matchers-object');
const originalToMatchSnapshot = global[GLOBAL_STATE].matchers.toMatchSnapshot;

function isEnzyme(wrapper:any): boolean{
  if (typeof wrapper !== 'object' || Array.isArray(wrapper)) {
    return false;
  }

  return !!(wrapper.node && Array.isArray(wrapper.nodes) && wrapper.complexSelector);
}

export default function toMatchSnapshot(maybeEnzymeWrapper:any) {
  let snapshotableValue = maybeEnzymeWrapper;
  if (isEnzyme(maybeEnzymeWrapper)) {
    snapshotableValue = wrapperToJSON(maybeEnzymeWrapper);
  }

  return originalToMatchSnapshot.call(this, snapshotableValue);
}
