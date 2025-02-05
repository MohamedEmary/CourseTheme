const form = document.getElementById("comment_form");
const textarea = document.querySelector('[name="comment[body]"]');
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    console.log(event.target);
    event.target.form?.submit();
  }
});
