import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import './mealplan-card.css'
import Cookies from "universal-cookie";
import { config } from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const cookies = new Cookies();

const URL = config.url;
console.log("prod or dev?", URL)

const MealPlanCard = () => {
  const [mealplans, setMealPlans] = useState<any[]>([]);
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const navigate = useNavigate();

  const token = cookies.get("TOKEN");

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
  }, []);

  const deleteMealPlan = async (id: string, public_id: string, user_id: string, user: string) => {
    console.log("delete:", id);
    // console.log("delete:", public_id);
    console.log("user who created mealplan", user);
    const theLoggedInUser = localStorage.getItem('id');
    console.log("logged in user who is trying to delete mealplan", theLoggedInUser);

    if (user !== theLoggedInUser) {
      console.log("you cannot delete another person's mealplan");
    }

    await fetch(`${URL}/mealplan/delete/${id}/user/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      },
    }).then((response) => {
      if (response.status === 200) {
        setMealPlans((prevMealPlan) => prevMealPlan.filter((plan) => plan._id !== id));
        console.log("Mealplan deleted");
      } else {
        console.log("Mealplan not deleted");
      }
    });
  };

  const viewMealPlan = (id: string) => {
    console.log("this is id", id);
    navigate(`/mealplan/show/${id}`);
  };

  const updateMealPlan = (id: string) => {
    navigate(`/mealplan/update/${id}`);
  };

  return (
    <div className="">
      <div className="card-area">
        {mealplans.map((mealplan) => {
          return (
            <div id={mealplan._id} className="book-card">
              <div className="card-text-area">
                <h4>{mealplan.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: mealplan.description }}></p>
                {user ? (
                  <div className="card-button-area">
                    <div className="show-button button" onClick={() => viewMealPlan(mealplan._id)}>
                      <FontAwesomeIcon icon={faEye} className="eye" />
                    </div>
                    <div className="update-button button" onClick={() => updateMealPlan(mealplan._id)}>
                      <FontAwesomeIcon icon={faPenToSquare} className="update" />
                    </div>
                    <div className="delete-button button" onClick={() => deleteMealPlan(mealplan._id, mealplan.public_id, localStorage.getItem('id')!, mealplan.user)} id={mealplan.id}>
                      <FontAwesomeIcon icon={faTrash} className="delete" />
                    </div>
                  </div>
                ) : (
                  <div className="card-button-area">
                    <div className="show-button button" onClick={() => viewMealPlan(mealplan._id)}>
                      <FontAwesomeIcon icon={faEye} className="eye" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanCard;
