import styles from './ToDo.module.css';
import { Trash } from 'phosphor-react';
import checkFalse from '../assets/check_false.svg';
import checkTrue from '../assets/check_true.svg';
interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  onDeleteTask: (id: string) => void;
  onToogleTask: (id: string) => void;
}
export function ToDo({
  id,
  title,
  isComplete,
  onDeleteTask,
  onToogleTask
}: Task) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleToogleTask() {
    onToogleTask(id);
  }

  return (
    <div key={id} className={styles.item}>
      <div className={styles.checkItem}>
        <button onClick={handleToogleTask}>
          {isComplete ? (
            <img src={checkTrue} className={styles.iconListCheck} />
          ) : (
            <img src={checkFalse} className={styles.iconListCheck} />
          )}
        </button>

        {isComplete ? (
          <p className={styles.complete}>{title}</p>
        ) : (
          <p>{title}</p>
        )}
      </div>
      <button onClick={handleDeleteTask}>
        <Trash size={24} className={styles.iconListTrash} />
      </button>
    </div>
  );
}
