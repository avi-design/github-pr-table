import React from 'react';
import GitHubPRListContainer from "./PullRequestCard";

const App = () => {
  return (
    <div className="App">
       <h2 className="mb-4">Git Pull Requests Table</h2>
      <GitHubPRListContainer />
    </div>
  );
};

export default App;
