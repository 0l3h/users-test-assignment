const express = require('express');
const path = require('path');
const { 
    getAllUsers, 
    getNotFollowingUsers,
    getMaxFollowing, 
    getUserById
} = require('./controllers/user.controller');

const app = express();

const port = process.env.PORT || 5000;

app.disable('x-powered-by');

app.use(express.static(path.resolve(__dirname + '/../../client/')));
app.use(express.json());

app.get('/users', getAllUsers);
app.get('/users/:id/friends', getUserById);
app.get('/max-following', getMaxFollowing);
app.get('/not-following', getNotFollowingUsers);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});