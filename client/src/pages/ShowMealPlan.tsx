import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./show-book.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const URL = config.url;

interface MealPlan {
    _id: string;
    title: string;
    description: string;
    result: string;
}

const ShowMealPlan: React.FC = () => {
    const [mealplan, setMealPlan] = useState<MealPlan>({
        _id: "",
        title: "",
        description: "",
        result: ""
    });
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    useEffect(() => {
        const id = params.id;

        fetch(`${URL}/mealplan/show/${id}`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data: MealPlan) => {
                setMealPlan(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const deleteMealPlan = async (id: string) => {
        console.log("delete:", id)
        const token = cookies.get("TOKEN");
        const userId = localStorage.getItem("id")

        fetch(`${URL}/mealplan/delete/${id}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        }).then((response) => {
            if (response.status === 200) {
                setMealPlan({
                    _id: "",
                    title: "",
                    description: "",
                    result: ""
                });
                console.log("Meal Plan deleted");
            } else {
                return;
            }
        });
        navigate('/meal-plans');
    };

    const allMealPlans = () => {
        navigate('/meal-plans');
    }

    const updateMealPlan = (id: string) => {
        navigate(`/mealplan/update/${id}`);
    };

    return (
        <div className="show-book-container fade-page">
            <div className="show-book">
                <div className="flex space-around" >
                    <div className="show-page-description">
                        <h1>{mealplan.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: mealplan.description }} />
                        <div dangerouslySetInnerHTML={{ __html: mealplan.result }} />
                        {user ? (
                            <div className="card-button-area-show flex">
                                <div className="show-button button" onClick={() => allMealPlans()} ><FontAwesomeIcon icon={faCircleLeft} className="back" /> Back to list</div>
                                <div className="update-button button" onClick={() => updateMealPlan(mealplan._id)} ><FontAwesomeIcon icon={faPenToSquare} className="update" /> Update</div>
                                <div className="delete-button button" onClick={() => deleteMealPlan(mealplan._id)} id={mealplan._id} ><FontAwesomeIcon icon={faTrash} className="delete" /> Delete</div>
                            </div>
                        ) : (
                            <div className="card-button-area-show">
                                <div className="show-button button" onClick={() => allMealPlans()} ><FontAwesomeIcon icon={faCircleLeft} className="book-bowl" /> Back to list</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowMealPlan;
