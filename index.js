const track = document.getElementById("image-track");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = e => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  // Calculate percentage change
  const percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  // Clamp the nextPercentage between -100 and 0
  nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

  // Update track dataset and transform
  track.dataset.percentage = nextPercentage;
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  // Animate the track
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  // Update object position for each image
  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
};
