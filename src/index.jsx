import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import moviesApp from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// Main component ( will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="Main-Content-Container mt-4b">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// finds the root of the application
const container = document.getElementsByClassName("app-container")[0];

// tells React to render your app in the root DOM element container
ReactDOM.render(React.createElement(MyFlixApplication), container);
