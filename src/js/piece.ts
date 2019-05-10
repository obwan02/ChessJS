import { Position, Side, WIDTH, HEIGHT, ChessState } from "./game.js"
import { TILE_SIZE } from "./ui.js";

abstract class Piece {
    constructor(public position: Position, private side: Side) {
        
    }
    
    getSide() {
        return this.side;
    }

    getSideName() {
        return this.side == Side.BLACK ? 'black' : this.side == Side.WHITE ? 'white' : 'empty'
    }

    move(pos: Position) {
        this.position = pos;
    }

    filter(moves: Position[]) {
        var result = []
        moves.forEach(element => { 
            if(element && !element.equals(this.position)) result.push(element)
        });

        return result;
    }
    
    abstract getMoves(state: ChessState): Position[];
    abstract getName(): string;
}

class Empty extends Piece {
    constructor(pos: Position) {
        super(pos, Side.EMPTY);
    }

    getMoves(state: ChessState): Position[]{return null;}
    getName(): string {
        return 'empty';
    }
}

class Pawn extends Piece {
    private firstMove: boolean;
    private yMod: number;
    constructor(pos: Position, side: Side) {
        super(pos, side);
        this.firstMove = true;
        this.yMod = this.getSide() == Side.BLACK ? -1 : 1;
    }

    getMoves(state: ChessState): Position[] {

        var result = []

        //Find possible moves
        {
            let mod = this.firstMove ? this.yMod * 2 : this.yMod;
            let mov = state.getFurthestPath(this, this.position, new Position(this.position.getx(), this.position.gety() + mod));
            result = result.concat(mov);
        }

        //Find possible attacks
        {
            let testPos1 = new Position(this.position.getx()-1, this.position.gety() + this.yMod);
            let testPos2 = new Position(this.position.getx()+1, this.position.gety() + this.yMod);
            if(state.isVaild(testPos1) && state.getPiece(testPos1).getName() != 'empty'
                && state.getPiece(testPos1).getSide() != this.getSide()) result.push(testPos1);
            if(state.isVaild(testPos2) && state.getPiece(testPos2).getName() != 'empty'
                && state.getPiece(testPos2).getSide() != this.getSide()) result.push(testPos2);
        }

        return this.filter(result);
    }

    getName(): string {
        return 'pawn';
    }

    move(pos: Position) {
        super.move(pos);
        this.firstMove = false;
    }
}

class Rook extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        let result = [];
        let a1 = [-8, 0, 8, 0];
        let a2 = [0, -8, 0, 8];
        for(let i = 0; i < 4; i++) {
            let pos = new Position(this.position.getx()+a1[i], this.position.gety()+a2[i]);
            result = result.concat(state.getFurthestAttack(this, this.position, pos));
        }

        console.log(result);
        return this.filter(result);
    }

    getName(): string {
        return 'rook';
    }
}

class Bishop extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        return null;
    }

    getName(): string {
        return 'bishop';
    }
}

class Knight extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        return null;
    }

    getName(): string {
        return 'knight';
    }
}

class King extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        return null;
    }

    getName(): string {
        return 'king';
    }
}

class Queen extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        return null;
    }

    getName(): string {
        return 'queen';
    }
}





export {
    Piece,
    Pawn,
    Rook,
    Bishop,
    Knight,
    King,
    Queen,
    Empty
}
