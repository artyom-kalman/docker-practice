// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");
  const commentTableBody = document.querySelector("#commentTable tbody");

  const apiUrl = "http://localhost:3000/api"; // Base URL for the backend API

  // Fetch and render comments when the page loads
  fetchComments();

  async function fetchComments() {
    const response = await fetch(apiUrl);
    renderTable(await response.json());
  }

  function renderTable(comments) {
    commentTableBody.innerHTML = "";
    comments.forEach((comment) => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = comment.id;
      row.appendChild(idCell);

      const commentCell = document.createElement("td");
      commentCell.textContent = comment.comment;
      row.appendChild(commentCell);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit");
      editButton.addEventListener("click", () =>
        editComment(comment.id, comment.text),
      );
      row.append(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteComment(comment.id));
      row.append(deleteButton);

      commentTableBody.appendChild(row);
    });
  }

  function addComment(text) {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ comment: text }),
    })
      .then((response) => response.json())
      .then(() => fetchComments()) // Refresh the comments table after adding
      .catch((error) => console.error("Error adding comment:", error));
  }

  function deleteComment(id) {
    fetch(`${apiUrl}/${id}/delete`, {
      method: "POST",
    })
      .then(() => fetchComments()) // Refresh the comments table after deleting
      .catch((error) => console.error("Error deleting comment:", error));
  }

  function editComment(id, oldText) {
    const newComment = prompt("Edit your comment:", oldText);
    if (newComment) {
      fetch(`${apiUrl}/${id}/patch`, {
        method: "POST",
        body: JSON.stringify({ comment: newComment }),
      })
        .then(() => fetchComments()) // Refresh the comments table after editing
        .catch((error) => console.error("Error editing comment:", error));
    }
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText) {
      addComment(commentText);
      commentInput.value = "";
    }
  });
});
