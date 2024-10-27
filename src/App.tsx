import React from 'react';
import './App.css';
import StepperComp from './components/StepperComp';
import NavBar from './components/NavBar';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <NavBar />
      </DndProvider>
      <StepperComp />
    </div>
  );
}

export default App;
