import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddRecipe = () => {

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [cat, setCat] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState(['']);
    const [allowPublic, setAllowPublic] = useState(0);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    let image = '';
    if (imageUrl) {
        image = URL.createObjectURL(imageUrl);
    };

    useEffect(() => {

        const loadCategories = async () => {
            const { data } = await axios.get('/api/recipes/getcategories');
            setCategories(data);
        };

        loadCategories();

    }, []);

    const onFormSubmit = async () => {
        const base64 = toBase64(imageUrl);
        const recipe = {
            Title: title,
            imageUrl: base64,
            Category: cat,
            IngredientsL: ingredients,
            DirectionsL: directions,
            AllowPublic: allowPublic
        }
        await axios.post('/api/recipes/addrecipe', recipe);
        navigate('/');
    };

    const onAddIRowClick = () => {
        const copy = [...ingredients];
        copy.push('');
        setIngredients(copy);
    };

    const onAddDRowClick = () => {
        const copy = [...directions];
        copy.push('');
        setDirections(copy);
    };

    const onOptionChangeHandler = (e) => {
        setCat(e.target.value);
    };

    const onIngredientsChange = (e, index) => {
        const currentIng = e.target.value;
        const copy = [...ingredients];
        copy[index] = currentIng;
        setIngredients(copy);
    };

    const onDirectionsChange = (e, index) => {
        const currentDir = e.target.value;
        const copy = [...directions];
        copy[index] = currentDir;
        setDirections(copy);
    };

    const onPublicityChange = e => {
        setAllowPublic(e.target.checked);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onImageChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    return (
        <div style={{ marginTop: 80 }}>
            <div className="container mt-5 d-flex">
                <div className="card shadow-sm" style={{ maxWidth: 800 }, { width: 200 }, { borderRadius: 15 }}>
                    <div className="card-body" style={{ padding: 20 }}>
                        <h2 className="mb-4 text-center">Add a New Recipe</h2>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Recipe Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" onChange={onOptionChangeHandler}>
                                <option value="-1">Select a category</option>
                                {categories && categories.map(cat =>
                                    <option index={cat.id} key={cat.id}>{cat.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="form-label">Ingredients</label>
                            {ingredients.map((_, index) => <input key={index} type='text' name={index} value={ingredients[index]} onChange={e => onIngredientsChange(e, index)} className='form-control' />)}
                            <button type="button" className="btn btn-success" onClick={onAddIRowClick} name='ingredients'>Add Ingredient</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="steps" className="form-label">Directions</label>
                            {directions.map((_, index) => <textarea key={index} name={index} value={directions[index]} onChange={ e => onDirectionsChange(e, index)} className='form-control mb-2' rows='3' />) }
                            <button type="button" className="btn btn-info" name='directions' onClick={onAddDRowClick}>Add Step</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Upload Image</label>
                            <input type="file" className="form-control" id="image" onChange={e => onImageChange(e)} />
                            {image && <img src={image} alt="Recipe" className="img-fluid mb-3" style={{ maxHeight: '200px', borderRadius: '10px' }} />}
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="isPublic" checked={allowPublic} onChange={e => onPublicityChange(e)} />
                            <label className="form-check-label" htmlFor="isPublic">Share this recipe publicly</label>
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary w-100" style={{ marginTop: 10 }}>Add Recipe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;