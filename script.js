// Scroll progress bar
window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop/height)*100;
  document.getElementById("progress").style.width = progress+"%";
};

// Popups
function openPopup(id){ document.getElementById(id).style.display='flex'; }
function closePopup(id){ document.getElementById(id).style.display='none'; }

// Fade-up sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Typing effect for header
const txtEl = document.querySelector('.typing-text');
if(txtEl){
  const txt = txtEl.textContent;
  txtEl.textContent='';
  let i=0;
  const typeWriter = () => {
    if(i<txt.length){
      txtEl.textContent+=txt.charAt(i);
      i++;
      setTimeout(typeWriter,80);
    }
  };
  typeWriter();
}
