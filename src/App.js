import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';



//Map to map tasks with it's status
let m = new Map([
  ["Create theme",false],
  ["Work on wordpress",false],
  ["Organize office main department",false],
  ["Error solve in HTML template",false]
])

function App() {
  //map is initial value of tasklist
  const [taskslist,settaskslist]= useState([...m]);
  const history = useHistory();

  return (
    <div className="App">

        <div>
         {/* after typing in textbox if enter is clicked then new task is added */}
          <input placeholder="New task..." className='textbox' onKeyPressCapture={(e)=>{
           if(e.key==="Enter"){
            let str= e.target.value
            m.set(str,false);
            settaskslist([[...m]])
            console.log(taskslist)
           }
            
          }}/>
        </div>
        <div>
     {/* Using Router to display different content  */}
        <div className='bar'>
        <div className='baritem' >
          {/* Change the url bar but dont refresh */}
          {/* <Link to="/all" style={{textDecoration:"none",color:"black"}}>All</Link> */}
          <button onClick={()=>history.push("/all")}>All</button>
        </div>
        <div className='baritem' >
          {/* <Link to="/active" style={{textDecoration:"none",color:"black"}}>active</Link> */}
          <button onClick={()=>history.push("/active")}>Active</button>
        </div>
        <div className='baritem' >
          {/* <Link to="/completed" style={{textDecoration:"none",color:"black"}}>Completed</Link> */}
          <button onClick={()=>history.push("/completed")}>Completed</button>
        </div>
      </div>

      
      <Switch>
      <Route exact path="/">
          <All  taskslist={taskslist} settaskslist={settaskslist}/>
        </Route>
        <Route path="/all">
          <All  taskslist={taskslist} settaskslist={settaskslist}/>
        </Route>
        <Route path="/active">
          <Active  taskslist={taskslist} settaskslist={settaskslist} />
        </Route>
        <Route path="/completed">
          <Completed  taskslist={taskslist} settaskslist={settaskslist} />
        </Route>
        
      </Switch>
        </div>

      

        {/* <div>
        {
         [...m].map(([task,value])=>(
           <DisplayTask  task={task} status={value}
            taskslist={taskslist} settaskslist={settaskslist}
            />
         ))
       }
        </div> */}
   
    </div>
  );
}




//Display all list elements
function All({taskslist,settaskslist}) {
  console.log(m)
  return (
    <div>
      {/* <h2> All!!!</h2> */}
      {
         [...m].map(([task,value])=>(
           <DisplayTask  task={task} value={value}
            taskslist={taskslist} settaskslist={settaskslist}
            />
         ))
       }
    </div>
  );

}

//Display only active(not completed) tasks
function Active({taskslist,settaskslist}) {
  return (
    <div>
      {/* <h2>Active</h2> */}
      {
         [...m].filter(([task,value])=>(
          value===false
         )).map(([task,value])=>
        (
          <DisplayTask  task={task} value={value}
          taskslist={taskslist} settaskslist={settaskslist}
          />
        ))
       }
    </div>
  );
}

//Display completed tasks
function Completed({taskslist,settaskslist}) {
  return (
    <div>
      {/* <h2>Completed</h2> */}
      {
         [...m].filter(([task,value])=>(
          value===true
         )).map(([task,value])=>
        (
          <DisplayTask  task={task} value={value}
          taskslist={taskslist} settaskslist={settaskslist}
          />
        ))
       }
    </div>
  );
}




export default App;

//Display function
//Based on checkbox checked or not (task completed or not) tyle is also added and task status is also updated in map and tasklist
function DisplayTask({task,value,taskslist,settaskslist}){
  // console.log({task,value});
  const temp = (value)?{textDecoration:"line-through"}:{textDecoration:"none"}
  const [style1,setstyle1]=useState(temp);
  return(
    <div id={task} style={style1} className='taskdiv'>
      <input type={"checkbox"}  id={task} className='checkbox' onClick={ (e) =>
    { 
      [...m].map(([task,value])=>
      {
        console.log(task===e.target.id,task,e.target.id)
        if(task===e.target.id){
         if(value===false){
            // settaskslist([...taskslist,{task:task,status:true}])
          m.set(task,true)
          settaskslist([...m]);
          setstyle1({textDecoration:"line-through"});
         }else{
            // settaskslist([...taskslist,{task:task,status:true}])
          m.set(task,false)
          settaskslist([...m])
          setstyle1({textDecoration:"none"})
         }
        }
      } 
      
      )
      // console.log(taskslist);
      console.log(m)
    }
      }/>
      {task} 
    </div>
  )
}

