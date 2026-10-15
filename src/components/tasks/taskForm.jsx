import { useForm } from "react-hook-form";
import { useState } from "react";

function TaskForm() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [item, setItem] = useState([]);
    function submit(data) {
        setItem(prev => [...prev, data]);
        reset({
            title: "",
            description: ""
        });
    }
    function clear() {
        setItem([]);
        reset({
            title: "",
            description: ""
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>Title</label>
                    <input type="text" {...register("title", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "Title must be at least 2 characters"
                        }
                    })} />
                    <p>{errors?.title?.message}</p>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" {...register("description", {
                        required: true,
                        minLength: {
                            value: 1,
                            message: "Description must be at least 1 characters"
                        }
                    })} />
                    <p>{errors?.description?.message}</p>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={clear}>Clear</button>
            </form>
            <div>
                <h2>Task Management Stored Data</h2>
                <ul>
                    {item.map((task, index) => (
                        <li key={index}>
                            <strong>{task.title}</strong>: {task.description}                            
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TaskForm;