import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Headers from "./components/headers/Headers";
import Pages from "./components/mainpages/Pages";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Headers />
          <Pages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};
export default App;
