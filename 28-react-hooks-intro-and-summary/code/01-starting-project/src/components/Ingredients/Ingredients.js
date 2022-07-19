import React,{useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ing) => {
    setIngredients(prevState => [ing, ...prevState])
  }

  const removeIngredientHandler = (id) => {
    // const allIngredients = [...ingredients];
    // const filteredIngredients = allIngredients.filter((ing => ing.id !== id));
    // setIngredients(filteredIngredients);

    setIngredients(prevState => {
      const filteredIngredients = prevState.filter((ing => ing.id !== id));
      return filteredIngredients;
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
