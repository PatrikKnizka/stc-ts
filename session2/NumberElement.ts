/**
 * Creating custm class of NumberElement used for sorting all numbers
 */
class NumberElement {
    public element: number;
    public parity: Boolean;

    public divisibleBy: number[] = [];
    public primeNumber: boolean = false;
    
    constructor(_element: number){
        this.element = _element;
        this.parity = _element % 2 === 0 ? true : false;
        
        for(let i = 1; i <= this.element; i++){
            if(this.element % i === 0) {
                this.divisibleBy.push(i);
            } 
        }

        if (JSON.stringify(this.divisibleBy) === JSON.stringify([1, this.element])) {
            this.primeNumber = true
        } 
    }
}

export default NumberElement;