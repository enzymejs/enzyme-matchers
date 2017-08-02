// @flow

import colors from './colors';

function stringifySingle(key: string, value: any): Array<string> {
  let stringifyingValue = value;
  if (Array.isArray(value)) {
    const values = value.map(v => stringifySingle('', v)[1]);

    // replace value with something safe so that the JSON.stringify call won't
    // complain about circular values since we've already safely dealt with those above
    // eslint-disable-next-line no-param-reassign
    value = [];

    let joined = values.join(' ');
    let initialBracket = colors.gray('[');
    const endingBracket = colors.gray(']');

    if (joined.length > 20) {
      const pad = '\n  ';
      joined = `${values.join(pad)}\n`;
      initialBracket += pad;
    }

    stringifyingValue = colors.gray(
      `${initialBracket}${joined}${endingBracket}`
    );
  } else if (value === null) {
    stringifyingValue = colors.gray(value);
  } else if (typeof value === 'object') {
    stringifyingValue = colors.gray(value.toString());
  } else if (typeof value === 'string') {
    stringifyingValue = colors.gray(`"${value}"`);
  } else if (typeof value === 'number') {
    stringifyingValue = colors.blue(value);
  } else if (value) {
    stringifyingValue = colors.green(value);
  } else if (!value) {
    stringifyingValue = colors.red(value);
  }

  try {
    // circular if you cant stringify
    JSON.stringify({ [key]: value });

    return [key, stringifyingValue];
  } catch (e) {
    return [key, colors.gray('[Circular]')];
  }
}

function color([key, value]): string {
  return `${colors.yellow(key)}${colors.gray(':')} ${colors.yellow(value)}`;
}

export default function stringify(object: Object): string {
  const keys = Object.keys(object);

  return keys.map(key => color(stringifySingle(key, object[key]))).join('\n');
}
