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
        let double = this.firstMove ? 2 : 1;
        let ychange = this.yMod * double;
        
        let array = [];

        let testPos = new Position(this.position.getx(), this.position.gety() + ychange);
        let result = state.getFurthestPath(this, this.position, testPos);
        console.log(result);

        return null;
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
        return null;
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
