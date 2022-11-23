
const createInitialState = (songs) => {

}

const reducers = (state, action) => {

    if (state === undefined) {
        return state;
    }

    const { type } = action;

    switch (type) {
        case 'WIN':
            return {
                ...state,
                phase : 'win',
                wins : state.win + 1,
                plays : state.plays + 1
            };
        case 'LOSE':
            return {
                ...state,
                phase : 'lose',
                plays : state.plays + 1
            };
        case 'TIE':
            return {
                ...state,
                phase : 'tie',
                wins : state.win + 1,
                plays : state.plays + 1
            };
        case 'PLAY_AGAIN':
            return {
                ...state,
                phase : 'play'
            };
    }

}

export default {
    reducers
};
