import React, { useReducer, useLayoutEffect, useRef, useState, useEffect } from "react";
import TaskItemwithContext from "./taskItemwithContext";
import SharedDialog from "../sharedDialog/sharedDialog";
import DialogConfig from "../../utils/dialog-config";
import { useTodo } from "../context/todoContext";
import { Search } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getTasks, addTask, deleteTask, updateTask, markTaskCompleted } from "../../services/task-service";

function TodoListwithReducerandContext() {
    const { state, dispatch } = useTodo();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const config = DialogConfig[state.dialog.type];
    const taskListRef = useRef(null);

    // useLayoutEffect(() => {
    //     if (state.taskList.length > 0) {
    //         taskListRef.current?.lastElementChild?.scrollIntoView({
    //             behavior: "smooth",
    //             block: "center",
    //         });
    //     }
    // }, [state.taskList.length]);

    // useEffect(() => {
    //     if (state.taskList.length > 0) {
    //         rowVirtualizer.scrollToIndex(
    //             filteredTasks.length - 1,
    //             {
    //                 behavior: "smooth",
    //             }
    //         );
    //     }
    // }, [state.taskList.length]);

    useEffect(() => {
        async function loadTasks() {
            dispatch({
                type: "SET_LOADING",
                data: true,
            });
            try {
                const tasks = await getTasks();
                dispatch({
                    type: "LOAD_TASKS",
                    data: tasks,
                });
            } catch (error) {
                console.error("Failed to load tasks:", error);
                dispatch({
                    type: "SET_LOADING",
                    data: false,
                });
            }
        }
        loadTasks();
    }, [dispatch]);

    const filteredTasks = [
        ...(filter !== "completed"
            ? state.taskList.map(task => ({
                task,
                completed: false
            }))
            : []),

        ...(filter !== "active"
            ? state.completedTasks.map(task => ({
                task,
                completed: true
            }))
            : [])
    ].filter(({ task }) =>
        task.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const rowVirtualizer = useVirtualizer({
        count: filteredTasks.length,
        getScrollElement: () => taskListRef.current,
        estimateSize: () => 50,
        overscan: 5,
    });

    function handleChange(e) {
        dispatch({
            type: "SET_TASK",
            data: e.target.value,
        });
    }

    async function handleUpdateTask(id, value) {
        dispatch({
            type: "SET_LOADING",
            data: true,
        });
        try {
            const response = await updateTask(id, value);
            dispatch({
                type: "UPDATE_TASK",
                data: response.task,
            });
            return true;
        } catch (error) {
            console.error("Failed to update task:", error);
            return false;
        } finally {
            dispatch({
                type: "SET_LOADING",
                data: false,
            });
        }
    }

    async function handleAddTask() {
        const value = state.tasks.trim();
        if (!value) return;
        dispatch({
            type: "SET_LOADING",
            data: true,
        });
        try {
            const response = await addTask(value);
            dispatch({
                type: "ADD_TASK",
                data: response.task,
            });
        } catch (error) {
            console.error("Failed to add task:", error);
        } finally {
            dispatch({
                type: "SET_LOADING",
                data: false,
            });
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

    function fakeApi() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    async function handleConfirm() {
        const selectedTask = state.dialog.task;
        const dialogType = state.dialog.type;
        if (!selectedTask?.id) return;
        dispatch({
            type: "SET_LOADING",
            data: true,
        });
        try {
            if (dialogType === "delete") {
                await deleteTask(selectedTask.id);
                dispatch({
                    type: "DELETE_TASK",
                    data: selectedTask.id,
                });
            } else if (dialogType === "complete") {
                const response = await markTaskCompleted(
                    selectedTask.id,
                    true
                );
                dispatch({
                    type: "COMPLETE_TASK",
                    data: response.task,
                });
            }
            dispatch({
                type: "CLOSE_DIALOG",
            });
        } catch (error) {
            console.error("Task operation failed:", error);
        } finally {
            dispatch({
                type: "SET_LOADING",
                data: false,
            });
        }
    }

    return (
        <>
            {state.loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
                </div>
            )}
            <div className="flex flex-wrap justify-center item-center p-4 gap-2">
                <input className="w-85 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-4" type="text" placeholder="Enter a new task" value={state.tasks} onChange={handleChange} onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTask();
                }} />
                <button className="bg-blue-400 w-15 p-4 rounded-full"
                    onClick={handleAddTask}> + </button>
                <div className="flex justify-center gap-2 p-2">
                    <div className="relative">
                        <input type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-60 border border-gray-300 rounded-lg p-3 text-gray-900 bg-white" />
                        <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    <button className={`px-4 py-2 rounded-md ${filter === "all"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setFilter("all")}> All </button>

                    <button className={`px-4 py-2 rounded-md ${filter === "active"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setFilter("active")}> Active </button>

                    <button className={`px-4 py-2 rounded-md ${filter === "completed"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setFilter("completed")}> Completed </button>
                </div>
            </div>

            {/* {state.taskList.length > 0 && (
                <>
                    <h6 className="font-bold text-center">To Do Tasks</h6>
                    <div className="max-h-40 overflow-y-auto m-2">
                        <ul ref={taskListRef} className="task-list">
                            {
                                state.taskList.map((task, index) => {
                                    return <TaskItemwithContext key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={false} />
                                })
                            }
                        </ul>
                    </div>
                </>
            )}

            {state.completedTasks.length > 0 && (
                <>
                    <h6 className="font-bold text-center">Completed Tasks</h6>
                    <div className="max-h-40 overflow-y-auto m-2">
                        <ul className="task-list">
                            {
                                state.completedTasks.map((task, index) => {
                                    return <TaskItemwithContext key={index} task={task} deleteTask={() => openDialog(task, "delete")} completeTask={() => openDialog(task, "complete")} isCompleted={true} />
                                })
                            }
                        </ul>
                    </div>
                </>
            )} */}

            {filteredTasks.length > 0 && (
                <>
                    <h6 className="font-bold text-center">
                        {filter === "all" && "All Tasks"}
                        {filter === "active" && "Active Tasks"}
                        {filter === "completed" && "Completed Tasks"}
                    </h6>

                    <div
                        ref={taskListRef}
                        className="max-h-80 overflow-y-auto m-2"
                    >
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: "100%",
                                position: "relative",
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                                const { task, completed } = filteredTasks[virtualItem.index];

                                return (
                                    <div
                                        key={virtualItem.key}
                                        ref={rowVirtualizer.measureElement}
                                        data-index={virtualItem.index}
                                        className="pb-2"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            transform: `translateY(${virtualItem.start}px)`,
                                        }}
                                    >
                                        <TaskItemwithContext
                                            task={task}
                                            isCompleted={completed}
                                            onUpdate={handleUpdateTask}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* <div className="max-h-80 overflow-y-auto m-2">
                        <ul ref={taskListRef} className="task-list">
                            {filteredTasks.map(({ task, completed }, index) => (
                                <TaskItemwithContext
                                    key={index}
                                    task={task}
                                    deleteTask={() => openDialog(task, "delete")}
                                    completeTask={() => openDialog(task, "complete")}
                                    isCompleted={completed}
                                />
                            ))}
                        </ul>
                    </div> */}
                </>
            )}

            <SharedDialog isOpen={state.dialog.open}
                title={config?.title}
                onClose={closeDialog}
                onConfirm={handleConfirm}
                buttonText={config?.buttonText}>
                <p>{config?.message}</p>
                <p className="mt-2 font-semibold">
                    "{state.dialog.task?.name}"
                </p>
            </SharedDialog>
        </>
    )
}

export default TodoListwithReducerandContext;