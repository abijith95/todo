

const Todo = (props) => {
    const {todo,setTodos} = props;
    
    const updateTodo = async(todoId,todoStatus)=>{
         const res = await fetch(`/api/todos/${todoId}`,{
            method:"PUT",
            body:JSON.stringify({status:todoStatus}),
            headers:{
                "Content-Type":"application/json"
            },
         });

         const json = await res.json();
         if(json.acknowledged)
         {
            setTodos(
                currenTodos=>{
                    return currenTodos.map((currenTodo)=>{
                        if(currenTodo._id === todoId)
                        {
                            return {...currenTodo,status:!currenTodo.status}
                        }
                        return currenTodo;
                    })
                }
            )
         }
    };


    const  deleteTodo = async(todoId) =>{
          const res = await fetch(`/api/todos/${todoId}`,{
            method:"DELETE"
          });
          const json = await res.json();
          if(json.acknowledged)
          {
            setTodos(currenTodos=>{
                return currenTodos.filter((currenTodo)=>(currenTodo._id !== todoId));
            })
          }
    }

    return (
        <>
            <div key={todo._id} className="todo">
                <p>{todo.todo}</p>
                <div className="mutations">
                    <button className="todo__status"
                    onClick={()=>updateTodo(todo._id,todo.status)}
                    >
                        {(todo.status) ? "✅" : "☐"}
                    </button>
                    <button
                      className="todo__delete"
                      onClick={()=>deleteTodo(todo._id)}
                    >
                       🚮
                    </button>
                </div>
            </div>
        </>
    )
}
export default Todo;