import GameManager from "./main.js"
import { WIDTH, HEIGHT } from "./game.js"

const TILE_SIZE = 90;

function loadImage(url: string) {
    let img = new Image();
    img.src = "/res/" + url;
    return img;
}

const imgs = {
    'pawn': {
        'white': loadImage('pawn_white.png'),
        'black': loadImage('pawn_black.png')
    },

    'rook': {
        'white': loadImage('rook_white.png'),
        'black': loadImage('rook_black.png')
    },

    'knight': {
        'white': loadImage('knight_white.png'),
        'black': loadImage('knight_black.png')
    },

    'bishop': {
        'white': loadImage('bishop_white.png'),
        'black': loadImage('bishop_black.png')
    },

    'queen': {
        'white': loadImage('queen_white.png'),
        'black': loadImage('queen_black.png')
    },

    'king': {
        'white': loadImage('king_white.png'),
        'black': loadImage('king_black.png')
    },

    'dot': loadImage('dot.png')
}

function draw(manager: GameManager, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, TILE_SIZE * WIDTH, TILE_SIZE * HEIGHT);
    
    var count = 0;
    manager.state.board.forEach((i) => {

        let x = i.position.getx();
        let y = i.position.gety();
        
        //Fill board background
        ctx.fillStyle = ((x + y) % 2) ? "#99610d" : "#fca21b";
        ctx.fillRect(TILE_SIZE*x, TILE_SIZE*y, TILE_SIZE, TILE_SIZE);
        
        if(manager.selected && manager.selected.equals(i.position)) {
            ctx.fillStyle  = "rgba(1,1,1,0.1)"
            ctx.fillRect(TILE_SIZE*x, TILE_SIZE*y, TILE_SIZE, TILE_SIZE);
        }

        count++;
    });
    
    
    manager.state.board.forEach(i => {
        let x = i.position.getx();
        let y = i.position.gety();
        if(i.getName() != 'empty') {
            let image = imgs[i.getName()][i.getSideName()] 
            ctx.drawImage(image, TILE_SIZE*x, TILE_SIZE*y, TILE_SIZE, TILE_SIZE);
        }
    });
    
    if(manager.moves) {
        manager.moves.forEach(element => {
            let x=element.getx(), y=element.gety();
            ctx.drawImage(imgs['dot'], x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    }

}

export { draw, TILE_SIZE }