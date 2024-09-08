import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const AddRecipe = () => {

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [cat, setCat] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState(['']);
    const [allowPublic, setAllowPublic] = useState(false);
    const [categories, setCategories] = useState([]);
    const imageRef = useRef();
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
        if (!imageRef.current.files.length) {
            return;
        }
        const file = imageRef.current.files[0];
        const base64 = await toBase64(file);
        const cats = categories.find(c => c.name === cat);
        const recipe = {
            title,
            Category: cats,
            allowPublic,
            base64,
            ingredients,
            directions
        };

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
            <div className="container d-flex">
                <div className='card-group'>
                    <div className='col-md-10'>
                        <div className="card shadow-sm" style={{ borderRadius: 15 }}>
                            <div className="card-body" style={{ padding: 20 }}>
                                <h2 className="mb-4 text-center">Add a New Recipe</h2>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Recipe Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select" id='category' onChange={onOptionChangeHandler}>
                                        <option value="-1">Select a category</option>
                                        {categories && categories.map(cat =>
                                            <option index={cat.id} key={cat.id}>{cat.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                                    <div id='ingredients'>
                                        {ingredients.map((_, index) => <input key={index} type='text' name={index} value={ingredients[index]} onChange={e => onIngredientsChange(e, index)} className='form-control' />)}
                                    </div>
                                    <button type="button" className="btn btn-success mt-2" onClick={onAddIRowClick} name='ingredients'>Add Ingredient</button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="steps" className="form-label">Directions</label>
                                    <div id='steps'>
                                        {directions.map((_, index) => <textarea key={index} name={index} value={directions[index]} onChange={e => onDirectionsChange(e, index)} className='form-control mb-2' rows='3' />)}
                                    </div>
                                    <button type="button" className="btn btn-info" name='directions' onClick={onAddDRowClick}>Add Step</button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Upload Image</label>
                                    <input type="file" className="form-control" ref={imageRef} id="image" onChange={e => onImageChange(e)} />
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

                <div className='col-md-4'>
                    <div className="card shadow-sm ms-4" style={{ position: 'sticky', top: '20px', maxWidth: '400px', width: '100%', height: 'fit-content', borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                        <div className="card-body" style={{ padding: '20px' }}>
                            <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>Recipe Preview</h3>
                            <RecipeCard
                                className='card shadow-sm h-100'
                                title={title}
                                image={image}
                                category={cat}
                                ingredients={ingredients}
                                steps={directions}
                                isPublic={allowPublic}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;