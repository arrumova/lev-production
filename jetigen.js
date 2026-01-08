/* SLIDER BUTTONS */
const sliders = {
  photo: document.getElementById("photo-track"),
  video: document.getElementById("video-track")
};

document.querySelectorAll(".nav").forEach(btn => {
  btn.addEventListener("click", () => {
    const track = sliders[btn.dataset.target];
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: btn.classList.contains("left") ? -amount : amount, behavior: "smooth" });
  });
});

/* ANIMATION ON SCROLL */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 }
);
document.querySelectorAll(".track").forEach(el => observer.observe(el));

/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbVideo = document.getElementById("lightbox-video");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const mediaItems = [];
document.querySelectorAll(".track img, .track video").forEach(el => mediaItems.push(el));

let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  const el = mediaItems[currentIndex];

  if(el.tagName === "IMG"){
    lbVideo.pause();
    lbVideo.style.display="none";
    lbImg.style.display="block";
    lbImg.src = el.src;
  } else {
    lbImg.style.display="none";
    lbVideo.style.display="block";
    lbVideo.src = el.src;
  }

  lightbox.classList.add("show");

  setTimeout(()=>{
    if(lbImg.style.display === "block"){
      lbImg.style.transform="scale(1)";
      lbImg.style.opacity="1";
    }
    if(lbVideo.style.display === "block"){
      lbVideo.style.transform="scale(1)";
      lbVideo.style.opacity="1";
    }
  },10);
}

// открытие при клике
mediaItems.forEach((el,i)=>{
  el.addEventListener("click",()=>openLightbox(i));
});

// закрытие
function closeLightbox(){
  if(lbImg.style.display === "block"){
    lbImg.style.transform="scale(0.8)";
    lbImg.style.opacity="0";
  }
  if(lbVideo.style.display === "block"){
    lbVideo.style.transform="scale(0.8)";
    lbVideo.style.opacity="0";
    lbVideo.pause();
  }
  lightbox.classList.remove("show");
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = e => { if(e.target===lightbox) closeLightbox(); };
document.addEventListener("keydown", e => e.key==="Escape" && closeLightbox());

// кнопки навигации
function showNext(){
  currentIndex = (currentIndex + 1) % mediaItems.length;
  openLightbox(currentIndex);
}

function showPrev(){
  currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  openLightbox(currentIndex);
}

nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;
