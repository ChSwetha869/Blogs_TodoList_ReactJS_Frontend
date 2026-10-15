import React from "react";
import TaskItem from '../../components/tasks/taskItem'
import { useState, useReducer } from "react";
import SharedDialog from "../sharedDialog/sharedDialog";
import DialogConfig from "../../utils/dialog-config"

function TodoListwithReducer() {
    const initialTasks = Array.from(
        { length: 10000 },
        (_, index) => `Test Task ${index + 1}`
    );
    const initialState = {
        tasks: "",
        taskList: initialTasks,
        completedTasks: [],
        dialog: {
            open: false,
            type: null,
            task: null,
        },
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const config = DialogConfig[state.dialog.type];

    function todoReducer(state, action) {
        switch (action.type) {

            case "SET_TASK":
                return {
                    ...state,
                    tasks: action.data,
                };

            case "ADD_TASK":
                return {
                    ...state,
                    taskList: [...state.taskList, state.tasks],
                    tasks: "",
                };

            case "DELETE_TASK":
                return {
                    ...state,
                    taskList: state.taskList.filter(
                        task => task !== action.data
                    ),
                    completedTasks: state.completedTasks.filter(
                        task => task !== action.data
                    ),
                };

            case "COMPLETE_TASK":
                return {
                    ...state,
                    taskList: state.taskList.filter(
                        task => task !== action.data
                    ),
                    completedTasks: [
                        ...state.completedTasks,
                        action.data,
                    ],
                };

            case "OPEN_DIALOG":
                return {
                    ...state,
                    dialog: {
                        open: true,
                        type: action.data.type,
                        task: action.data.task,
                    },
                };

            case "CLOSE_DIALOG":
                return {
                    ...state,
                    dialog: {
                        open: false,
                        type: null,
                        task: null,
                    },
                };

            default:
                return state;
        }
    }

    function handleChange(e) {
        dispatch({
            type: "SET_TASK",
            data: e.target.value,
        });
    }

    function handleAddTask() {
        if (state.tasks.trim() !== "") {
            dispatch({ type: "ADD_TASK" });
        }
    }

    function openDialog(task, type) {
        dispatch({
            type: "OPEN_DIALOG",
            data: {
                task,
                type,
            },
        });
    }

    function closeDialog() {
        dispatch({
            type: "CLOSE_DIALOG",
        });
    }

    function handleConfirm() {
        if (state.dialog.type === "delete") {
            dispatch({
                type: "DELETE_TASK",
                data: state.dialog.task,
            });
        }

        if (state.dialog.type === "complete") {
            dispatch({
                type: "COMPLETE_TASK",
                data: state.dialog.task,
            });
        }

        dispatch({
            type: "CLOSE_DIALOG",
        });
    }

    return (
        <>
            <div className="flex flex-wrap justify-center item-center p-4 gap-2">
                <input className="w-85 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-4" type="text" placeholder="Enter a new task" value={state.tasks} onChange={handleChange} />
                <button className="bg-blue-400 w-15 p-4 rounded-full" onClick={handleAddTask}> + </button>
            </div>
            {state.taskList.length > 0 && (
                <h6 className="font-bold p-2">To Do Tasks</h6>
            )}
            <div className="max-h-80 overflow-y-auto">
                <ul className="task-list">
                    {
                        state.taskList.map((task, index) => {
                            return <TaskItem key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={false} />
                        })
                    }
                </ul>
            </div>

            {state.completedTasks.length > 0 && (
                <h6 className="font-bold p-2">Completed Tasks</h6>
            )}
            <ul className="task-list">
                {
                    state.completedTasks.map((task, index) => {
                        return <TaskItem key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={true} />
                    })
                }
            </ul>

            <SharedDialog isOpen={state.dialog.open}
                title={config?.title}
                onClose={closeDialog}
                onConfirm={handleConfirm}
                buttonText={config?.buttonText}>
                <p>{config?.message}</p>
                <p className="mt-2 font-semibold">
                    "{state.dialog.task}"
                </p>
            </SharedDialog>
        </>
    )
}

export default TodoListwithReducer;