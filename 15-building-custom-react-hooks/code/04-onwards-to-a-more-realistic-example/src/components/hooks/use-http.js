import React, {useState, useEffect, useCallback} from "react"

// const useHttp = (method) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [tasks, setTasks] = useState([]);

//         const fetchTasks = useCallback( async (taskText) => {
//             setIsLoading(true);
//             setError(null);
//             try {
//             const response = await fetch(
//                 'https://educationdb-97121.firebaseio.com/tasks.json'
//             );
    
//             if (!response.ok) {
//                 throw new Error('Request failed!');
//             }
    
//             const data = await response.json();
    
//             const loadedTasks = [];
    
//             for (const taskKey in data) {
//                 loadedTasks.push({ id: taskKey, text: data[taskKey].text });
//             }
    
//             setTasks(loadedTasks);
//             } catch (err) {
//             setError(err.message || 'Something went wrong!');
//             }
//             setIsLoading(false);
//     }, []);
    
    

//     const enterTaskHandler = async (taskText) => {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const response = await fetch(
//             'https://educationdb-97121.firebaseio.com/tasks.json',
//             {
//               method: 'POST',
//               body: JSON.stringify({ text: taskText }),
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );
    
//           if (!response.ok) {
//             throw new Error('Request failed!');
//           }
    
//           const data = await response.json();
          
//           const generatedId = data.name; // firebase-specific => "name" contains generated id
//           const createdTask = { id: generatedId, text: taskText };
//           setTasks((prevTasks => [...prevTasks, createdTask]))
//         } catch (err) {
//           setError(err.message || 'Something went wrong!');
//         }
//         setIsLoading(false);
//     };
    
//     useEffect(() => {
//       fetchTasks();
//     }, [fetchTasks]);

//     // console.log(tasks)

//     return {
//         isLoading,
//         error,
//         tasks,
//         fetchTasks,
//         enterTaskHandler
//     }

    
// }

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data)
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp