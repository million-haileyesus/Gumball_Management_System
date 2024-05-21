// App.js
import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AddGundamForm from './components/AddGundamForm';
import Footer from './components/Footer';
import GundamTable from './components/GundamTable';
import Hero from './components/Hero';
import HowToBuild from './components/HowToBuild';
import Navbar from './components/Navbar';
import Tools from './components/ToolsSection';
import Types from './components/TypesSection';
import About from './About';
import Contact from './Contact';
import SignUp from './SignUp';
import Login from './Login';

function App() {
    const [gundams, setGundams] = useState([]);
    const [newGundamData, setNewGundamData] = useState({
      ModelName: '',
      Grade: '',
      Scale: '',
      Progress: ''
    });
    const [cookies] = useCookies(["token"]);

    const isAuthenticated = cookies.token !== undefined;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/gundams');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const gundamsData = await response.json();
          setGundams(gundamsData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    const addGundam = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/gundams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newGundamData)
        });
        const newGundam = await response.json();
        
        setGundams([...gundams, newGundam]);
        setNewGundamData({
          ModelName: '',
          Grade: '',
          Scale: '',
          Progress: ''
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    const deleteGundam = async (id) => {
      try {
          await fetch(`http://localhost:3001/api/gundams/${id}`, {
              method: 'DELETE'
          });
          setGundams(gundams.filter(gundam => gundam._id !== id));
      } catch (error) {
          console.log("Damn");
          console.error(error);
      }
    };  
  
    const updateGundam = async (id, updatedData) => {
      try {
          const response = await fetch(`http://localhost:3001/api/gundams/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
          });
  
          if (!response.ok) {
              throw new Error(`Failed to update Gundam. Status: ${response.status}`);
          }
  
          const updatedGundam = await response.json();
  
          // Update the state (gundams) with the updatedGundam
          setGundams((prevGundams) =>
              prevGundams.map((gundam) => (gundam._id === id ? updatedGundam : gundam))
          );
  
          alert('Gundam updated successfully');
      } 
      catch (error) {
          console.error('Error updating Gundam:', error);
      }
  };
  
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Dashboard
                            gundams={gundams}
                            addGundam={addGundam}
                            newGundamData={newGundamData}
                            setNewGundamData={setNewGundamData}
                            deleteGundam={deleteGundam}
                            updateGundam={updateGundam}
                        />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
);
}

const Dashboard = ({
    gundams,
    addGundam,
    newGundamData,
    setNewGundamData,
    deleteGundam,
    updateGundam,
    }) => (
<div>
    <Hero />
    <div id="content">
        <div id="twoSquares">
            <div id="leftSquare" className="square">
                <div className="squareContent">
                    <Tools />
                </div>
            </div>
            <div id="rightSquare" className="square">
                <div className="squareContent">
                    <HowToBuild />
                </div>
            </div>
        </div>
        <Types />
        <AddGundamForm
            addGundam={addGundam}
            newGundamData={newGundamData}
            setNewGundamData={setNewGundamData}
        />
        <GundamTable
            gundams={gundams}
            deleteGundam={deleteGundam}
            updateGundam={updateGundam}
        />
    </div>
    <Footer />
</div>
);

export default App;