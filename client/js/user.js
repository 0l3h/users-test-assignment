import { getUserByIdRequest } from "./../api/user.js";

getUserById();

async function getUserById() {
    const id = localStorage.getItem('userId');

    const user = await(await getUserByIdRequest(id)).json();

    document.title = `Friends | ${user.first_name}`;

    const friendsElement = document.querySelector('main > h2');

    if (user.subscribers.length) {
        friendsElement.textContent = "Friends: " + user.friends_amount;    

        for (const friend of user.subscribers) {
            const friendList = document.querySelector('main > ol');
            const idElement = document.createElement('span');
            const friendNameElement = document.createElement('span');
            const friendListItem = document.createElement('li');

            friendListItem.appendChild(idElement);
            friendListItem.appendChild(friendNameElement);

            idElement.textContent = friend.id;
            friendNameElement.textContent = friend.first_name;

            friendList.appendChild(friendListItem);
        }
    } else {
        friendsElement.textContent = "Friends: 0";    
    }
};
