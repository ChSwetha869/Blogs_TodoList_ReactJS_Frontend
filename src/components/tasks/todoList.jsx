import React from "react";
import TaskItem from '../../components/tasks/taskItem'
import { useState } from "react";
import SharedDialog from "../sharedDialog/sharedDialog";
import DialogConfig from "../../utils/dialog-config"

function TodoList() {
    const [tasks, setTasks] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dialog, setDialog] = useState({
        open: false,
        type: null,
        task: null,
    });
    const config = DialogConfig[dialog.type];

    function handleChange(e) {
        setTasks(e.target.value);
    }

    function handleAddTask() {
        if (tasks.trim() !== "") {
            setTaskList(prev => [...prev, tasks]);
            setTasks("");
        }
    }

    function openDialog(task, type) {
        setDialog({
            open: true,
            type,
            task,
        });
    }

    function closeDialog() {
        setDialog({
            open: false,
            type: null,
            task: null,
        });
    }

    function handleDeleteTask(taskName) {
        setTaskList((prev) =>
            prev.filter((task) => task !== taskName)
        );

        setCompletedTasks((prev) =>
            prev.filter((task) => task !== taskName)
        );
    }

    function handleCompleteTask(taskName) {
        setTaskList((prev) =>
            prev.filter((task) => task !== taskName)
        );

        setCompletedTasks((prev) => [
            ...prev,
            taskName,
        ]);
    }

    function handleConfirm() {
        if (dialog.type === "delete") {
            handleDeleteTask(dialog.task);
        }
        if (dialog.type === "complete") {
            handleCompleteTask(dialog.task);
        }
        closeDialog();
    }

    return (
        <>
            <div className="flex flex-wrap justify-center item-center p-4 gap-2">
                <input className="w-85 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-4" type="text" placeholder="Enter a new task" value={tasks} onChange={handleChange} />
                <button className="bg-blue-400 w-15 p-4 rounded-full" onClick={handleAddTask}> + </button>
            </div>

            {taskList.length > 0 && (
                <h6 className="font-bold p-2">To Do Tasks</h6>
            )}
            <ul className="task-list">
                {
                    taskList.map((task, index) => {
                        return <TaskItem key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={false} />
                    })
                }
            </ul>

            {completedTasks.length > 0 && (
                <h6 className="font-bold p-2">Completed Tasks</h6>
            )}
            <ul className="task-list">
                {
                    completedTasks.map((task, index) => {
                        return <TaskItem key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={true} />
                    })
                }
            </ul>

            <SharedDialog isOpen={dialog.open}
                title={config?.title}
                onClose={closeDialog}
                onConfirm={handleConfirm}
                buttonText={config?.buttonText}>
                <p>{config?.message}</p>
                <p className="mt-2 font-semibold">
                    "{dialog.task}"
                </p>
            </SharedDialog>
        </>
    )
}

export default TodoList;