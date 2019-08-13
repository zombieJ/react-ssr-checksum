import * as React from 'react';
import warning from 'warning';
import { getCode, getSummary } from './util';

export interface CheckSumProps {
  checksumCode?: string;
  children?: React.ReactElement;
}

const CheckSum: React.FC<CheckSumProps> = ({ checksumCode, children }) => {
  const initRef = React.useRef<boolean>(null);
  const [showContent, setShowContent] = React.useState(true);

  // Force re-render
  React.useEffect(() => {
    if (!showContent) {
      setShowContent(true);
    }
  }, [showContent]);

  // Compare checksum
  if (!initRef.current && checksumCode) {
    initRef.current = true;

    const code: string = getSummary(children);

    if (checksumCode && checksumCode !== code) {
      warning(false, 'CheckSum failed. Will force re-render to sync.');
      setShowContent(false);
    }
  }

  if (!showContent) {
    return null;
  }

  return children;
};

export { getCode, getSummary };

export default CheckSum;
