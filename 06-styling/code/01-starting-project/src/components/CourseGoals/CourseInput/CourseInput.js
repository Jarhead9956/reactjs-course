import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(true)

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);

    if(enteredValue.trim().length > 0) {
      setIsEmpty(true)
      return
    }
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    if(enteredValue.trim().length === 0) {
      setIsEmpty(false)
      return
    }
    props.onAddGoal(enteredValue);
    setEnteredValue('')
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isEmpty && styles.invalid}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} value={enteredValue} />
      </div>
      <Button submited={isEmpty} type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;

//USE STYLED COMPONESTS
// import React, { useState } from 'react'
// import styled from 'styled-components'
// import Button from '../../UI/Button/Button';

// const FormControl = styled.div`
//     margin: 0.5rem 0;
  
//     & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${props => props.invalid ? 'red' : 'black'}
//     }
  
//     & input {
//     display: block;
//     width: 100%;
//     border: 1px solid #ccc;
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//     background: ${props => props.invalid ? 'pink' : 'transparent'};
//     }
  
//     & input:focus {
//     outline: none;
//     background: ${props => props.invalid ? 'pink' : '#fad0ec'} ;
//     border-color: #8b005d;
//     }
// `

// const CourseInput = props => {
//   const [enteredValue, setEnteredValue] = useState('');
//   const [isEmpty, setIsEmpty] = useState(true)

//   const goalInputChangeHandler = event => {
//     setEnteredValue(event.target.value);

//     if(enteredValue.trim().length > 0) {
//       setIsEmpty(true)
//       return
//     }
//   };

//   const formSubmitHandler = event => {
//     event.preventDefault();

//     if(enteredValue.trim().length === 0) {
//       setIsEmpty(false)
//       return
//     }
//     props.onAddGoal(enteredValue);
//     setEnteredValue('')
//   };

//   return (
//     <form onSubmit={formSubmitHandler}>
//       <FormControl invalid={!isEmpty}>
//         <label>Course Goal</label>
//         <input type="text" onChange={goalInputChangeHandler} value={enteredValue} />
//       </FormControl>
//       <Button submited={isEmpty} type="submit">Add Goal</Button>
//     </form>
//   );
// };

// export default CourseInput;



