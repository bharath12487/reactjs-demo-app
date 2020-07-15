import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import ListQuestionComponent from "./component/ListQuestionComponent";
import AddQuestionComponent from "./component/AddQuestionComponent";
import EditQuestionComponent from "./component/EditQuestionComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-12">
                  <h1 className="text-center" style={style}>React Question Application</h1>
                  <Switch>
                      <Route path="/" exact component={ListQuestionComponent} />
                      <Route path="/questions" component={ListQuestionComponent} />
                      <Route path="/add-question" component={AddQuestionComponent} />
                      <Route path="/edit-question" component={EditQuestionComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;