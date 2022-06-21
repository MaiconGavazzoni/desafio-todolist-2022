import styles from './Tasks.module.css'
import { Trash } from 'phosphor-react';

export function Tasks({ id, task, isCompleted, onDeleteTask, onCkeckedTask }) {

  const taskIsCompleted = isCompleted;

  function handleCheckTask(id) {
    onCkeckedTask(id)
  }

  function handleDeleteTask(id) {
    onDeleteTask(id)
  }

  return (
    <div className={styles.content}>
      {taskIsCompleted ?
        <label title="Marcar/Desmarcar tarefa" className={styles.container}><span>{task}</span>
          <input type="checkbox" onClick={() => handleCheckTask(id)} />
          <span className={styles.checkmark}></span>
        </label>
        :
        <label title="Marcar/Desmarcar tarefa" className={styles.container}>{task}
          <input type="checkbox" onClick={() => handleCheckTask(id)} />
          <span className={styles.checkmark}></span>
        </label>
      }
      <button onClick={() => handleDeleteTask(id)} title="Deletar tarefa">
        <Trash size={16} />
      </button>
    </div>
  )
}