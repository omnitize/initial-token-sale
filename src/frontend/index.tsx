import * as React from 'react';
import { render } from 'react-dom';
import { Main } from './containers/main';

const rootEl = document.getElementById("root");

render(
    <Main />, rootEl
);
