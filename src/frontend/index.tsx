import * as React from 'react';
import { render } from 'react-dom';
import {Main} from './containers/main';
//import { AppContainer } from "react-hot-loader";
//import App from "./components/App";

const rootEl = document.getElementById('root');

render(
    <Main/>, rootEl
);
