import { Loader } from "lucide-react";
import React, { createContext, useContext, useReducer } from "react";

const TodoContext = createContext();
// const initialTasks = Array.from(
//     { length: 5000 },
//     (_, index) => `Test Task ${index + 1}`
// );
const initialState = {
    tasks: "",
    taskList: [],
    completedTasks: [],
    loading: false,
    dialog: {
        open: false,
        type: null,
        task: null,
    },
};

function todoReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.data,
            };
        case "SET_TASK":
            return {
                ...state,
                tasks: action.data,
            };
        case "LOAD_TASKS":
            return {
                ...state,
                taskList: action.data.filter(
                    (task) => !task.completed
                ),
                completedTasks: action.data.filter(
                    (task) => task.completed
                ),
                loading: false,
            };
        case "ADD_TASK": {
            const task = action.data;

            return {
                ...state,
                taskList: task.completed
                    ? state.taskList
                    : [...state.taskList, task],
                completedTasks: task.completed
                    ? [...state.completedTasks, task]
                    : state.completedTasks,
                tasks: "",
                loading: false,
            };
        };
        case "UPDATE_TASK": {
            const updatedTask = action.data;
            return {
                ...state,
                taskList: state.taskList.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                ),
                completedTasks: state.completedTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                ),
                loading: false,
            };
        }
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
        case "DELETE_TASK":
            return {
                ...state,
                taskList: state.taskList.filter(
                    (task) => task.id !== action.data
                ),
                completedTasks: state.completedTasks.filter(
                    (task) => task.id !== action.data
                ),
                loading: false,
            };
        case "COMPLETE_TASK": {
            const completedTask = action.data;
            return {
                ...state,
                taskList: state.taskList.filter(
                    (task) => task.id !== completedTask.id
                ),
                completedTasks: [
                    ...state.completedTasks.filter(
                        (task) => task.id !== completedTask.id
                    ),
                    completedTask,
                ],
                loading: false,
            };
        }
        default:
            return state;
    }
}

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(
        todoReducer,
        initialState
    );
    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodo() {
    return useContext(TodoContext);
}