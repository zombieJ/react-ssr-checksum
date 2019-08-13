import * as React from 'react';
import { hydrate } from 'react-dom';
import { renderToString } from 'react-dom/server';
import CheckSum, { getCode } from '../src';

const ssrContent = ['Hi Bamboo', 'Hi Light'];

const clientContent = ['Ant Design 棒极了'];

const Content: React.FC<{ content: string[]; title: string }> = ({ content, title }) => (
  <div>
    <h1>{title}</h1>
    {content.map(str => (
      <div key={str} dangerouslySetInnerHTML={{ __html: str }} />
    ))}
  </div>
);

const Demo: React.FC<{}> = () => {
  const [rendered, setRendered] = React.useState(false);
  const [ssrString, setSSRString] = React.useState('');
  const domRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    setSSRString(
      renderToString(
        <CheckSum>
          <Content title="English" content={ssrContent} />
        </CheckSum>,
      ),
    );

    // Insert dom node
    domRef.current = document.createElement('div');
    domRef.current.innerHTML = '----- RENDER PLACEHOLDER -----';
    document.body.appendChild(domRef.current);

    return () => {
      domRef.current.remove();
    };
  }, []);

  return (
    <div>
      <h1>SSR Danger HTML</h1>
      <textarea
        style={{ width: '100%' }}
        rows={6}
        value={ssrString}
        onChange={({ target: { value } }) => {
          setSSRString(value);
        }}
      />
      <h1>Client Render</h1>
      <button
        type="button"
        disabled={rendered}
        onClick={() => {
          domRef.current.innerHTML = ssrString;
          setRendered(true);

          setTimeout(() => {
            hydrate(
              <CheckSum checksumCode={getCode(ssrString)}>
                <Content title="中文" content={clientContent} />
              </CheckSum>,
              domRef.current,
            );
          });
        }}
      >
        Render!
      </button>
      <hr />
    </div>
  );
};

export default Demo;
