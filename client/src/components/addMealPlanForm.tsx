import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from '../config/config';
import "./meal-plan-form.css";
import 'react-quill/dist/quill.snow.css';

interface MealPlan {
  title: string;
  description: string;
  weight: string;
  age: string;
  height: string;
  activity: string;
  gender: string;
  dietary: string;
  disease: string;
  currency: string;
  goal: string;
  country: string;
  shop: string;
  user: string;
}

const URL = config.url;

const AddMealPlan: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");
  const [dietary, setDietary] = useState("");
  const [disease, setDisease] = useState("");
  const [currency, setCurrency] = useState("");
  const [goal, setGoal] = useState("");
  const [country, setCountry] = useState("");
  const [shop, setShop] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const addMealPlan = async (mealplan: MealPlan) => {
    const userId = localStorage.getItem('id');
    console.log(userId, ": this is the logged in user id");

    await fetch(`${URL}/book/add`, {
      method: 'POST',
      body: JSON.stringify(mealplan),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    });

    setTitle('');
    setDescription('');
    setResult('');
    navigate('/books');
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          weight: weight,
          age: age,
          height: height,
          activity: activity,
          gender: gender,
          dietary: dietary,
          disease: disease,
          currency: currency,
          goal: goal,
          country: country,
          shop: shop 
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);

      // const mealplan: MealPlan = await response.json();
      // addMealPlan(mealplan);
    } catch(error: any) {
      console.error(error);
      alert(error.message);
    }
  }  

  const formatApiResponse = (result: any) => {
    if (!result) {
      return "";
    }
    
    return result.replace(/\n\n/g, "<br/>").replace(/\n/g, "<br/>- ");
  }

  formatApiResponse(result);

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/mealplan/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          title: title,
          description: description,
          result: result,
          user: localStorage.getItem('id') || ''
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);

    } catch(error: any) {
      console.error(error);
      alert(error.message);
    }
    navigate('/meal-plans');
  };  

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight in Kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          name="height"
          placeholder="Enter height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="text"
          name="activitiy"
          placeholder="How active are you physically?"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <input
          type="text"
          name="gender"
          placeholder="Your biological gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          name="dietary"
          placeholder="Vegan, vegetarian or normal"
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
        />
        <input
          type="text"
          name="disease"
          placeholder="Any dietary diseases like diabetes?"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />
        <input
          type="text"
          name="currency"
          placeholder="What is your local currency?"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <input
          type="text"
          name="goal"
          placeholder="What is your goal?"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="text"
          name="country"
          placeholder="What country do you live in?"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          name="shop"
          placeholder="What is your favourite grocery store?"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
        />
        <input type="submit" value="Generate meal plan & shopping list" />
      </form>
      <div dangerouslySetInnerHTML={{ __html: formatApiResponse(result) }} />
      <div> 
        <form onSubmit={onSave}>
          <input 
          type="hidden" 
          value={result}
          />
          <input type="submit" value="Save this plan" />
        </form>
      </div>
    </div>
  );
};

export default AddMealPlan;
