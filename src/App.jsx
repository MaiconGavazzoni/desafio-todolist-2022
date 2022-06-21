import { useState } from 'react'
import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid'
import styles from './App.module.css'
import clipboadrImage from './assets/clipboard.svg';
import './global.css';

// const tasks = [
//   {
//     id: uuidv4(),
//     task: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'
//   },
//   {
//     id: uuidv4(),
//     task: 'Entregar a tarefa'
//   },
// ];


export function App() {

  const [tasks, setTasks] = useState([]);
  const [newtask, setNewTask] = useState('');
  const [tasksCreated, setTasksCreated] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  function handleNewTaskChange() {
    event.target.setCustomValidity('')
    setNewTask(event.target.value);
  }

  function handleCreateTask() {
    event.preventDefault();

    const newTaskCreated = {
      id: uuidv4(),
      task: newtask,
      isCompleted: false,
    }

    setTasks([...tasks, newTaskCreated]);
    setTasksCreated((state) => {
      return state + 1;
    });
    setNewTask('');
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório!')

  }

  function deleteTask(id) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.id != id;
    })
    setTasks(tasksWithoutDeleteOne);
    setTasksCreated(tasksWithoutDeleteOne.length);
    countTasksChecked(tasksWithoutDeleteOne);
  }

  function ckeckedTask(id) {
    const tasksWithCheckdSelected = tasks.filter(task => {
      if (task.id == id) {
        task.isCompleted = task.isCompleted ? false : true;
        return task;
      } else {
        return task;
      }

    })
    // const countTasksChecked = tasksWithCheckdSelected.filter(task => {
    //   return task.isCompleted == true;
    // })
    setTasks(tasksWithCheckdSelected);
    // setTasksCompleted(countTasksChecked.length);
    countTasksChecked(tasksWithCheckdSelected);
  }

  function countTasksChecked(newsTasks) {
    const countTasksChecked = newsTasks.filter(task => {
      return task.isCompleted == true;
    })
    setTasksCompleted(countTasksChecked.length);
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.formPosition}>

          <form onSubmit={handleCreateTask} className={styles.formContent}>
            <input
              type="text"
              name="task"
              placeholder="Adicione uma nova tarefa"
              onChange={handleNewTaskChange}
              value={newtask}
              onInvalid={handleNewCommentInvalid}
              required
            />
            <button type="submit"><span>Criar</span><PlusCircle size={16} /></button>
          </form>
        </div>
        <div className={styles.tasks}>
          <div className={styles.info}>
            <div>

              <p className={styles.criadas}>Tarefas criadas<span>{tasksCreated}</span></p>

            </div>
            <div>

              <p className={styles.concluidas}>Concluídas<span>{tasksCompleted} de {tasksCreated}</span></p>
            </div>
          </div>


          {tasks.length > 0 ?
            tasks.map(task => {
              return (
                <Tasks
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  isCompleted={task.isCompleted}
                  onDeleteTask={deleteTask}
                  onCkeckedTask={ckeckedTask}
                />
              );
            })
            :
            <div className={styles.empty}>
              <img src={clipboadrImage} alt="imagem de prancheta" />
              <p className={styles.fistEmpty}> Você ainda não tem tarefas cadastradas</p>
              <p className={styles.secondEmpty}>Crie tarefas e organize seus itens a fazer</p>
            </div>
          }

        </div>
      </div>

    </div>


  )
}


