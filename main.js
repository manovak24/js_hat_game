const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    }

    
    playGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.playerMove();
            if (!this.isInbounds()) {
                console.log(`Not a valid move!`);
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log(`You have succumbed to a hole.`);
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log(`You found your hat!`);
                playing = false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    //Method for asking player move
    playerMove() {
        const response = prompt('What is your move? ').toUpperCase();
        switch (response) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            default:
                console.log('Please enter one of the following - U, D, L or R');
                this.playerMove();
                break;
        }
    }

    //Methods for testing location
    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    isInbounds() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    //static method to generate field
    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }

        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }

    //Helper method to print field in grid form
    print() {
        this.field.forEach(element => console.log(element.join('')))
    }

}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.playGame();