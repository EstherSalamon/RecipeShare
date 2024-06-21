import React from 'react';
import { FaCheckCircle, FaList, FaUserAlt } from 'react-icons/fa';

const RecipeCard = ({title, image, category, ingredients, steps, isPublic }) => {
    return (
        <div className="card shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body d-flex flex-column" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>{title}</h3>
                {image && (
                    <div className="d-flex justify-content-center mb-3">
                       {/* <img src={image} alt="Recipe Preview" className="img-fluid" style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />*/}
                    </div>
                )}
                <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Ingredients:</strong></p>
                    <div className="mb-2">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="d-flex align-items-center mb-1">
                                <FaCheckCircle style={{ color: '#28a745', marginRight: '10px' }} />
                                <span>{ingredient}</span>
                            </div>
                        ))}
                    </div>
                    <p><strong>Steps:</strong></p>
                    <div className="mb-2">
                        {steps.map((step, index) => (
                            <div key={index} className="d-flex align-items-start mb-1">
                                <FaList style={{ color: '#17a2b8', marginRight: '10px', marginTop: '5px' }} />
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                    <p><strong>Public:</strong> {isPublic ? <FaUserAlt style={{ color: '#28a745' }} /> : <FaUserAlt style={{ color: '#dc3545' }} />}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;