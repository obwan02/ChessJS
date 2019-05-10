import { ChessState, WIDTH, HEIGHT, Side, Position } from "./game.js";
import { draw, TILE_SIZE } from "./ui.js";
import { Empty } from "./piece.js";
class GameManager {
    constructor() {
        this.state = new ChessState();
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.width = TILE_SIZE * WIDTH;
        this.canvas.height = TILE_SIZE * HEIGHT;
        this.ctx = this.canvas.getContext("2d");
        this.selected = null;
        this.moves = null;
        this.turn = Side.WHITE;
        var self = this;
        this.canvas.onclick = function (event) { self.onclick(self, event); };
    }
    onclick(self, event) {
        if (self.selected)
            self.handleMove(event);
        else
            self.handleNewSelection(event);
    }
    handleNewSelection(event) {
        let x = Math.floor(event.layerX / TILE_SIZE);
        let y = Math.floor(event.layerY / TILE_SIZE);
        let piece = this.state.getPiece(new Position(x, y));
        if (piece.getName() != 'empty' && piece.getSide() == this.turn) {
            this.selected = piece.position;
            this.moves = piece.getMoves(this.state);
        }
    }
    handleMove(event) {
        let x = Math.floor(event.layerX / TILE_SIZE);
        let y = Math.floor(event.layerY / TILE_SIZE);
        //Board position
        let pos = new Position(x, y);
        //Handle deselection
        if (!this.moves || this.selected.equals(pos) || this.state.getPiece(pos).getSide() == this.turn) {
            this.selected = null;
            this.moves = null;
            return;
        }
        let inMoves = false;
        this.moves.forEach(element => {
            if (element.equals(pos))
                inMoves = true;
        });
        if (inMoves) {
            console.log('a');
            let target = this.state.getPiece(pos);
            let piece = this.state.getPiece(this.selected);
            let target_index = this.state.board.indexOf(target);
            let piece_index = this.state.board.indexOf(piece);
            piece.move(pos);
            this.state.board[target_index] = new Empty(this.selected);
            this.state.board[piece_index] = piece;
            this.turn = this.turn == Side.WHITE ? Side.BLACK : Side.WHITE;
        }
        this.selected = null;
        this.moves = null;
    }
}
function main() {
    var manager = new GameManager();
    render(manager, manager.ctx);
}
function render(manager, ctx) {
    requestAnimationFrame(() => render(manager, ctx));
    draw(manager, ctx);
}
main();
export default GameManager;
