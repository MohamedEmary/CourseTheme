document.addEventListener("DOMContentLoaded", function () {
  const submitIcon = document.getElementById("searchButton");
  const inputBox = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  let isOpen = false;

  submitIcon.addEventListener("click", function (e) {
    let queryLen = inputBox.value.trim().length;
    e.preventDefault();
    if (!isOpen) {
      inputBox.classList.remove("w-0");
      inputBox.classList.add("w-full");
      inputBox.focus();
      isOpen = true;
      inputBox.classList.toggle("px-3");
    } else if (isOpen && queryLen == 0) {
      inputBox.classList.remove("w-full");
      inputBox.classList.add("w-0");
      inputBox.blur();
      isOpen = false;
    } else {
      // then the input box is open and has a query
      inputBox.value = inputBox.value.trim();
      this.parentElement.submit();
    }
  });

  searchForm.addEventListener("submit", function (e) {
    let queryLen = this.value.trim().length;
    if (e.key === "Enter" && queryLen) {
      e.preventDefault();
      inputBox.value = inputBox.value.trim();
    }
  });
});
