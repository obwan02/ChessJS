import { ChessState, WIDTH, HEIGHT } from "./game.js"
import { draw, TILE_SIZE } from "./ui.js"


function main() {
    const canvas = <HTMLCanvasElement>document.getElementById("mainCanvas");
    canvas.width = TILE_SIZE * WIDTH;
    canvas.height = TILE_SIZE * HEIGHT;
    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    var state = new ChessState();
    console.log("Here!")
    render(state, ctx);
}

function render(state: ChessState, ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(() => render(state, ctx))
    draw(state, ctx);
}

main();