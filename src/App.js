import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

import localforage from 'localforage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';


function App() {

  // Tasks (ToDo List) State
  //////////////////////////
  // const [toDo, setToDo] = useState([
  //   {id: 1, title: 'Task 1', status: false},
  //   {id: 2, title: 'Task 2', status: false}
  // ])

  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToDo = await localforage.getItem('todoItems');
        setToDo(storedToDo || [
          // { id: 1, title: 'Task 1', status: false },
          // { id: 2, title: 'Task 2', status: false }
        ]);
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data to-do dari Local Storage:', error);
      }
    };

    fetchData();
  }, []);
  

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add task 
  ///////////
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
  
      setToDo([
        ...toDo,
        { id: num, title: newTask, status: false }
      ]);
  
      setNewTask('');
  
      localforage
        .setItem('todoItems', [...toDo, { id: num, title: newTask, status: false }])
        .then(() => {
          console.log('Data to-do berhasil disimpan di Local Storage');
        })
        .catch((error) => {
          console.error('Terjadi kesalahan saat menyimpan data to-do di Local Storage:', error);
        });
    }
  };

  // Delete task 
  //////////////
  const deleteTask = (id) => {
    setToDo(toDo.filter((task) => task.id !== id));
  
    localforage
      .setItem('todoItems', toDo.filter((task) => task.id !== id))
      .then(() => {
        console.log('Data to-do berhasil dihapus dari Local Storage');
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menghapus data to-do dari Local Storage:', error);
      });
  };

  // Mark task as done or completed
  /////////////////////////////////
  const markDone = (id) => {
    const updatedToDo = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
  
    setToDo(updatedToDo);
  
    localforage
      .setItem('todoItems', updatedToDo)
      .then(() => {
        console.log('Data to-do berhasil diperbarui di Local Storage');
      })
      .catch((error) => {
        console.error(
          'Terjadi kesalahan saat memperbarui data to-do di Local Storage:',
          error
        );
      });
  };

  // Cancel update
  ////////////////
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  /////////////////////////
  const changeHolder = (e) => {

    // let newEntry = {
    //   id: updateData.id,
    //   title: e.target.value,
    //   status: updateData.status ? true : false
    // }
    // setUpdateData(newEntry)

    // refactored
    setUpdateData({...updateData, title: e.target.value})

  }

  // Update task
  //////////////
  const updateTask = () => {
    let removeOldRecord = toDo.filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);
  
    setUpdateData('');
  
    localforage
      .setItem('todoItems', [...removeOldRecord, updateData])
      .then(() => {
        console.log('Data to-do berhasil disimpan di Local Storage');
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menyimpan data to-do di Local Storage:', error);
      });
  };

  return (
    <div className="container App">
      <br /><br />
      <h2 className="app-title">
        <FontAwesomeIcon icon={faTasks} className="app-icon" />
        <span className="app-title-text">To Do List App</span>
      </h2>
      <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {toDo && toDo.length ? '' : 'Stay productive, no tasks at the moment!'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;
