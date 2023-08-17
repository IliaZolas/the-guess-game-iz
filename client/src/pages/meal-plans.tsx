import MealPlanCard from '../components/mealPlanCard';
import { PrimaryButton } from '../components/buttons';
import './meal-plans.css'
import { useEffect, useState } from 'react';


const MealPlans = () => {
    const [mealplans, setMealPlans] = useState([]);

    useEffect(() => {
        fetch(`${URL}/mealplans`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setMealPlans(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, [mealplans]);

    return (
        <div className="ramen-list-body fade-page">
            <div className="">
                <div className="page-title">
                    <h1>Meal Plans</h1>
                </div>
                { mealplans ? (
                    <div>   
                        <MealPlanCard  />
                        <PrimaryButton value="Create a meal plan" to="/new-mealplan"/>
                    </div>
                    ) : (
                    <div>
                        <h1>You don't have any meal plans</h1>
                        <PrimaryButton value="Create a meal plan" to="/new-mealplan"/>
                    </div>    
                    )
                }
            </div>
        </div>
    );
}

export default MealPlans;