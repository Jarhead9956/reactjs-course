// import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../hooks/use-http';

const reqConfig = {
  url: 'https://educationdb-97121.firebaseio.com/tasks.json',
  method: 'POST',
  body:{ text: ''},
  headers: {
    'Content-Type': 'application/json'
  }
}

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://educationdb-97121.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  // const httpRequest = useHttp()

  // props.onA
  // console.log(httpRequest.tasks)

  const {isLoading, error, sendRequest: postData} = useHttp()
  
  const addNewTask = (data) => {
    const newTaskId = data.name
    const newTask = {id: newTaskId, text: reqConfig.body.text}

    props.onAddNewTask(newTask)
  }

  const addTaskHandler = (enteredValue) => {
    reqConfig.body.text = enteredValue
    postData(reqConfig, addNewTask)
  }

  return (
    <Section>
      <TaskForm onEnterTask={addTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
