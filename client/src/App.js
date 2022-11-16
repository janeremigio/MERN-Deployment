import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Form from './components/Form';
import ViewOne from './components/ViewOne';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <hr/>

      <Routes>
        {/* main */}
        <Route path="/pets" element={<Main/>}/>

        {/* create */}
        <Route path="/pets/new" element={<Form/>}/>

        {/* view one */}
        <Route path="/pets/:id" element={<ViewOne/>}/>

        {/* edit/update */}
        <Route path="/pets/:id/edit" element={<Edit/>}/>

        {/* redirect */}
        <Route path="*" element={<Navigate to="/pets" replace/>}/>
      </Routes>

    </div>
  );
}

export default App;