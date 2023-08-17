<h1>Nutrifit Assistant</h1>

NutriFit is a web application built using Node.js, Express, React, and TypeScript. It helps users manage their daily caloric needs, generate personalized meal plans, and create shopping lists for a week's worth of ingredients.

**Features**
**Calculate Daily Caloric Needs:** Based on user input such as weight, age, height, physical activity, dietary needs, diseases, and gender, NutriFit calculates the user's daily caloric needs.

**Personalized Meal Plan:** Users can set their fitness goals, such as losing fat or gaining muscle. NutriFit generates a personalized meal plan for one day based on the user's caloric needs and goals.

**Shopping List Generation:** The app creates a shopping list with all the ingredients and quantities required for the meal plan for a 7-day period. It also estimates the price for each ingredient and provides a total price for the shopping list.

**User-Friendly Interface:** NutriFit features an intuitive and easy-to-use interface, allowing users to input their information and view the generated meal plan and shopping list effortlessly.

**Technologies Used**
Node.js: A server-side JavaScript runtime environment for building scalable applications.
Express: A minimalist web application framework for Node.js.
React: A JavaScript library for building user interfaces.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

**Installation and Usage**

Clone this repository:

```
git clone https://github.com/IliaZolas/nutrifit-assistant.git
```

Navigate to the project directory:

```
cd nutrifit-assistant
```

Install server dependencies:

```
npm install
```

Install client dependencies:

```
cd client
npm install
```

Build the client:

```
npm run build
```

Run the server:

```
cd ..
npm start
```

Open your web browser and visit http://localhost:3000 to access NutriFit Assitant.

**Before Running the App**

1. Before cloning and launching, please create a MongoDB account as well as a Cloudinary account to obtain your api keys.

2. Clone repo

3. Create .env files and populate them like so

.env in root of server folder

```
DATABASE_ACCESS=put-your-mongodb-access-url-here
CLOUDINARY_URL=put-your-cloudinary-access-url-here
CLOUD_NAME=put-your-cloudinary-name-here
CLOUD_API_KEY=put-your-cloudinary-api-key-here
CLOUD_API_SECRET=put-your-cloudinary-api-secret-here
```

.env in root of client folder

```
REACT_APP_CLOUDINARY_USERNAME=your-cloudinary-user-name-here
REACT_APP_CLOUDINARY_PRESET="your-preset-name-in-betwen-these-quotes"
``` 

4. cd server, <code>npm install</code> and then <code>npm start</code>

5. cd client, <code>npm install</code> and then <code>npm start</code>

**Working with MongoDB**

Make sure to include your IP address of your workplaces in the MongoDB dashboard. 

For development purposes, you can also set MongoDB to accept requests from any IP address to avoid confusion when working from different places.


**How to Contribute**
Contributions to NutriFit are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or create a pull request.