import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {

    const [category, setCategory] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {

        loadCategories();

    }, [])

    const loadCategories = async () => {
        const { data } = await axios.get('/api/recipes/getcategories');
        setAllCategories(data);
    };

    const onAddClick = async () => {
        await axios.post('/api/recipes/addcategory', {
            Category: {
                name: category
            }
        });
        loadCategories();
        setCategory('');
    };

    return (
        <div style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{ maxWidth: 600 }}>
                <h2 className="mb-4 text-center">Categories</h2>
                <div className="input-group">
                    <input type="text" className="form-control" name='name' placeholder="Add new category" value={category} onChange={e => setCategory(e.target.value)} />
                    <button className="btn btn-primary" disabled={!category} onClick={onAddClick}>Add</button>
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