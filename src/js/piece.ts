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

    move(state: ChessState, pos: Position) {
        if(state.getPiece(pos).getName() == 'king') {
            state.win(this.side);
        }

        this.position = pos;
    }

    filter(moves: Position[]) {
        var result = []
        moves.forEach(element => { 
            if(element && !element.equals(this.position)) result.push(element)
        });

        return result;
    }

    abstract clone(): Piece;
    abstract getValue(): number;
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

    clone() {
        return new Empty(this.position);
    }
    
    getValue() {
        return 0;
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

    move(state: ChessState, pos: Position) {
        super.move(state, pos);
        this.firstMove = false;
    }

    clone() {
        let a = new Pawn(this.position, this.getSide());
        a.firstMove = this.firstMove;
        return a;
    }

    getValue() {
        return 1;
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

        return this.filter(result);
    }

    getName(): string {
        return 'rook';
    }

    clone() {
        return new Rook(this.position, this.getSide());
    }

    getValue() {
        return 5;
    }
}

class Bishop extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        let result = [];
        let a1 = [-8, 8, 8, -8];
        let a2 = [-8, 8, -8, 8];
        for(let i = 0; i < 4; i++) {
            let pos = new Position(this.position.getx()+a1[i], this.position.gety()+a2[i]);
            result = result.concat(state.getFurthestAttack(this, this.position, pos));
        }
        
        return this.filter(result);
    }

    getName(): string {
        return 'bishop';
    }

    clone() {
        return new Bishop(this.position, this.getSide());
    }

    getValue() {
        return 3;
    }
}

class Knight extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        const xvals = [-1, -1, 1, 1, -2, -2, 2, 2];
        const yvals = [-2,  2,-2, 2, -1,  1,-1, 1];

        var result = [];
        for(let i = 0; i < xvals.length; i++){
            let x = this.position.getx()+xvals[i];
            let y = this.position.gety()+yvals[i];
            let pos = new Position(x, y)
            let piece = state.getPiece(pos);

            if(piece != null && piece.getSide() != this.getSide())
                result.push(pos);
        }
        return result;
    }

    getName(): string {
        return 'knight';
    }

    clone() {
        return new Knight(this.position, this.getSide());
    }

    getValue() {
        return 3;
    }
}

class King extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        const xvals = [-1, 0, 1, 1, 1, 0, -1, -1];
        const yvals = [1, 1, 1, 0, -1, -1 -1 , 0];

        var result = [];
        for(let i = 0; i < xvals.length; i++){
            let x = this.position.getx()+xvals[i];
            let y = this.position.gety()+yvals[i];
            let pos = new Position(x, y)
            let piece = state.getPiece(pos);

            if(piece != null && piece.getSide() != this.getSide())
                result.push(pos);
        }

        return result;
    }

    getName(): string {
        return 'king';
    }

    clone() {
        return new King(this.position, this.getSide());
    }

    getValue() {
        return Infinity;
    }
}

class Queen extends Piece {
    constructor(pos: Position, side: Side) {
        super(pos, side);
    }
    
    getMoves(state: ChessState): Position[] {
        var result = [];
        var a1 = [-8, 8, 8, -8];
        var a2 = [-8, 8, -8, 8];
        for(let i = 0; i < 4; i++) {
            let pos = new Position(this.position.getx()+a1[i], this.position.gety()+a2[i]);
            result = result.concat(state.getFurthestAttack(this, this.position, pos));
        }
        
        let bish = this.filter(result);

        var result = [];
        var a1 = [-8, 0, 8, 0];
        var a2 = [0, -8, 0, 8];
        for(let i = 0; i < 4; i++) {
            let pos = new Position(this.position.getx()+a1[i], this.position.gety()+a2[i]);
            result = result.concat(state.getFurthestAttack(this, this.position, pos));
        }

        let rook = this.filter(result);
        
        return bish.concat(rook);
    }

    getName(): string {
        return 'queen';
    }

    clone() {
        return new Queen(this.position, this.getSide());
    }

    getValue() {
        return 9;
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
