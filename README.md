# 🎮 Blindspot

<div align="center">

**A stealth-puzzle game where enemies only move when you're not looking**

*Master your vision cone. Watch your blindspots. Survive.*

[Play Now](#-quick-start) • [Learn Game Dev](#-for-game-developers) • [Deploy](#-deployment)

---

![Game Status](https://img.shields.io/badge/status-playable-success?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Made With](https://img.shields.io/badge/made%20with-vanilla%20js-yellow?style=for-the-badge)

</div>

---

## 🎯 The Core Mechanic

> **The Rule:** Enemies freeze when inside your vision cone, but move toward you when you're not looking.

> **The Challenge:** You can't watch everything at once. You must constantly turn to check your blindspots while navigating to the goal.

**It's like "Red Light, Green Light" meets stealth gameplay** — tense, strategic, and based on awareness rather than reflexes.

---

## ✨ Features

- 🎨 **Beautiful Dark Theme** with smooth gradients and animations
- 👁️ **Dynamic Vision Cone** that shows exactly what you can see
- 🤖 **Smart Enemy AI** that freezes when observed, hunts when not
- 🎮 **Simple Controls** — Arrow keys or WASD, that's it
- 📚 **Educational Code** — Every line explained for learners
- 🚀 **Zero Dependencies** — Pure HTML/CSS/JavaScript
- 📱 **Responsive Design** — Works on any screen size
- ⚡ **Instant Load** — No build process, no frameworks

---

## 🚀 Quick Start

### Play Immediately

1. **Clone the repository**
   ```bash
   git clone https://github.com/raihaaniyat/blindspot.git
   cd blindspot
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Drag `index.html` into your browser, or
   - Run a local server:
     ```bash
     npx serve .
     ```

3. **Start playing!** 🎮

### Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** or **WASD** | Move and change facing direction |
| **R** | Restart level |

### Objective

🎯 Reach the **green goal** (★) without being caught by **red enemies** (●)

💡 **Tip:** Enemies inside your **yellow vision cone** are frozen. Enemies outside it are moving toward you!

---

## 🎓 For Game Developers

This project is designed as a **comprehensive learning resource** for beginner game developers.

### 📖 Documentation

| Document | Description |
|----------|-------------|
| **[QUICK_START.md](QUICK_START.md)** | Get playing in 30 seconds + immediate improvements |
| **[LEARNING_GUIDE.md](LEARNING_GUIDE.md)** | Deep dive into game dev concepts (14KB of tutorials!) |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deploy to Vercel in 5 minutes |
| **[game.js](game.js)** | 500+ lines of heavily commented game logic |

### 🧠 What You'll Learn

<table>
<tr>
<td width="50%">

**Core Concepts**
- Game loop architecture
- State management
- Input handling
- Collision detection
- Canvas rendering

</td>
<td width="50%">

**Math for Games**
- Distance calculation (Pythagorean theorem)
- Angle calculation (atan2)
- Vector movement (cos/sin)
- Vision cone geometry
- Angle normalization

</td>
</tr>
</table>

### 🔍 Code Highlights

#### Vision Cone Detection (The Core Mechanic)
```javascript
function isInVisionCone(pointX, pointY) {
    // 1. Check distance (Pythagorean theorem)
    const dist = distance(player.x, player.y, pointX, pointY);
    if (dist > player.visionDistance) return false;
    
    // 2. Check angle (trigonometry)
    const angleToPoint = angleBetween(player.x, player.y, pointX, pointY);
    let angleDiff = angleToPoint - player.angle;
    
    // 3. Normalize angle (handle wraparound)
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    
    // 4. Check if within cone
    return Math.abs(angleDiff) <= player.visionAngle / 2;
}
```

#### Enemy Behavior (Simple but Effective)
```javascript
function updateEnemies() {
    game.enemies.forEach(enemy => {
        // Freeze if in vision cone
        enemy.isFrozen = isInVisionCone(enemy.x, enemy.y);
        
        if (!enemy.isFrozen) {
            // Move toward player
            const angle = angleBetween(enemy.x, enemy.y, player.x, player.y);
            enemy.x += Math.cos(angle) * enemy.speed;
            enemy.y += Math.sin(angle) * enemy.speed;
        }
    });
}
```

---

## 🏗️ Project Structure

```
blindspot/
├── 📄 index.html           # Game structure & UI
├── 🎨 styles.css           # Design system (dark theme, animations)
├── 🎮 game.js              # Game logic (500+ lines, heavily commented)
├── 📦 package.json         # Project metadata
├── ⚙️  vercel.json          # Deployment config
│
├── 📚 Documentation
│   ├── README.md           # This file
│   ├── QUICK_START.md      # Instant play + improvements
│   ├── LEARNING_GUIDE.md   # In-depth tutorials
│   └── DEPLOYMENT.md       # Vercel deployment guide
│
└── 🔧 Configuration
    └── .gitignore          # Git ignore rules
```

**Total Size:** ~50KB (incredibly lightweight!)

---

## 🎨 Design Philosophy

| Principle | Implementation |
|-----------|----------------|
| **Tense, Not Horror** | Creates tension through gameplay mechanics, not jump scares or gore |
| **Clear Feedback** | Vision cone shows exactly what you can see — no guessing |
| **Simple Controls** | Easy to learn (arrow keys), hard to master (spatial awareness) |
| **Awareness-Based** | Success comes from perception and planning, not reflexes |
| **Beginner-Friendly Code** | Every function explained, no over-engineering |

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done if you cloned this repo!)

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select this repository
   - Click "Deploy"
   - Done! 🎉

Your game will be live at: `https://blindspot.vercel.app`

**Full deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🌟 Future Extensions

### 🎮 Gameplay Ideas
- [ ] Multiple levels with increasing difficulty
- [ ] Different enemy types (fast, slow, patrolling)
- [ ] Power-ups (wider vision, speed boost, freeze all)
- [ ] Collectibles and scoring system
- [ ] Time challenges and leaderboards

### 🎨 Polish Ideas
- [ ] Sound effects and background music
- [ ] Particle effects (freeze, catch, win)
- [ ] Screen shake on collision
- [ ] Smooth level transitions
- [ ] Tutorial overlay for first-time players

### 📱 Platform Ideas
- [ ] Mobile touch controls
- [ ] Gamepad support
- [ ] Progressive Web App (PWA)
- [ ] Level editor
- [ ] Procedural level generation

**Want to contribute?** Check out [LEARNING_GUIDE.md](LEARNING_GUIDE.md) for implementation ideas!

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **HTML5 Canvas** | 2D rendering |
| **Vanilla JavaScript** | Game logic (no frameworks!) |
| **CSS3** | Styling, animations, gradients |
| **requestAnimationFrame** | 60 FPS game loop |
| **Git** | Version control |
| **Vercel** | Deployment platform |

**Why no frameworks?** This is an educational project. Vanilla JS makes the concepts clearer and the code more portable.

---

## 📚 Learning Path

### For Complete Beginners

1. **Play the game** — Understand the mechanic
2. **Read [QUICK_START.md](QUICK_START.md)** — Get oriented
3. **Open `game.js`** — Read the comments
4. **Make small changes** — Change colors, speeds, positions
5. **Read [LEARNING_GUIDE.md](LEARNING_GUIDE.md)** — Understand the math

### For Intermediate Developers

1. **Study the vision cone algorithm** — Core mechanic
2. **Implement game feel improvements** — Screen shake, particles
3. **Create new levels** — Different enemy patterns
4. **Add new features** — Power-ups, scoring, sound

### For Advanced Developers

1. **Refactor for scalability** — Level system, enemy types
2. **Add procedural generation** — Random level creation
3. **Implement pathfinding** — Smarter enemy AI
4. **Build a level editor** — Mouse-based placement

---

## 🤝 Contributing

Contributions are welcome! This is an educational project, so:

- ✅ **Add new levels** with interesting patterns
- ✅ **Implement new enemy types** with different behaviors
- ✅ **Improve visual effects** (particles, animations)
- ✅ **Add sound/music** (keep it tense, not scary)
- ✅ **Optimize performance** (especially for mobile)
- ✅ **Improve documentation** (tutorials, examples)

**Please maintain:**
- Clear, commented code
- Beginner-friendly explanations
- No external dependencies (keep it vanilla!)

---

## 📄 License

**MIT License** — Free to use, modify, and distribute.

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Inspired by:** Classic stealth games and the "Weeping Angels" from Doctor Who
- **Built for:** Beginner game developers learning JavaScript and game design
- **Special thanks to:** The game dev community for teaching resources

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/raihaaniyat/blindspot/issues)
- **Discussions:** [GitHub Discussions](https://github.com/raihaaniyat/blindspot/discussions)

---

<div align="center">

**Made with ❤️ for game developers**

*Remember: They move when you're not looking...*

⭐ **Star this repo if you found it helpful!** ⭐

</div>
