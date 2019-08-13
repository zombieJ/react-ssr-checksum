import * as React from 'react';
import { renderToString } from 'react-dom/server';
import md5 from 'md5';

export function getCode(text: string) {
  return md5(text);
}

export function getSummary(rootNode: React.ReactElement): string {
  return getCode(renderToString(rootNode));
}
