import React, { useState, useEffect } from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './Home.css';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../AuthContext';

const RecipesByUser = () => {

    const [recipes, setRecipes] = useState([]);
    const [searchRecipes, setSearchRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user } = useAuth();


    const loadRecipes = async () => {
        const { data } = await axios.get('/api/recipes/allbyuser');
        setRecipes(data);
        setSearchRecipes(data);
        getCategories();
    }

    const getCategories = async () => {
        const { data } = await axios.get('/api/recipes/getcategories');
        setCategories(data);
    };

    useEffect(() => {

        loadRecipes();

    }, [])

    const onSearchChange = (e) => {
        if (e.target.value === '-1') {
            setSearchRecipes(recipes);
        } else {
            const copy = [...recipes].filter(r => r.category.name === e.target.value);
            setSearchRecipes(copy);
        }
    };

    const UpdatePublicity = async (id) => {
        const vm = {
            RecipeId: id,
            UserId: user.id
        };
        await axios.post('/api/recipes/updatepublic', vm);
        loadRecipes();
    };

    return (<div className='container mt-5' style={{ padding: 20 }, { borderRadius: 10 }}>
        <div className='jumbotron bg-light p-5 rounded-lg mb-4 shadow'>
            {!recipes.length ? <h1>You have not added any recipes yet.</h1> : <h1>These are all of {user.firstName} {user.lastName}'s recipes</h1>}
            <hr className='my-5' />
            <div className='row'>
                <div className='col-md-3 offset-9'>
                    <span> <h4>Search By Category:</h4></span>
                    <select className='form-control' onChange={e => onSearchChange(e)}>
                        <option value='-1'>--Choose--</option>
                        {categories && categories.map(c =>
                            <option key={c.id} value={c.name }>{c.name} ({c.totalRecipes})</option>
                        )}
                    </select>
                </div>
            </div>
            <br />
            <div className='row'>
                {searchRecipes && searchRecipes.map(r =>
                    <RecipeCard
                        className='card col-4'
                        key={r.id}
                        title={r.title}
                        image={`/api/recipes/getimage?imagename=${r.imageUrl}`}
                        category={r.category.name}
                        ingredients={r.ingredients}
                        steps={r.directions}
                        isPublic={r.allowPublic}
                        allowUpdate={true}
                        id={r.id}
                        updatePublicity={UpdatePublicity}
                    />)}
            </div>
        </div>
    </div>


    );

};

export default RecipesByUser;