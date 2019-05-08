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
        let double = this.firstMove ? 2 : 1;
        let ychange = this.yMod * double;
        let array = [];
        let testPos = new Position(this.position.getx(), this.position.gety() + ychange);
        let result = state.getFurthestPath(this, this.position, testPos);
        console.log(result);
        return null;
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
