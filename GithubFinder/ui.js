class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    //Methd to show user profile
    showProfile(user) {
        //test
        // console.log(user);

        this.profile.innerHTML=`
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"/>
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">
                        View Profile
                        </a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    
    //Method to show repos
    showRepos(repos) {
        let output = '';
        repos.forEach(function(repo) {
            output +=`
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>
            `;
        });

        //Output repos
        document.getElementById('repos').innerHTML = output;
    }


    //Method to show alert message
    showAlert(message, className) {
        // Clear any remaining alerts
        this.clearAlert();

        //To create your alers:
        //1. create div from sratch 
        const div = document.createElement('div');
        //2. add classes =`${}` or class
        div.className = className;
        //3. add text - appendChild to put it inside
        div.appendChild(document.createTextNode(message));
        
        //To set alert location:
        //1. find parent - has class of searchContainer
        const container = document.querySelector('.searchContainer');
        //2. find search box - has class of search
        const search = document.querySelector('.search');
        //3. insert alert(div) in location in parent before search
        container.insertBefore(div, search);

        //Set timeout to clear alert after 3 sec
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    //Method to clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        //check if there is an alert
        if(currentAlert) {
            currentAlert.remove();
        }
    }


    //Method to clear profile when search box is empty
    clearProfile() {
        this.profile.innerHTML = '';
    }
}