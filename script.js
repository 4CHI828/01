const searchInput = document.getElementById("searchInput");
const playlistCards = document.querySelectorAll(".playlist-card");
const songItems = document.querySelectorAll(".playlist-card li");
const searchCount = document.getElementById("searchCount");
const noResult = document.getElementById("noResult");
const toggleTheme = document.getElementById("toggleTheme");
const backToTop = document.getElementById("backToTop");

function updateSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  songItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    const visible = query === "" || text.includes(query);
    item.style.display = visible ? "grid" : "none";
    if (visible) visibleCount += 1;
  });

  playlistCards.forEach((card) => {
    const totalSongs = card.querySelectorAll("li").length;
    const hiddenSongs = card.querySelectorAll("li[style*='display: none']").length;
    const visibleSongs = totalSongs - hiddenSongs;
    card.style.display = visibleSongs > 0 ? "grid" : "none";
  });

  searchCount.textContent = `共 ${visibleCount} 首歌曲`;
  noResult.style.display = visibleCount === 0 ? "block" : "none";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

if (searchInput) {
  searchInput.addEventListener("input", updateSearch);
  updateSearch();
}

if (toggleTheme) {
  toggleTheme.addEventListener("click", toggleDarkMode);
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 320) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
