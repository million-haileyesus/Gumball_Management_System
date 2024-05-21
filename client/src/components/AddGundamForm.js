// AddGundamForm.js 
import React from 'react';

const AddGundamForm = ({ addGundam, newGundamData, setNewGundamData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newGundamData.ModelName || !newGundamData.Grade || !newGundamData.Scale || !newGundamData.Progress) return;
        addGundam(newGundamData); // Call the addGundam function passed from parent component
        // Reset newGundamData
        setNewGundamData({
            ModelName: '',
            Grade: '',
            Scale: '',
            Progress: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update newGundamData state using setNewGundamData
        setNewGundamData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Model Name"
                name="ModelName"
                value={newGundamData.ModelName}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Grade"
                name="Grade"
                value={newGundamData.Grade}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Scale"
                name="Scale"
                value={newGundamData.Scale}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Progress"
                name="Progress"
                value={newGundamData.Progress}
                onChange={handleChange}
            />
            <button type="submit">Add Gundam</button>
        </form>
    );
};

export default AddGundamForm;
