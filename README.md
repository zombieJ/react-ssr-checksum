# CheckSum

`react-ssr-checksum` is a component to help re-render if client not sync with server.

### Usage

Generate check sum code on server side:

```jsx
import { getCode } from 'react-ssr-checksum';

const ssrText = renderToString(<App />);
const code = getCode(ssrText);

// Put the code in your html template
```

Client side use `CheckSum` component:

```jsx
hydrate(
  <CheckSum checksumCode={code}>
    <App />
  </CheckSum>,
  root,
);
```

CheckSum component will auto check code between server & client side. It will auto re-render if not match.
