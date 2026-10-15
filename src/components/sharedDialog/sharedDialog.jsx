import React from "react";

function SharedDialog({
    isOpen,
    title,
    children,
    onClose,
    onConfirm,
    buttonText = "Ok"
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className="w-96 rounded-lg bg-white border-2 border-blue-900 shadow-xl dark:bg-gray-800 dark:border-blue-400"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-blue-900 shadow-lg p-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <button
                        className="h-8 w-8 items-center justify-center border-2 border-gray-400 text-xl text-gray-500 hover:border-red-600 hover:text-red-600 rounded-lg"
                        onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="p-4 text-gray-700 dark:text-gray-200">
                    {children}
                </div>
                <div className="flex justify-end gap-2 border-t border-blue-900 shadow-lg p-4 ">
                    <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button className="rounded-md px-4 py-2 text-sm text-white 
                        bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                        onClick={onConfirm}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SharedDialog;