import { Position, Side } from "./game.js";
class Piece {
    constructor(position, side) {
        this.position = position;
        this.side = side;
    }
    getSide() {
        return this.side;
    }
    getSideName() {
        return this.side == Side.BLACK ? 'black' : this.side == Side.WHITE ? 'white' : 'empty';
    }
    move(pos) {
        this.position = pos;
    }
    filter(moves) {
        var result = [];
        moves.forEach(element => {
            if (element && !element.equals(this.position))
                result.push(element);
        });
        return result;
    }
}
class Empty extends Piece {
    constructor(pos) {
        super(pos, Side.EMPTY);
    }
    getMoves(state) { return null; }
    getName() {
        return 'empty';
    }
}
class Pawn extends Piece {
    constructor(pos, side) {
        super(pos, side);
        this.firstMove = true;
        this.yMod = this.getSide() == Side.BLACK ? -1 : 1;
    }
    getMoves(state) {
        var array = [];
        //Find possible moves
        {
            let mod = this.firstMove ? this.yMod * 2 : this.yMod;
            let mov = state.getFurthestPath(this, this.position, new Position(this.position.getx(), this.position.gety() + mod));
            array = array.concat(mov);
        }
        //Find possible attacks
        {
            let testPos1 = new Position(this.position.getx() - 1, this.position.gety() + this.yMod);
            let testPos2 = new Position(this.position.getx() + 1, this.position.gety() + this.yMod);
            if (state.getPiece(testPos1).getName() != 'empty')
                array.push(testPos1);
            if (state.getPiece(testPos2).getName() != 'empty')
                array.push(testPos2);
        }
        return this.filter(array);
    }
    getName() {
        return 'pawn';
    }
    move(pos) {
        super.move(pos);
        this.firstMove = false;
    }
}
class Rook extends Piece {
    constructor(pos, side) {
        super(pos, side);
    }
    getMoves(state) {
        [-1, 0, 1, 0].forEach((x) => {
            [0, -1, 0, 1].forEach((y) => {
                let pos = new Position(x, y);
                state.getFurthestAttack;
            });
        });
        return null;
    }
    getName() {
        return 'rook';
    }
}
class Bishop extends Piece {
    constructor(pos, side) {
        super(pos, side);
    }
    getMoves(state) {
        return null;
    }
    getName() {
        return 'bishop';
    }
}
class Knight extends Piece {
    constructor(pos, side) {
        super(pos, side);
    }
    getMoves(state) {
        return null;
    }
    getName() {
        return 'knight';
    }
}
class King extends Piece {
    constructor(pos, side) {
        super(pos, side);
    }
    getMoves(state) {
        return null;
    }
    getName() {
        return 'king';
    }
}
class Queen extends Piece {
    constructor(pos, side) {
        super(pos, side);
    }
    getMoves(state) {
        return null;
    }
    getName() {
        return 'queen';
    }
}
export { Piece, Pawn, Rook, Bishop, Knight, King, Queen, Empty };
