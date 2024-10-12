import { useEffect } from "react";
import { useState } from "react";

function SnakeGame() {
    const gridSize = 50;
    const gridCells = Array(gridSize*gridSize).fill("0")
    // the snake's initial position 
    const [snake, setSnake] = useState([[5,5]]);

    // foods initial position
    const [food, setFood] = useState([10,10]);

    //direction state 
    const [direction, setDirection] = useState([0,1])

    //game over
    const [gameover, setGameover] = useState(false);

    const generatedFood = () =>{
        const x = Math.floor(Math.random()*50);
        const y = Math.floor(Math.random()*50);
        setFood([x,y]);
    }

    useEffect(()=>{
        // return nothing if game is over 
        if(gameover) return;
        // handle key press for changing the direction of the movement of the snake
        const handleKeyPress = (e) =>{
            switch (e.key) {
                case 'ArrowUp':
                    setDirection([-1,0])
                    break;
                case 'ArrowDown':
                    setDirection([1,0])
                    break;
                case 'ArrowLeft':
                    setDirection([0,-1])
                    break;
                case 'ArrowRight':
                    setDirection([0,1])
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        // set the interval to move the snake
        const moveSnake = setInterval((prevSnake)=>{
            setSnake(prevSnake=>{
            const newSnake = [...prevSnake];

            // changing the head postion of the snake by adding the diraction cordinate into it 
            const head = [newSnake[0][0] + direction[0], newSnake[0][1]+direction[1]]   

            // setting the game over logice by checking the head touches the wall 
            if(head[0]<0||head[0]>=50||head[1]<0||head[0]>=50){
                setGameover(true)
                return prevSnake;
            }

            // cheking the case for collison of the snakes head with its body
            if(newSnake.some((segment)=>(segment[0]===head[0]&& segment[1]==head[1]))){
                setGameover(true)
                return prevSnake;   
            }

            newSnake.unshift(head)// adding the new postin of the head 
            
            // checking for if snkae eats the food
            if(head[0]===food[0] && head[1]===food[1]){
                generatedFood()
            }else{
                newSnake.pop()
            }

            return newSnake;})
        }, 200)
        return ()=>{
            window.removeEventListener('keydown', handleKeyPress);
            clearInterval(moveSnake)
        }
    }, [direction, gameover, food])

    return(
      <div className="flex items-center justify-center bg-gray-700 w-full min-h-screen">
        <div className="grid grid-rows-50 grid-cols-50 w-[625px] h-[625px]">
          {
            gridCells.map((_,index)=>(
              <div
              key={index}
              className="bg-white border-2 border-blue-700">
                {
                    Array.from({length:50}).map((_,row)=>
                    Array.from({length:50}).map((_,col)=>{
                        // cheking all teh cell for is snake or not
                        const isSnake = snake.some(segment=>segment[0]===row&&segment[1]===col)

                        // checking all the cell for is food or not 
                        const isfood = food[0]===row && food[1]===col;
                        return <div backroundCol></div>
                    }))
                }
              </div>
            ))
          }
        </div>
  
      </div>
    )}
  
  export default SnakeGame
  