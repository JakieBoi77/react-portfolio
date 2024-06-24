import styled from 'styled-components';
import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #b8c8e3;
  overflow: auto;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 400;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  align-items: center;

  #calculator {
    background-color: black;
    padding: 5px;
    box-shadow: 5px 5px 5px;
    border: 1px solid gray;
  }

  #display-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #equation-box, #output-box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  #equation, #display {
    color: white;
    padding-right: 10px;
    text-align: center;
    font-size: 20px;
    font-family: monospace;
  }

  #button-panel-box {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(5, 50px);
    grid-gap: 2px;
  }

  #clear {
    grid-column: auto / span 2;
  }

  #equals {
    grid-row: auto / span 2;
  }

  #zero {
    grid-column: auto / span 2;
  }

  .button {
    border: none;
    font-size: 20px;
    font-family: monospace;
  }

  .button:hover {
    cursor: pointer;
    background-color: #e3e3e3;
  }
`;

export default function Calculator() {
  return (
    <StyledDiv>
      <UnstyledCalculator />
    </StyledDiv>
  );
}


const UnstyledCalculator = () => {
  const [currentOutput, setCurrentOutput] = useState("0");
  const [currentEquation, setCurrentEquation] = useState("");
  const [firstChar, setFirstChar] = useState(true);
  const [previousInput, setPreviousInput] = useState("number");
  const [decimal, setDecimal] = useState(false);
  
  const handleClear = () => {
    setCurrentOutput("0");
    setCurrentEquation("");
    setFirstChar(true);
    setPreviousInput("number");
    setDecimal(false);
  };
  
  const handleNumber = (input: any) => {
    if (previousInput === "operator") {
      // If the previous input was an operator then add to the equation and start a new number
      setCurrentEquation(currentEquation + currentOutput);
      setCurrentOutput(input);
      if (input === "0") {
        setFirstChar(true);
      }
    } else if (previousInput === "evaluate") {
      setCurrentEquation("");
      setCurrentOutput(input);
      if (input === "0") {
        setFirstChar(true);
      }
    } else {
      if (firstChar) {
        if (input !== "0") {
          // If the first character is not 0 then change the output to the input
          setFirstChar(false);
          setCurrentOutput(input);
        }
      } else {
        // If its not the first character add to the output
        setCurrentOutput(currentOutput + input);
      }
    }
    // Set the previous input
    setPreviousInput("number");
   };
  
  const handleOperator = (input: any) => {
    if (previousInput === "number") {
      // If previous input is a number then add the number to the equation
      setCurrentEquation(currentEquation + currentOutput);
      setCurrentOutput(input)
    } else if (previousInput === "decimal") {
      // If previous input is a decimal then add the number to the equation without the decimal
      setCurrentEquation(currentEquation + currentOutput.slice(0, currentOutput.length - 1));
      setCurrentOutput(input)
    } else if (previousInput === "operator") {
      if (input === "-") {
        setCurrentOutput(currentOutput + input);
      } else {
        setCurrentOutput(input)
      }
    } else if (previousInput === "evaluate") {
      setCurrentEquation(currentOutput);
      setCurrentOutput(input);
    }
    
    // Reset decimal
    setDecimal(false);
    
    // Set previous input
    setPreviousInput("operator");
  };
  
  const handleDecimal = (input: any) => {
    if (!decimal && previousInput === "number") {
      setCurrentOutput(currentOutput + input);
      setFirstChar(false);
      setPreviousInput("decimal");
      setDecimal(true);
    }
  };
  
  const handleEvaluate = (input: any) => {
    const result = evaluate(currentEquation + currentOutput);
    setCurrentEquation(currentEquation + currentOutput + input + result);
    setCurrentOutput(result);
    setPreviousInput("evaluate");
  };
  
  return (
    <div id="calculator">
      <Display equation={currentEquation} output={currentOutput}/>
      <ButtonPanel
        clear={handleClear}
        number={handleNumber}
        operator={handleOperator}
        decimal={handleDecimal}
        evaluate={handleEvaluate}
      />
    </div>
  );
};

function Display(props: any) {
  return(
    <div id="display-box">
      <Equation equation={props.equation}/>
      <Output output={props.output}/>
    </div>
  );
}

function Equation(props: any) {
  return(
    <div id="equation-box">
      <p id="equation">{props.equation}</p>
    </div>
  );
}

function Output(props: any) {
  return(
    <div id="output-box">
      <p id="display">{props.output}</p>
    </div>
  );
}

function ButtonPanel(props: any) {
  return(
    <div id="button-panel-box">
      <Button id="clear" value="AC" click={props.clear}/>
      <Button id="divide" value="/" click={props.operator}/>
      <Button id="multiply" value="*" click={props.operator}/>
      
      <Button id="seven" value="7" click={props.number}/>
      <Button id="eight" value="8" click={props.number}/>
      <Button id="nine" value="9" click={props.number}/>
      <Button id="subtract" value="-" click={props.operator}/>
      
      <Button id="four" value="4" click={props.number}/>
      <Button id="five" value="5" click={props.number}/>
      <Button id="six" value="6" click={props.number}/>
      <Button id="add" value="+" click={props.operator}/>
      
      
      <Button id="one" value="1" click={props.number}/>
      <Button id="two" value="2" click={props.number}/>
      <Button id="three" value="3" click={props.number}/>
      <Button id="equals" value="=" click={props.evaluate}/>
      
      <Button id="zero" value="0" click={props.number}/>
      <Button id="decimal" value="." click={props.decimal}/>
    </div>
  );
}

function Button(props: any) {
  return(
    <button id={props.id} className="button" value={props.value} onClick={() => props.click(props.value)}>{props.value}</button>
  );
}