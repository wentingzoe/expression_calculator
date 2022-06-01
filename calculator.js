'use strict';
const string = process.argv[2];

function s_expression_calculator(str) {
  //* Integers  
  if (!isNaN(+str)) {
      return +str; //return the number
    }
  
    //* calculate the expression with parentheses numbers
    let spaces = 0; 
    let parentheses = 0; 
    let operand = []; 
    let temp = ''; 
    for (let c of str.substring(1, str.length - 1)) {

      temp += c; 
      if (c === '(') {
        parentheses++;
      } else if (c === ')') {
        parentheses--;
      } else if (c === ' ' && parentheses === 0) {
        operand[spaces] = temp.trim();//trim() removes the whitespace from the beginning and end of a string.
        temp = '';
        spaces++;
      }
    }
    operand[spaces] = temp.trim();

    // * print out error
    if (!['add', 'multiply'].includes(operand[0])) {
      throw new Error(`Operation "${operand[0]}" is not supported, only "add" and "multiply" are supported.`);
    } 

    // TODO [UX] here can add error messages for invalid expression and invalid operation

    // * Loop through the expression loop above
    const expr1Value = s_expression_calculator(operand[1]);
    const expr2Value = s_expression_calculator(operand[2]);

    //TODO[Extensibility] here can support an arbitrary number of arguments to add and multiply instead of supporting exactly 2, as in (add 1 2 3 4 (multiply 2 3 5))
    
    // * Return the results of "add" and "multiply" functions
    return operand[0] === 'add' ? expr1Value + expr2Value : expr1Value * expr2Value;

    //TODO[Extensibility] here can add other fuctions like subtract, divide, etc. by if else statements. 
}

try {
  console.log(string, '=', s_expression_calculator(string));
} catch (e) {
  console.error(e.message);
}