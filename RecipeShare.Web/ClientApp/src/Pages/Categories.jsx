import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {

    const [category, setCategory] = useState({
        id: '',
        name: '',
        totalRecipes: 0
    });
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {

        loadCategories();

    }, [])

    const loadCategories = async () => {
        const { data } = await axios.get('/api/recipes/getcategories');
        setAllCategories(data);
    };

    const onAddClick = async () => {
        await axios.post('/api/recipes/addcategory', { Category: category });
        loadCategories();
        const copy = { ...category };
        copy.name = '';
        setCategory(copy);
    };

    const onTextChange = e => {
        const copy = { ...category };
        copy[e.target.name] = e.target.value;
        setCategory(copy);
    }

    return (
        <div style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{ maxWidth: 600 }}>
                <h2 className="mb-4 text-center">Categories</h2>
                <div className="input-group">
                    <input type="text" className="form-control" name='name' placeholder="Add new category" value={category.name} onChange={onTextChange} />
                    <button className="btn btn-primary" disabled={!category.name} onClick={onAddClick}>Add</button>
                </div>
                <br/>
                <ul className="list-group shadow-sm">
                    {allCategories && allCategories.map(cat => 
                        <li key={cat.id} className='list-group-item d-flex justify-content-between align-items-center'>{cat.name}<span className="badge bg-primary rounded-pill">{cat.totalRecipes}</span></li>)}
                </ul>
            </div>
        </div>
    )
};


export default Categories;