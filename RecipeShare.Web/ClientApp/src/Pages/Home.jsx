import React, { useState, useEffect } from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './Home.css';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        const loadRecipes = async () => {
            const { data } = await axios.get('/api/recipes/getall');
            setRecipes(data);
        }

        loadRecipes();

    }, [])

    return (
        <div className='container mt-5' style={{ padding: 20 }, { borderRadius: 10 }}>
            <div className='jumbotron bg-light p-5 rounded-lg mb-4 shadow'>
                <h1>Welcome to the Recipe Sharing App!</h1>
                <p className='lead'>This is where we share the most amazing recipes ever!</p>
                <hr className='my-5' />
                <p>These are some of our latest recipes. Read, and be inspired.</p>
                <div className='row'>
                    {recipes && recipes.map(r =>
                        <RecipeCard
                            className='card col-4'
                            key={r.id}
                            title={r.title}
                            image={`/api/recipes/getimage?imagename=${r.imageUrl}`}
                            category={r.category.name}
                            ingredients={r.ingredients}
                            steps={r.directions}
                            isPublic={r.allowPublic}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;