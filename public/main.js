document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");

  // Function to close the sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.style.display = "none"; // Hide the sidebar
  });

  // Example of how to open the sidebar (if you have a button to do so)
  const openSidebarButton = document.getElementById("open-sidebar"); // Replace with your open button ID
  if (openSidebarButton) {
    openSidebarButton.addEventListener("click", () => {
      sidebar.style.display = "flex"; // Show the sidebar again
    });
  }
});
