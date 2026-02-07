# 🎮 Blindspot - Quick Start Guide

## ✅ What's Been Created

Your complete game is ready! Here's what we built:

### Core Files
- **index.html** - Game structure and UI
- **styles.css** - Beautiful dark theme with animations
- **game.js** - Complete game logic (heavily commented for learning)

### Documentation
- **README.md** - Project overview and features
- **LEARNING_GUIDE.md** - In-depth tutorial on game development concepts
- **DEPLOYMENT.md** - Step-by-step Vercel deployment guide

### Configuration
- **package.json** - Project metadata
- **vercel.json** - Deployment configuration
- **.gitignore** - Git ignore rules
- **Git repository** - Initialized with all files committed

---

## 🚀 How to Play Right Now

### Option 1: Double-Click (Easiest)
1. Open File Explorer
2. Navigate to `d:\blindspot`
3. Double-click `index.html`
4. Your default browser will open the game!

### Option 2: Drag and Drop
1. Open your browser (Chrome, Firefox, Edge)
2. Drag `index.html` from File Explorer into the browser window
3. Game loads instantly!

### Option 3: Local Server (Recommended for Development)
```bash
cd d:\blindspot
npx serve .
```
Then open: http://localhost:3000

---

## 🎯 How to Play

### Controls
- **Arrow Keys** or **WASD** - Move and look around
- **R** - Restart level

### Goal
Reach the green star without being caught by red enemies!

### The Trick
- Enemies **freeze** when you look at them (inside yellow cone)
- Enemies **move toward you** when you're not looking
- You can't watch everything at once!

---

## 📚 What You'll Learn

Open **LEARNING_GUIDE.md** to understand:

### 1. **Game Loop**
How games update and render 60 times per second

### 2. **Math Concepts**
- Distance calculation (Pythagorean theorem)
- Angles and directions (trigonometry)
- Vector movement

### 3. **Vision Cone Detection**
The core mechanic explained step-by-step with examples

### 4. **Game Feel**
How to make your game feel responsive and satisfying

### 5. **Level Design**
Ideas for creating challenging and fun levels

---

## 🎨 Game Feel Improvements (Try These!)

### 1. Screen Shake on Collision
Add this to `game.js` when player is caught:

```javascript
// In checkGameConditions(), when caught:
if (dist < p.radius + enemy.radius) {
    game.state = 'lost';
    
    // Add screen shake!
    let shakeAmount = 10;
    const shakeInterval = setInterval(() => {
        canvas.style.transform = `translate(${Math.random() * shakeAmount - shakeAmount/2}px, ${Math.random() * shakeAmount - shakeAmount/2}px)`;
        shakeAmount *= 0.9;
        if (shakeAmount < 0.5) {
            clearInterval(shakeInterval);
            canvas.style.transform = 'translate(0, 0)';
        }
    }, 50);
    
    gameStatusEl.textContent = '💀 Caught! Press R to restart';
    return;
}
```

### 2. Particle Trail for Player
Add this to `drawPlayer()`:

```javascript
// Before drawing the player circle
ctx.save();
ctx.globalAlpha = 0.3;
ctx.fillStyle = 'hsl(200, 90%, 65%)';
for (let i = 0; i < 5; i++) {
    const size = p.radius * (1 - i * 0.15);
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
}
ctx.restore();
```

### 3. Slow Motion When Enemy Gets Close
Add this to `updateEnemies()`:

```javascript
// After updating each enemy
const distToPlayer = distance(enemy.x, enemy.y, game.player.x, game.player.y);
if (distToPlayer < 100 && !enemy.isFrozen) {
    // Slow down the game!
    enemy.speed *= 0.5;
} else {
    enemy.speed = 1.5; // Normal speed
}
```

---

## 🏗️ Level Ideas to Implement

### Level 2: The Corridor
```javascript
// Add walls
game.walls = [
    { x: 200, y: 100, width: 20, height: 400 },
    { x: 600, y: 100, width: 20, height: 400 },
];

// 3 enemies in a line
game.enemies = [
    { x: 300, y: 200, radius: 12, speed: 1.5, isFrozen: false },
    { x: 400, y: 300, radius: 12, speed: 1.5, isFrozen: false },
    { x: 500, y: 400, radius: 12, speed: 1.5, isFrozen: false },
];
```

### Level 3: The Ambush
```javascript
// Enemies start behind you
game.player.x = 400;
game.player.y = 300;

game.enemies = [
    { x: 100, y: 300, radius: 12, speed: 2.0, isFrozen: false }, // Behind
    { x: 700, y: 200, radius: 12, speed: 1.5, isFrozen: false }, // Front-right
    { x: 700, y: 400, radius: 12, speed: 1.5, isFrozen: false }, // Front-left
];

game.goal.x = 750;
game.goal.y = 300;
```

---

## 🚢 Deploying to Vercel

See **DEPLOYMENT.md** for full instructions, but here's the quick version:

### 1. Push to GitHub
```bash
# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/blindspot.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repo
4. Click "Deploy"
5. Done! 🎉

Your game will be live at: `https://blindspot.vercel.app`

---

## 🐛 Troubleshooting

### Game doesn't load
- Make sure you're opening `index.html` (not `game.js` or `styles.css`)
- Try a different browser (Chrome recommended)
- Check browser console (F12) for errors

### Controls don't work
- Click on the canvas first to focus it
- Make sure you're using arrow keys or WASD
- Try refreshing the page

### Enemies don't freeze
- Make sure they're inside the yellow vision cone
- Check that you're facing them (the white line shows direction)
- Try increasing `player.visionAngle` in `game.js` for testing

---

## 📖 Next Steps

### Beginner Tasks
1. ✏️ Change the player color to your favorite color
2. ✏️ Add a third enemy at a different position
3. ✏️ Make the vision cone wider (change `visionAngle`)
4. ✏️ Make enemies faster (change `speed`)

### Intermediate Tasks
1. 🔨 Add a score counter showing time survived
2. 🔨 Create a "Level 2" with different enemy positions
3. 🔨 Add a particle effect when reaching the goal
4. 🔨 Implement a level select menu

### Advanced Tasks
1. 🚀 Add different enemy types (fast, slow, patrolling)
2. 🚀 Create a level editor with mouse clicks
3. 🚀 Add power-ups (speed boost, wider vision)
4. 🚀 Implement procedural level generation

---

## 📚 Learning Resources

### Recommended Reading Order
1. **Start here:** Open `LEARNING_GUIDE.md`
2. **Understand the code:** Read `game.js` comments
3. **Experiment:** Try the beginner tasks above
4. **Go deeper:** Study the math sections in LEARNING_GUIDE.md

### External Resources
- [Red Blob Games](https://www.redblobgames.com/) - Interactive game dev tutorials
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)

---

## 🎉 You Did It!

You now have:
- ✅ A fully working game
- ✅ Clean, commented code
- ✅ Comprehensive learning materials
- ✅ Deployment ready setup
- ✅ Git repository initialized

**Go play your game!** Open `index.html` and try to beat it!

Then start experimenting - change colors, add enemies, create new levels. The best way to learn is by doing!

---

## 💡 Tips for Learning

1. **Read the code** - Every line in `game.js` has comments explaining what it does
2. **Make small changes** - Change one thing at a time and see what happens
3. **Break things** - Don't be afraid to break the game - that's how you learn!
4. **Ask questions** - If something doesn't make sense, look it up or ask for help
5. **Build on it** - Add your own features and make it your own!

---

**Happy coding! 🚀**

*Remember: They move when you're not looking...*
