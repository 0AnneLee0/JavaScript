//Instantiate (Init) Github
const github = new GitHub;

//Init UI
const ui = new UI;

//Search input
const searchUser = document.getElementById('searchUser');

//Add search input event listener
searchUser.addEventListener('keyup', (e)=>{
    //Get user text
    const userText = e.target.value;

    if(userText != ''){
        //check 
        // console.log(userText);

        //Make http call
        //pass user text from form, returns a promise
        github.getUser(userText)
            .then(data => {
            // console.log(data);
            if(data.profile.message === 'Not Found') {
                
                //Show alert -takes in message and bootstrap class
                ui.showAlert('User not found', 'alert alert-danger');
            } else {
                //Show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        })
    } else {
        //Clear profile
        ui.clearProfile();
    }
});