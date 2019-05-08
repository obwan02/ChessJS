import { Pawn, Rook, Bishop, Knight, King, Queen, Empty } from "./piece.js";
const WIDTH = 8;
const HEIGHT = 8;
var Side;
(function (Side) {
    Side[Side["BLACK"] = 0] = "BLACK";
    Side[Side["WHITE"] = 1] = "WHITE";
    Side[Side["EMPTY"] = 2] = "EMPTY";
})(Side || (Side = {}));
const index = function (i, j) {
    return i * WIDTH + j;
};
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getx() {
        return this.x;
    }
    gety() {
        return this.y;
    }
}
class ChessState {
    constructor() {
        this.board = new Array(WIDTH * HEIGHT);
        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
                this.board[index(i, j)] = new Empty(new Position(j, i));
            }
        }
        for (let i = 0; i < WIDTH; i++) {
            this.board[i + WIDTH * 1] = new Pawn(new Position(i, 1), Side.WHITE);
            this.board[i + WIDTH * 6] = new Pawn(new Position(i, 6), Side.BLACK);
        }
        this.board[0] = new Rook(new Position(0, 0), Side.WHITE);
        this.board[7] = new Rook(new Position(7, 0), Side.WHITE);
        this.board[7 * WIDTH] = new Rook(new Position(0, 7), Side.BLACK);
        this.board[7 + 7 * WIDTH] = new Rook(new Position(7, 7), Side.BLACK);
        this.board[1] = new Knight(new Position(1, 0), Side.WHITE);
        this.board[6] = new Knight(new Position(6, 0), Side.WHITE);
        this.board[1 + 7 * WIDTH] = new Knight(new Position(1, 7), Side.BLACK);
        this.board[6 + 7 * WIDTH] = new Knight(new Position(6, 7), Side.BLACK);
        this.board[2] = new Bishop(new Position(2, 0), Side.WHITE);
        this.board[5] = new Bishop(new Position(5, 0), Side.WHITE);
        this.board[2 + 7 * WIDTH] = new Bishop(new Position(2, 7), Side.BLACK);
        this.board[5 + 7 * WIDTH] = new Bishop(new Position(5, 7), Side.BLACK);
        this.board[3] = new Queen(new Position(3, 0), Side.WHITE);
        this.board[4] = new King(new Position(4, 0), Side.WHITE);
        this.board[3 + 7 * WIDTH] = new Queen(new Position(3, 7), Side.BLACK);
        this.board[4 + 7 * WIDTH] = new King(new Position(4, 7), Side.BLACK);
    }
    getPiece(pos) {
        var result = null;
        this.board.forEach(element => {
            if (pos.getx() == element.position.getx() &&
                pos.gety() == element.position.gety()) {
                result = element;
            }
        });
        return result;
    }
    getFurthestPath(self, pos1, pos2) {
        let definition = 8;
        let dx = pos2.getx() - pos1.getx() / definition;
        let dy = pos2.gety() - pos2.gety() / definition;
        var prevPos = pos1;
        for (let i = 0; i < definition; i++) {
            let x = pos1.getx() + Math.floor(dx * i);
            let y = pos1.gety() + Math.floor(dy * i);
            let pos = new Position(x, y);
            let piece = this.getPiece(pos);
            if (piece == null)
                return prevPos;
            if (piece.getName() != 'empty')
                if (piece != self)
                    return prevPos;
            prevPos = pos;
        }
        return prevPos;
    }
    getFurthestAttack(self, pos1, pos2) {
        let definition = 8;
        let dx = pos2.getx() - pos1.getx() / definition;
        let dy = pos2.gety() - pos2.gety() / definition;
        var prevPos = pos1;
        for (let i = 0; i < definition; i++) {
            let x = pos1.getx() + Math.floor(dx * i);
            let y = pos1.gety() + Math.floor(dy * i);
            let pos = new Position(x, y);
            let piece = this.getPiece(pos);
            if (piece == null)
                return prevPos;
            if (piece.getName() != 'empty')
                if (piece != self)
                    return pos;
            prevPos = pos;
        }
        return prevPos;
    }
}
export { ChessState, Position, WIDTH, Side, HEIGHT };