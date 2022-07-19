import React,{useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmound] = useState('');

  const changeTitleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const changeAmountHandler = (event) => {
    setEnteredAmound(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    
    const newIngredient = {
      id: Math.random().toFixed(3).toString(),
      title: enteredTitle,
      amount: enteredAmount
    }
    
    props.onAddIngredient(newIngredient);
    setEnteredTitle('');
    setEnteredAmound('');
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title"
              value={enteredTitle}
              onChange={changeTitleHandler} 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={enteredAmount}
              onChange={changeAmountHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
