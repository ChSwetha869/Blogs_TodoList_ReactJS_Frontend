import React, { useState } from "react";
import { useTodo } from "../context/todoContext";

function TaskItemwithContext({ task, isCompleted, onUpdate }) {
    const { dispatch } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);
    const [saving, setSaving] = useState(false);

    function deleteTask() {
        dispatch({
            type: "OPEN_DIALOG",
            data: {
                task,
                type: "delete",
            },
        });
    }

    function completeTask() {
        dispatch({
            type: "OPEN_DIALOG",
            data: {
                task,
                type: "complete",
            },
        });
    }

    function startEditing() {
        setEditedName(task.name);
        setIsEditing(true);
    }

    async function saveEdit() {
        const value = editedName.trim();

        if (!value) {
            return;
        }

        if (value === task.name) {
            setIsEditing(false);
            return;
        }

        setSaving(true);

        try {
            const success = await onUpdate(task.id, value);

            if (success) {
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    }

    function cancelEdit() {
        setEditedName(task.name);
        setIsEditing(false);
    }

    return (
        <li className="flex flex-wrap items-center justify-between gap-3 py-2">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                        }}
                        disabled={saving}
                        autoFocus
                        className="min-w-0 flex-1 rounded-md border border-gray-300 p-2 text-gray-900"
                    />

                    <div className="flex gap-2">
                        <button
                            className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 disabled:opacity-50"
                            onClick={saveEdit}
                            disabled={saving}
                        >
                            {saving ? "SAVING..." : "SAVE"}
                        </button>

                        <button
                            className="rounded-md bg-gray-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-600 disabled:opacity-50"
                            onClick={cancelEdit}
                            disabled={saving}
                        >
                            CANCEL
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="min-w-0 flex-1 break-words">
                        {task.name}
                    </span>

                    <div className="flex flex-wrap gap-2">
                        {!isCompleted && (
                            <>
                                <button
                                    className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600"
                                    onClick={completeTask}
                                >
                                    COMPLETE
                                </button>

                                <button
                                    className="rounded-md bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-yellow-600"
                                    onClick={startEditing}
                                >
                                    EDIT
                                </button>
                            </>
                        )}

                        <button
                            className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                            onClick={deleteTask}
                        >
                            DELETE
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TaskItemwithContext;