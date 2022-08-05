import React from 'react'

const TaskForm = () => {
    const [ name, setName ] = useState('');
    const [description, setDescription ] = useState('')
    const [ priority, setPriority ] = useState('');

    const PRIORITY = ['Low','Medium','High'];

    return (
        <form 
        className='my-10'
        onSubmit={handleTask}
        >
            <div className='mb-5'>
                <label 
                    htmlFor="name"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Task Name
                </label>
                <input 
                    id='name'
                    type="text"
                    placeholder='Task Name'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="description"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Task Description
                </label>
                <textarea 
                    id='description'
                    placeholder='Task Description'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="priority"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Task Priority
                </label>
                <select 
                    id='priority'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500'
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
                >
                    <option value="">Select</option>
                    {
                    PRIORITY.map((op => (
                        <option key={op}> {op} </option>
                        )))
                    }
                </select>
            </div>
            <input 
                type="submit" 
                className='bg-emerald-600 hover:bg-emerald-700 w-full p-2 uppercase font-bold text-sm text-white rounded-lg shadow-md cursor-pointer transition-colors'
                value='Create Task'
            />

        </form>
  )
}

export default TaskForm