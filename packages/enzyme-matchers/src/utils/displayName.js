// @flow

export default function getDisplayName(Component: Function | string): string {
  if (typeof Component === 'string') {
    return Component;
  }
  if (!Component) {
    // Should never actually reach here, Function cannot be falsy.
    return 'undefined';
  }
  return Component.displayName || Component.name || 'Component';
}
