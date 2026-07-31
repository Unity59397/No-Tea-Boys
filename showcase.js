// ---------- EDIT THIS LIST TO CHANGE THE GAME SHOWCASE ----------
// title : shown below the artwork
// tag   : small label in the top-left corner of the image
// image : path to artwork, e.g. 'images/parlour-trick.jpg'
//         leave as '' to show a placeholder until artwork is ready
// link  : where clicking the image / "Find out more" goes, e.g. 'games.html#parlour-trick'
//         leave as '#' if there's nowhere to send people yet
const SHOWCASE_GAMES = [
  { title: 'Chronofall', tag: 'Parlour Tricks', image: 'images/chronofall.jpg', link: 'chronofall.html' },
  { title: 'Steeped', tag: 'Roguelite', image: '', link: '#' },
  { title: 'Gossip Mechanics', tag: 'Party', image: '', link: '#' },
];
// ------------------------------------------------------------------

const showcaseGrid = document.getElementById('showcaseGrid');

if (showcaseGrid) {
  SHOWCASE_GAMES.forEach((game) => {
    const card = document.createElement('div');
    card.className = 'showcase-card';

    // ---- clickable image ----
    const media = document.createElement('a');
    media.className = 'showcase-media';
    media.href = game.link || '#';

    if (game.image) {
      media.style.backgroundImage = `url('${game.image}')`;
    }

    const tag = document.createElement('span');
    tag.className = 'showcase-tag';
    tag.textContent = game.tag;
    media.appendChild(tag);

    if (!game.image) {
      const placeholder = document.createElement('div');
      placeholder.className = 'showcase-placeholder';
      placeholder.textContent = 'No artwork yet';
      media.appendChild(placeholder);
    }

    card.appendChild(media);

    // ---- title + find out more, always outside the image ----
    const info = document.createElement('div');
    info.className = 'showcase-info';
    info.innerHTML = `
      <span class="showcase-title">${game.title}</span>
      <a class="showcase-cta" href="${game.link || '#'}">Find out more →</a>
    `;
    card.appendChild(info);

    showcaseGrid.appendChild(card);
  });
}