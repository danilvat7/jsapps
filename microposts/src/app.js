import { http } from "./http";
import { ui } from "./ui";

const api = "http://localhost:3000/posts";

// get posts on dom load
document.addEventListener("DOMContentLoaded", getPosts);

// listen for add post
document.querySelector(".post-submit").addEventListener("click", addPost);

// listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// listen for edit
document.querySelector("#posts").addEventListener("click", enableEdit);

// listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// get posts
function getPosts() {
  http
    .get(api)
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error));
}

// add post
function addPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;
  const data = {
    title,
    body
  };
  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    if (id === "") {
      // create post
      http
        .post(api, data)
        .then(data => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(error => console.log(error));
    } else {
        http
        .put(`${api}/${id}`, data)
        .then(data => {
          ui.showAlert("Post updated", "alert alert-success");
          ui.changeFormState('add');
          getPosts();
        })
        .catch(error => console.log(error));
    }
  }
}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }
  e.preventDefault();
}
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
