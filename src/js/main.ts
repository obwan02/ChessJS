import { ChessState, WIDTH, HEIGHT, Side, Position } from "./game.js"
import { draw, TILE_SIZE } from "./ui.js"
import { AI } from "./ai.js"
import { Empty } from "./piece.js"

class GameManager {
    public state: ChessState;
    public ctx: CanvasRenderingContext2D;

    private canvas: HTMLCanvasElement;

    public selected: Position;
    public moves: Position[];
    public ai : AI;

    constructor() {
        this.state = new ChessState();
        this.canvas = <HTMLCanvasElement>document.getElementById("mainCanvas");
        this.canvas.width = TILE_SIZE * WIDTH;
        this.canvas.height = TILE_SIZE * HEIGHT;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.selected = null;
        this.moves = null;
        this.state.turn = Side.WHITE;
        this.ai = new AI(Side.BLACK);

        var self = this;

        this.canvas.onclick = function(event: MouseEvent) { self.onclick(self, event); }
    }

    onclick(self: GameManager, event: MouseEvent) {
        if(this.state.turn == this.ai.side) return;
        if(this.state.won != Side.EMPTY) return;
        if(self.selected)
            self.handleMove(event);
        else self.handleNewSelection(event);
    }

    handleNewSelection(event: MouseEvent) {
        let x = Math.floor(event.layerX / TILE_SIZE)
        let y = Math.floor(event.layerY / TILE_SIZE)
        
        let piece = this.state.getPiece(new Position(x, y));
        if(piece.getName() != 'empty' && piece.getSide() == this.state.turn) {
            this.selected = piece.position;
            this.moves = piece.getMoves(this.state);
        }
    }

    handleMove(event: MouseEvent) {
        let x = Math.floor(event.layerX / TILE_SIZE)
        let y = Math.floor(event.layerY / TILE_SIZE)

        //Board position
        let pos = new Position(x, y);
        
        //Handle deselection
        if(!this.moves || this.selected.equals(pos) || this.state.getPiece(pos).getSide() == this.state.turn) {
            this.selected = null;
            this.moves = null;
            return
        }

        let inMoves = false;
        this.moves.forEach(element => {
            if(element.equals(pos)) inMoves = true;
        });

        if(inMoves) {
            this.state.move(this.selected, pos);
        }

        if(this.state.won != Side.EMPTY) {
            console.log((this.state.won == Side.WHITE ? 'White' : 'Black') + ' has won')
        }

        this.selected = null;
        this.moves = null;
    }



}

function main() {
    var manager = new GameManager();
    render(manager, manager.ctx);
}

function render(manager: GameManager, ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(() => render(manager, ctx))
    if(manager.state.turn == manager.ai.side) {
        console.log('ai turn')
        manager.state = manager.ai.findBestMoves(manager.state.turn, manager.state, 0).state;
    } 
    draw(manager, ctx);
}

main();

export default GameManager;