// @flow

export default function getDisplayName(Component: Function | string): string {
  if (typeof Component === 'string') {
    return Component;
  }
  if (!Component) {
    return undefined;
  }
  return Component.displayName || Component.name || 'Component';
}
