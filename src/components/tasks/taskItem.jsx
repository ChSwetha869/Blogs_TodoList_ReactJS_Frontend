import React from "react";

function TaskItem({ task, deleteTask, completeTask, isCompleted }) {
    return (
        <>
            <li className="flex justify-between">
                {task}
                <div className="task-buttons">
                    {!isCompleted && (
                        <button className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-600" onClick={() => completeTask(task)}>
                            COMPLETE
                        </button>
                    )}
                    <button className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600" onClick={() => deleteTask(task)}>
                        DELETE
                    </button>
                </div>
            </li>
        </>
    )
}

export default TaskItem;