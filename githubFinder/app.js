/*jshint esversion: 6 */
// init github
const github = new GitHub();

const searchUser = document.getElementById('searchUser');

// search input eventlistener
searchUser.addEventListener('keyup', (e) => {
    // get input text
    const userText = e.target.value;

    if (userText !== '') {
        // make http call
        github.getUser(userText)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    // show alert
                    console.log(data)
                } else {

                }
            })
    } else {
        // clear profile
    }
});