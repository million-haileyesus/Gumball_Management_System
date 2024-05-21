// GundamTable.js
import React, { useState } from 'react';
import '../Styles/GundamTable.css';

const GundamTable = ({ gundams, deleteGundam, updateGundam }) => {
    const [editingGundam, setEditingGundam] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        ModelName: '',
        Grade: '',
        Scale: '',
        Progress: ''
    });

    const handleDelete = (id) => {
        deleteGundam(id);
    };

    const handleEdit = (gundam) => {
        setEditingGundam(gundam);
        setUpdatedData({ ...gundam });
    };

    const handleCancelEdit = () => {
        setEditingGundam(null);
        setUpdatedData({
            ModelName: '',
            Grade: '',
            Scale: '',
            Progress: ''
        }); 
    };

    const handleUpdate = () => {
        updateGundam(editingGundam._id, updatedData);
        setEditingGundam(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="table-container">
            <h2>Gundam Table</h2>
            <table className='container'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Scale</th>
                        <th>Progress</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gundams.map((gundam) => (
                        <tr key={gundam._id}>
                            <td>{editingGundam && editingGundam._id === gundam._id ? (
                                <input
                                    type="text"
                                    name="ModelName"
                                    value={updatedData.ModelName}
                                    onChange={handleChange}
                                />
                            ) : (
                                gundam.ModelName
                            )}</td>
                            <td>{editingGundam && editingGundam._id === gundam._id ? (
                                <input
                                    type="text"
                                    name="Grade"
                                    value={updatedData.Grade}
                                    onChange={handleChange}
                                />
                            ) : (
                                gundam.Grade
                            )}</td>
                            <td>{editingGundam && editingGundam._id === gundam._id ? (
                                <input
                                    type="text"
                                    name="Scale"
                                    value={updatedData.Scale}
                                    onChange={handleChange}
                                />
                            ) : (
                                gundam.Scale
                            )}</td>
                            <td>{editingGundam && editingGundam._id === gundam._id ? (
                                <input
                                    type="text"
                                    name="Progress"
                                    value={updatedData.Progress}
                                    onChange={handleChange}
                                />
                            ) : (
                                gundam.Progress
                            )}</td>
                            <td>
                                {editingGundam && editingGundam._id === gundam._id ? (
                                    <div>
                                        <button onClick={handleUpdate}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEdit(gundam)}>Update</button>
                                )}
                                <button onClick={() => handleDelete(gundam._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GundamTable;

