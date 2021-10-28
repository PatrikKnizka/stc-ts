import Depencencies from './Dependencies';
import NumberElement from './NumberElement';

/**
 * Function to automaticly add a number to a parentString with exact divider.
 * @param parentString The main string, to which you want to add the number
 * @param number The number you want to add to parentString with exact divider
 * @param divider The divider you want to add between each added element
 * @returns 
 */
let addNumberToString = (parentString: string, number: number, divider: string = "|"): string => {
    parentString += parentString === "" ? JSON.stringify(number) : ` ${divider} ${JSON.stringify(number)}`;
    return parentString
}

/**
 * Setting custom projects dependencies to our pre-defined type Dependencies
 */
let session2_Dependencies: Depencencies = {
    MAX_SAFE_INTEGER: 100000,
    NUMS_NUM: 100
};


let myNumbers: NumberElement[] = []

let allNumbers: string = "";
let primeNumbers: string = "";
let parityTrueNumbers: string = "";
let parityFalseNumbers: string = "";
let divisibleBy: Array<string> = ["", "", "", "", "", "", "", "", ""];

// Generating random numbers, and creating objects with our pre-defined class NumberElement
for(let i = 0; i < session2_Dependencies.NUMS_NUM; i++) {
    myNumbers.push(new NumberElement(Math.floor(Math.random() * (session2_Dependencies.MAX_SAFE_INTEGER - 1))));
}

// Looping through all numbers, sorting by the assignment
myNumbers.forEach(myNumbersElement => {
    allNumbers = addNumberToString(allNumbers, myNumbersElement.element);

    // If the number is even
    if(myNumbersElement.parity) {
        // Adding the number to string parityTrueNumbers
        parityTrueNumbers = addNumberToString(parityTrueNumbers, myNumbersElement.element);
        
        // Dealing with divisibleBy part of an assignment
        divisibleBy.forEach((element, index) => {
            if(myNumbersElement.divisibleBy.indexOf(index + 1) > - 1) {
                divisibleBy[index] = addNumberToString(divisibleBy[index], myNumbersElement.element);
            }
        });
    // If the number is odd
    } else {
        // Adding the number to the string parityFalseNumbers
        parityFalseNumbers = addNumberToString(parityFalseNumbers, myNumbersElement.element);

        // If the number is a prime number
        if(myNumbersElement.primeNumber) {  
            // Adding the prime number to the string primeNumbers
            primeNumbers = addNumberToString(primeNumbers, myNumbersElement.element);
        }
    }
});

// Priting results
console.log(`# Randomly chosen numbers: ${allNumbers} \n`);
console.log(`# Parity true numbers: ${parityTrueNumbers} \n`);
console.log(`# Parity false numbers: ${parityFalseNumbers} \n`);
divisibleBy.forEach((element, index) => {
    console.log(`# Numbers divisible by ${index + 1}: ${element} \n`);
});
console.log(`# Prime numbers: ${primeNumbers} \n`);
