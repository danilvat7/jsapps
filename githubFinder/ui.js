class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }
  // display profile
  showProfile(user) {
    this.profile.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <a href="${
                      user.html_url
                    }" target="_blank" class="btn btn-primary btn-block mb-4">
                        View Profile
                    </a>
                </div>
                <div class="col-md-9">
                    <span class="badge badge-primary mb-2">
                        Public Repos: ${user.public_repos}
                    </span>
                    <span class="badge badge-secondary mb-2">
                        Public Gists: ${user.public_gists}
                    </span>
                    <span class="badge badge-success mb-2">
                        Public Followers: ${user.followers}
                    </span>
                    <span class="badge badge-info mb-2">
                        Public Following: ${user.following}
                    </span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${
                          user.company
                        }</li>
                        <li class="list-group-item">Blog: ${user.blog}</li>
                        <li class="list-group-item">Locatio: ${
                          user.location
                        }</li>
                        <li class="list-group-item">Member Since: ${
                          user.created_at
                        }</li>
                    </ul>
                </div>
            </div>
        </div>
        <h3 class="page-geading mb-3">Latest Repos</h3>
        <div id="repos"></div>
       `;
  }

  // show repos
  showRepos(repos) {
    let output = "";
    repos.forEach(repo => {
      output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${
                        repo.name
                    }</a>
                    </div>
                    <div class="col-md-6">
                         <span class="badge badge-primary mb-2">
                            Stars: ${repo.stargazers_count}
                        </span>
                        <span class="badge badge-secondary mb-2">
                            Watchers: ${repo.watchers}
                        </span>
                        <span class="badge badge-success mb-2">
                            Forks: ${repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
            `;
    });

    // output repos
    document.getElementById('repos').innerHTML = output;
  }
  // show alert
  showAlert(msg, className) {
    // clear
    this.clearAllert();
    // clear profile
    this.clearProfile();
    // crear div
    const div = document.createElement("div");
    // add class
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector(".searchContainer");
    // get search box
    const search = document.querySelector(".search");
    // insert allert
    container.insertBefore(div, search);

    // timeout after 3 sec
    setTimeout(() => {
      this.clearAllert();
    }, 3000);
  }

  // clear alert msg
  clearAllert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }
  // clear profile
  clearProfile() {
    this.profile.innerHTML = "";
  }
}
