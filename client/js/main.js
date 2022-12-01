import { 
    getAllUsersRequest,
    getMaxFollowingRequest,
    getNotFollowingRequest
} from '../api/user.js';

const orderedList = document.querySelector('ol');

const getAllUsersButton = document.querySelector('main > div > button:nth-child(2)');
const getMaxFollowingButton = document.querySelector('main > div > button:nth-child(3)');
const getNotFollowingButton = document.querySelector('main > div > button:last-child');

getAllUsersButton.addEventListener('click', getAllUsers);
getMaxFollowingButton.addEventListener('click', getMaxFollowing);
getNotFollowingButton.addEventListener('click', getNotFollowing);

getAllUsers();

async function getAllUsers() {
    orderedList.replaceChildren();

    const users = await (await getAllUsersRequest()).json();

    generateMarkup(users);
};

async function getMaxFollowing() {
    orderedList.replaceChildren();

    const users = await (await getMaxFollowingRequest()).json();
    
    generateMarkup(users);
};

async function getNotFollowing() {
    orderedList.replaceChildren();
    
    const users = await (await getNotFollowingRequest()).json();
    
    generateMarkup(users);
};

function generateMarkup(users) {
    for (const user of users) {
        const listElement = document.createElement('li');
        const idElement = document.createElement('span');
        const usernameElement = document.createElement('span');
        const genderElement = document.createElement('span');
        const followersSection = document.createElement('div');
        const followingSection = document.createElement('div');
        const followersAmount = document.createElement('span');
        const followingAmount = document.createElement('span');
        const profileLink = document.createElement('a');

        idElement.textContent = user.id;
        usernameElement.textContent = user.first_name;
        genderElement.textContent = user.gender;
        
        followersSection.textContent = "Followers: ";
        followersAmount.textContent = user.subscribers_amount;
        
        followingSection.textContent = "Following: ";
        followingAmount.textContent = user.following_amount;

        profileLink.textContent = 'Show friends';
        profileLink.setAttribute('href', './pages/user.html');
        profileLink.addEventListener('click', () => localStorage.setItem('userId', user.id));

        followersSection.appendChild(followersAmount);
        followingSection.appendChild(followingAmount);

        listElement.appendChild(idElement);
        listElement.appendChild(usernameElement);
        listElement.appendChild(genderElement);
        listElement.appendChild(followersSection);
        listElement.appendChild(followingSection);
        listElement.appendChild(profileLink);

        orderedList.appendChild(listElement);
    };
};