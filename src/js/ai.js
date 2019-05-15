class AI {
    constructor(side) {
        this.side = side;
    }
    findBestMoves(side, state, level) {
        let resultTable = [];
        state.getAll(side).forEach((i) => {
            let moves = i.getMoves(state);
            moves.forEach((j) => {
                let cloneState = state.clone();
                let score = cloneState.move(i.position, j);
                if (state.turn != this.side)
                    score *= -1;
                resultTable.push({ 'move': j, 'piece': i,
                    'score': score, 'state': cloneState });
            });
        });
        if (level < 2) {
            resultTable.forEach((i) => {
                let e = this.findBestMoves(i.state.turn, i.state, level + 1);
                i.score += e.score;
            });
        }
        resultTable.sort((a, b) => {
            return b.score - a.score;
        });
        return resultTable[0];
    }
    recurse() {
    }
}
;
export { AI };
