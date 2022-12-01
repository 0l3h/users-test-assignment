const getAllUsersRequest = () => {
    return fetch('/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
};

const getUserByIdRequest = (id) => {
    return fetch(`/users/${id}/friends?order_by=id&order_type=desc`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
};

const getNotFollowingRequest = () => {
    return fetch('/not-following', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
};

const getMaxFollowingRequest = () => {
    return fetch('/max-following', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
};


export { 
    getAllUsersRequest, 
    getUserByIdRequest,
    getMaxFollowingRequest,
    getNotFollowingRequest
};