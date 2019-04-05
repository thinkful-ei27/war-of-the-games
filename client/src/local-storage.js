export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) { }
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) { }
};

export const loadVoteCount = () => {
    return localStorage.getItem('voteCount')
}

export const clearVoteCount = () => {
    try {
        localStorage.removeItem('voteCount')
    } catch (e) { }
}

export const saveVoteCount = (count) => {
    try {
        localStorage.setItem('voteCount', count)
    } catch (e) { }
}

export const incrementVoteCount = () => {
    let count = parseInt(loadVoteCount(), 10);
    count += 1;
    return saveVoteCount(count)
}

export const setVoteLocalStorageVariable = () => {
    if (!loadVoteCount()) {
        return saveVoteCount(1)
    }
}

export const checkVoteCount = () => {
    if (Number(loadVoteCount()) === 0 || loadVoteCount === NaN) {
        saveVoteCount(1);
    }
    else if (Number(loadVoteCount()) > 13) {
        saveVoteCount(13)
    }
}