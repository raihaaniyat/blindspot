# 🎮 Blindspot - Stealth Puzzle Game

A browser-based stealth-puzzle game where enemies can only move when you're not looking at them. Master your vision cone, watch your blindspots, and reach the goal without being caught!

## 🎯 Core Mechanic

**The Rule:** Enemies freeze when inside your vision cone, but move toward you when you're not looking.

**The Challenge:** You can't watch everything at once - you must constantly turn to check your blindspots while navigating to the goal.

## 🕹️ How to Play

### Controls
- **Arrow Keys** or **WASD** - Move and change facing direction
- **R** - Restart level

### Objective
Reach the green goal without being caught by enemies!

### Strategy Tips
1. **Keep moving** - Standing still lets enemies approach from all sides
2. **Check your back** - Enemies behind you are moving!
3. **Plan your path** - Think about which enemies to freeze and when
4. **Use corners** - Position yourself to see multiple enemies at once

## 🚀 Running Locally

1. Clone this repository
2. Open `index.html` in a modern web browser
3. No build process needed - it's pure HTML/CSS/JavaScript!

## 🎓 Learning Resources

This game was built as a teaching project for beginner game developers. The code includes:

- **Extensive comments** explaining every function
- **Math concepts** explained intuitively (angles, vectors, distance)
- **Game design patterns** (game loop, state management, collision detection)
- **Visual feedback** techniques for better game feel

### Key Concepts Demonstrated

1. **Game Loop** - How games update and render continuously
2. **Vision Cone Detection** - Angle and distance calculations
3. **State Management** - Tracking game state, player, enemies
4. **Input Handling** - Keyboard controls
5. **Canvas Rendering** - Drawing shapes, gradients, animations

## 🏗️ Project Structure

```
blindspot/
├── index.html      # Main HTML structure
├── styles.css      # Design system and styling
├── game.js         # Game logic (heavily commented)
└── README.md       # This file
```

## 🎨 Design Philosophy

- **Tense but not horror** - Creates tension through gameplay, not jump scares
- **Clear visual feedback** - You always know what you can see
- **Simple controls** - Easy to learn, hard to master
- **Awareness-based** - Success comes from spatial awareness, not reflexes

## 🔧 Technical Details

- **No frameworks** - Pure vanilla JavaScript for learning clarity
- **Canvas API** - 2D rendering using HTML5 Canvas
- **60 FPS** - Smooth animation using `requestAnimationFrame`
- **Responsive** - Adapts to different screen sizes

## 🌟 Future Extensions

### Gameplay
- Multiple levels with increasing difficulty
- Different enemy types (faster, patrolling, etc.)
- Power-ups (wider vision, temporary freeze, etc.)
- Collectibles and scoring system

### Polish
- Sound effects and music
- Particle effects
- Screen shake on collision
- Level transitions

### Platforms
- Mobile touch controls
- Gamepad support
- Progressive Web App (PWA)

## 📚 Code Walkthrough

### Vision Cone Detection
The core mechanic uses two checks:
1. **Distance check** - Is the enemy close enough to see?
2. **Angle check** - Is the enemy within the cone's angle range?

```javascript
function isInVisionCone(pointX, pointY) {
    // Check distance using Pythagorean theorem
    const dist = distance(player.x, player.y, pointX, pointY);
    if (dist > player.visionDistance) return false;
    
    // Check angle difference
    const angleToPoint = angleBetween(player.x, player.y, pointX, pointY);
    let angleDiff = angleToPoint - player.angle;
    
    // Normalize and compare
    return Math.abs(angleDiff) <= player.visionAngle / 2;
}
```

### Enemy Behavior
Simple but effective:
```javascript
if (isInVisionCone(enemy.x, enemy.y)) {
    enemy.isFrozen = true;  // Freeze!
} else {
    // Move toward player
    const angleToPlayer = angleBetween(enemy.x, enemy.y, player.x, player.y);
    enemy.x += Math.cos(angleToPlayer) * enemy.speed;
    enemy.y += Math.sin(angleToPlayer) * enemy.speed;
}
```

## 🤝 Contributing

This is an educational project! Feel free to:
- Add new levels
- Implement new enemy types
- Improve visual effects
- Add sound/music
- Optimize performance

## 📄 License

MIT License - Free to use for learning and personal projects!

## 🙏 Acknowledgments

Built as a teaching tool for beginner game developers. Inspired by classic stealth games and the "Weeping Angels" concept.

---

**Happy coding! 🚀**

*Remember: They move when you're not looking...*
