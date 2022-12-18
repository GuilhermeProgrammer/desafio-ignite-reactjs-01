import styles from './Main.module.css';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ToDo } from './ToDo';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleToDoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  // corrigir parametro de entrada
  // function handleInputKey(event: KeyboardEvent) {
  //   if (event.code === 'Enter') {
  //     handleCreateNewToDo(event);
  //   }
  // }

  function handleCreateNewToDo(event: FormEvent) {
    event.preventDefault();
    if (newTaskTitle) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle,
        isComplete: false
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } else {
      console.log('Variavel vazia!');
    }
  }

  function clearInputNewToDo(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = '';
  }

  function deleteTask(taskDelete: string) {
    setTasks(tasks.filter(task => task.id !== taskDelete));
  }

  function toogleTask(taskToogle: string) {
    setTasks(
      tasks.filter(task => {
        if (task.id === taskToogle) {
          task.isComplete = !task.isComplete;
        }
        return task;
      })
    );
  }

  function renderListToDoEmpty() {
    return (
      <>
        <ClipboardText size={56} className={styles.iconClipboardText} />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
        </p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </>
    );
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.newToDo}>
          <input
            type="text"
            onChange={handleToDoChange}
            value={newTaskTitle}
            //onKeyDown={handleInputKey} // verificar parametro esperado para esse tipo
          />
          <button onClick={handleCreateNewToDo}>
            Criar <PlusCircle size={32} />
          </button>
        </div>

        <div className={styles.status}>
          <div>
            <strong>
              Tarefas criadas <span>{tasks.length}</span>
            </strong>
          </div>

          <div>
            <strong>
              Concluídas{' '}
              <span>
                {tasks.filter(task => task.isComplete === true).length} de{' '}
                {tasks.length}
              </span>
            </strong>
          </div>
        </div>

        <div className={styles.content}>
          {tasks.length > 0 ? (
            tasks.map(task => {
              return (
                <ToDo
                  key={task.id}
                  title={task.title}
                  id={task.id}
                  isComplete={task.isComplete}
                  onDeleteTask={deleteTask}
                  onToogleTask={toogleTask}
                />
              );
            })
          ) : (
            <>
              <ClipboardText size={56} className={styles.iconClipboardText} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
