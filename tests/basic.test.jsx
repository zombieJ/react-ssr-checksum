import React from 'react';
import { renderToString } from 'react-dom/server';
import { mount } from 'enzyme';
import CheckSum from '../src';

describe('basic', () => {
  const errorSpy = jest.spyOn(console, 'error');

  beforeEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  describe('ssr', () => {
    function getContent() {
      return (
        <div>
          <h1>title</h1>
          <p>content of it</p>
        </div>
      );
    }

    // Server side
    const onCheckSum = jest.fn();
    const ssrString = renderToString(<CheckSum onCheckSum={onCheckSum}>{getContent()}</CheckSum>);
    const code = onCheckSum.mock.calls[0][0];

    it('correct', () => {
      mount(<CheckSum checksumCode={code}>{getContent()}</CheckSum>);
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('failed', () => {
      mount(
        <CheckSum checksumCode={code}>
          <div>{getContent()}</div>
        </CheckSum>,
      );
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: CheckSum failed. Will force re-render to sync.',
      );
    });
  });
});
