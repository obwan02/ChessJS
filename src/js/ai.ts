import { Side, ChessState, Position } from "./game.js"
import { Piece } from "./piece.js"

interface PossibleMove {
    score: number;
    state: ChessState;
    piece: Piece;
    move: Position;
}

class AI {
    public side: Side;
    constructor(side: Side) {
        this.side = side;
    }

    findBestMoves(side: Side, state: ChessState, level: number) {
        let resultTable: PossibleMove[] = []
        state.getAll(side).forEach((i) => {
            let moves = i.getMoves(state);
            moves.forEach((j) => {
                let cloneState = state.clone();
                let score = cloneState.move(i.position, j);
                if(state.turn != this.side) score *= -1;
    
                if(level < 2) {
                    let result = this.findBestMoves(cloneState.turn, cloneState, level+1);
                    if(result) {
                        score += result.score;
                    }
                } 
                else {
                    resultTable.push({'score': score, 'state': cloneState, 
                                'piece': i, 'move': j});
                }
            });
            
        });
    
        resultTable.sort((a, b) => {
            return b.score - a.score;
        })
    
        return resultTable[0];
    }

    recurse() {
        
    }
};

export {
    AI
}