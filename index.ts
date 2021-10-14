import * as readline from 'readline';

let splitAnswer: any;

/**
 * Function to calculate sum of two numbers
 * @param a first number
 * @param b second number
 * @returns sum of two first and second number
 */
function summary(a: number, b: number): number {
    return a + b
}

/**
 * Function to calculate subtraction of two numbers
 * @param a first number
 * @param b second number
 * @returns subtraction of first and second number
 */
function subtraction(a: number, b: number): number {
    return a - b
}

/**
 * Function to multiply two numbers 
 * @param a first number
 * @param b second number
 * @returns multiplication of first and second number
 */
function multiplication(a: number, b: number): number {
    return a * b
}

/**
 * Function to divide two numbers
 * @param a first number
 * @param b second number
 * @returns division of first and second number
 */
function division(a: number, b: number): number {
    return a / b
}


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('Enter firstNumber secondNumber operation. \n\nPossible operations are: \nsummary\nsubtraction\nmultiplicatin\ndivision\n\n', (answer) => {
    splitAnswer = answer.split(" ")
    
    switch (splitAnswer[2]) {
        case "summary":
            console.log(summary(Number(splitAnswer[0]), Number(splitAnswer[1])));
            break;
        case "subtraction":
            console.log(subtraction(Number(splitAnswer[0]), Number(splitAnswer[1])));
            break;
        case "multiplication":
            console.log(multiplication(Number(splitAnswer[0]), Number(splitAnswer[1])));
            break;
        case "division":
            console.log(division(Number(splitAnswer[0]), Number(splitAnswer[1])));
            break;
        default:
            console.log("Invalid operation.")
            break;
    }
    rl.close()
})





