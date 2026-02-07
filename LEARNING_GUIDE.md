# 🎓 Game Development Learning Guide

This document explains the key concepts in Blindspot for beginner game developers.

## Table of Contents
1. [Understanding the Game Loop](#understanding-the-game-loop)
2. [Math Concepts Explained](#math-concepts-explained)
3. [Vision Cone Detection Deep Dive](#vision-cone-detection-deep-dive)
4. [Game Feel & Polish](#game-feel--polish)
5. [Level Design Ideas](#level-design-ideas)
6. [Future Extensions](#future-extensions)

---

## Understanding the Game Loop

### What is a Game Loop?

A game loop is the heart of every game. It runs continuously (usually 60 times per second) and does three things:

```
1. UPDATE (process input, move objects, check collisions)
2. DRAW (render everything to screen)
3. REPEAT (do it again next frame)
```

### In Blindspot:

```javascript
function gameLoop() {
    // 1. Clear the screen
    clearCanvas();
    
    // 2. UPDATE phase
    if (game.state === 'playing') {
        updatePlayer();      // Move player based on input
        updateEnemies();     // Move/freeze enemies
        checkGameConditions(); // Check win/lose
    }
    
    // 3. DRAW phase
    drawVisionCone();
    drawGoal();
    drawEnemies();
    drawPlayer();
    
    // 4. Request next frame (creates the loop)
    requestAnimationFrame(gameLoop);
}
```

**Why this order?**
- Update first, then draw (so you see the latest state)
- Draw from back to front (vision cone → goal → enemies → player)
- Use `requestAnimationFrame` instead of `setInterval` (smoother, syncs with monitor refresh rate)

---

## Math Concepts Explained

### 1. Distance Between Two Points

**The Problem:** How far apart are two objects?

**The Solution:** Pythagorean theorem!

```
Imagine a right triangle:
- Horizontal side = dx (difference in x)
- Vertical side = dy (difference in y)
- Diagonal = distance we want

distance = √(dx² + dy²)
```

**Visual Example:**
```
Player at (100, 100)
Enemy at (400, 300)

dx = 400 - 100 = 300
dy = 300 - 100 = 200

distance = √(300² + 200²)
         = √(90000 + 40000)
         = √130000
         = 360.5 pixels
```

**In Code:**
```javascript
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
```

---

### 2. Angles and Directions

**The Problem:** Which direction should an object face or move?

**The Solution:** Use `Math.atan2(dy, dx)`

**Understanding Angles:**
```
        90° (π/2)
           ↑
           |
180° ← ----+---- → 0°
(π)        |
           ↓
        270° (3π/2)
```

**In JavaScript:**
- Angles are in **radians** (not degrees)
- 360° = 2π radians
- 90° = π/2 radians
- To convert: `radians = degrees × (π / 180)`

**Example:**
```javascript
// Player at (100, 100), Enemy at (400, 300)
const dx = 400 - 100; // 300
const dy = 300 - 100; // 200

const angle = Math.atan2(dy, dx);
// angle ≈ 0.588 radians ≈ 33.7°
// This means "southeast" direction
```

**Why atan2 and not atan?**
- `atan2(dy, dx)` handles all four quadrants correctly
- `atan(dy/dx)` doesn't distinguish between opposite directions

---

### 3. Moving in a Direction

**The Problem:** How do I move an object toward a target?

**The Solution:** Use trigonometry!

```javascript
// Calculate angle to target
const angle = Math.atan2(targetY - myY, targetX - myX);

// Move in that direction
myX += Math.cos(angle) * speed;
myY += Math.sin(angle) * speed;
```

**Why cos and sin?**
```
Think of a unit circle:
- cos(angle) gives the X component (horizontal)
- sin(angle) gives the Y component (vertical)

Together they create movement in the right direction!
```

**Visual:**
```
If angle = 45° (northeast):
  cos(45°) ≈ 0.707 (move right)
  sin(45°) ≈ 0.707 (move down)
  
If speed = 2:
  x += 0.707 × 2 = 1.414 (move right 1.4 pixels)
  y += 0.707 × 2 = 1.414 (move down 1.4 pixels)
```

---

## Vision Cone Detection Deep Dive

This is the **core mechanic** of Blindspot. Let's break it down completely.

### The Goal
Determine if an enemy is inside the player's vision cone.

### The Approach
Two checks:
1. **Distance check** - Is the enemy close enough to see?
2. **Angle check** - Is the enemy within the cone's angle range?

### Step-by-Step Example

**Setup:**
```
Player:
  - Position: (200, 300)
  - Facing angle: 0° (looking right)
  - Vision distance: 250 pixels
  - Vision angle: 60° (π/3 radians)

Enemy:
  - Position: (400, 350)
```

**Step 1: Distance Check**
```javascript
const dist = distance(200, 300, 400, 350);
// dist = √((400-200)² + (350-300)²)
// dist = √(200² + 50²)
// dist = √42500 ≈ 206 pixels

if (dist > 250) return false; // Not in range
// 206 < 250, so continue...
```

**Step 2: Calculate Angle to Enemy**
```javascript
const angleToEnemy = Math.atan2(350 - 300, 400 - 200);
// angleToEnemy = Math.atan2(50, 200)
// angleToEnemy ≈ 0.245 radians ≈ 14°
```

**Step 3: Calculate Angle Difference**
```javascript
let angleDiff = angleToEnemy - playerAngle;
// angleDiff = 0.245 - 0 = 0.245 radians

// Normalize (handle wraparound)
while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
```

**Step 4: Check if Within Cone**
```javascript
const halfVisionAngle = (Math.PI / 3) / 2; // 30° on each side

if (Math.abs(angleDiff) <= halfVisionAngle) {
    return true; // INSIDE CONE!
}
// |0.245| ≈ 14° < 30°, so YES, enemy is visible!
```

### Why Normalize Angles?

**The Problem:**
```
Player facing: 350° (almost north)
Enemy at: 10° (slightly east of north)

Direct difference: 10° - 350° = -340°
But they're actually only 20° apart!
```

**The Solution:**
```javascript
while (angleDiff > 180°) angleDiff -= 360°;
while (angleDiff < -180°) angleDiff += 360°;

// -340° + 360° = 20° ✓
```

---

## Game Feel & Polish

### What is "Game Feel"?

Game feel is how responsive and satisfying a game is to play. Small details make a huge difference!

### 3 Ways to Improve Blindspot's Feel

#### 1. **Visual Feedback**

**Current:** Enemies just change color when frozen

**Improvements:**
```javascript
// Add freeze animation
if (enemy.isFrozen && !enemy.wasFrozen) {
    // Just froze! Show particles
    createFreezeParticles(enemy.x, enemy.y);
}

// Add screen shake when caught
if (game.state === 'lost') {
    shakeScreen(10, 300); // intensity, duration
}

// Add trail effect for player movement
drawTrail(player.previousPositions);
```

#### 2. **Audio Feedback**

```javascript
// Sound effects
const sounds = {
    freeze: new Audio('freeze.mp3'),
    unfreeze: new Audio('unfreeze.mp3'),
    caught: new Audio('caught.mp3'),
    win: new Audio('win.mp3'),
};

// Play when enemy freezes
if (enemy.isFrozen && !enemy.wasFrozen) {
    sounds.freeze.play();
}
```

#### 3. **Juice & Polish**

```javascript
// Slow-motion when enemy gets close
if (closestEnemyDistance < 50) {
    gameSpeed = 0.5; // Slow down time!
}

// Pulse the vision cone when enemy enters
if (enemyJustEnteredCone) {
    visionConePulse = 1.5; // Scale up briefly
}

// Add footstep particles when moving
if (player.isMoving) {
    createDustParticle(player.x, player.y);
}
```

---

## Level Design Ideas

### Level 1: Tutorial
**Goal:** Teach the basic mechanic
```
- 1 enemy directly between player and goal
- Enemy starts far away
- Wide open space
```

**Learning:** "I need to watch the enemy to freeze it, then move past"

### Level 2: The Pincer
**Goal:** Teach multi-enemy management
```
- 2 enemies, one on each side
- Player starts in the middle
- Goal is behind one enemy
```

**Learning:** "I can't watch both at once - I need to prioritize"

### Level 3: The Maze
**Goal:** Teach spatial awareness
```
- Narrow corridors
- 3 enemies at corners
- Limited vision due to walls
```

**Learning:** "I need to check corners before turning"

### Advanced Level Ideas

**The Gauntlet:**
- Long corridor
- Enemies spawn behind you
- Must keep moving forward

**The Arena:**
- Circular room
- Enemies from all directions
- Goal in the center

**The Escort:**
- Must guide a slow NPC to the goal
- Enemies target the NPC
- Can't let them touch it

---

## Future Extensions

### 1. Difficulty Progression

**Easy Additions:**
```javascript
// Faster enemies
enemy.speed = 2.0; // Was 1.5

// More enemies
game.enemies.push({
    x: 300, y: 400,
    radius: 12,
    speed: 1.5,
    isFrozen: false,
});

// Narrower vision cone
player.visionAngle = Math.PI / 4; // 45° instead of 60°

// Shorter vision distance
player.visionDistance = 200; // Was 250
```

**Medium Additions:**
```javascript
// Enemy types
const ENEMY_TYPES = {
    SLOW: { speed: 1.0, color: 'orange' },
    NORMAL: { speed: 1.5, color: 'red' },
    FAST: { speed: 2.5, color: 'purple' },
};

// Patrolling enemies (move even when seen)
if (enemy.type === 'PATROL') {
    // Follow patrol path regardless of vision
}

// Time limit
game.timeRemaining = 30; // seconds
```

### 2. New Mechanics

**Power-ups:**
```javascript
// Wider vision temporarily
powerup.type = 'WIDE_VISION';
powerup.duration = 5; // seconds

// Freeze all enemies briefly
powerup.type = 'FREEZE_ALL';
powerup.duration = 3;

// Speed boost
powerup.type = 'SPEED';
powerup.multiplier = 1.5;
```

**Collectibles:**
```javascript
// Must collect keys before reaching goal
game.keysCollected = 0;
game.keysRequired = 3;

// Scoring system
game.score = 0;
game.score += 100; // Reach goal
game.score += 50 * game.keysCollected;
game.score += Math.floor(game.timeRemaining * 10);
```

**Environmental Hazards:**
```javascript
// Walls that block vision
walls.forEach(wall => {
    if (lineIntersectsRect(player, enemy, wall)) {
        // Can't see through wall!
        enemy.isVisible = false;
    }
});

// Dark zones (reduced vision)
if (player.inDarkZone) {
    player.visionDistance *= 0.5;
}
```

### 3. Platform Extensions

**Mobile Support:**
```javascript
// Touch controls
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    // Move toward touch point
    player.targetX = touchX;
    player.targetY = touchY;
});

// Virtual joystick
drawJoystick(joystickX, joystickY, joystickAngle);
```

**Gamepad Support:**
```javascript
window.addEventListener('gamepadconnected', (e) => {
    console.log('Gamepad connected!');
});

function updateGamepad() {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
        // Left stick for movement
        const x = gamepad.axes[0];
        const y = gamepad.axes[1];
        
        if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
            player.angle = Math.atan2(y, x);
            player.x += x * player.speed;
            player.y += y * player.speed;
        }
    }
}
```

**Progressive Web App:**
```javascript
// Add to manifest.json
{
    "name": "Blindspot",
    "short_name": "Blindspot",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#1a1d2e",
    "theme_color": "#ffd966",
    "icons": [...]
}

// Service worker for offline play
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('blindspot-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/game.js',
            ]);
        })
    );
});
```

---

## Practice Exercises

### Beginner
1. Change the player's color to purple
2. Make enemies move faster (increase speed to 2.0)
3. Add a third enemy at position (600, 300)
4. Change the vision cone angle to 90 degrees

### Intermediate
1. Add a score display that shows how long the player survived
2. Create a "hard mode" button that makes enemies faster
3. Add a particle effect when the player reaches the goal
4. Implement a level select screen

### Advanced
1. Create a level editor where you can place enemies with mouse clicks
2. Implement enemy pathfinding around obstacles
3. Add a replay system that records and plays back your movements
4. Create procedurally generated levels

---

## Debugging Tips

### Common Issues

**1. Enemy doesn't freeze:**
```javascript
// Add debug visualization
if (isInVisionCone(enemy.x, enemy.y)) {
    console.log('Enemy should be frozen!');
    // Draw a line from player to enemy
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(enemy.x, enemy.y);
    ctx.stroke();
}
```

**2. Vision cone looks wrong:**
```javascript
// Log the angles
console.log('Player angle:', player.angle);
console.log('Vision angle:', player.visionAngle);
console.log('Left edge:', player.angle - player.visionAngle/2);
console.log('Right edge:', player.angle + player.visionAngle/2);
```

**3. Collision detection not working:**
```javascript
// Visualize collision radius
ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.arc(player.x, player.y, player.radius + enemy.radius, 0, Math.PI * 2);
ctx.stroke();
```

---

## Resources for Further Learning

### Game Development
- [Game Programming Patterns](https://gameprogrammingpatterns.com/) - Free book
- [Red Blob Games](https://www.redblobgames.com/) - Interactive tutorials
- [Game Maker's Toolkit](https://www.youtube.com/c/MarkBrownGMT) - YouTube channel

### Math for Games
- [Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) - 3Blue1Brown
- [Khan Academy - Trigonometry](https://www.khanacademy.org/math/trigonometry)

### JavaScript & Canvas
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [JavaScript.info](https://javascript.info/)

---

**Keep experimenting and have fun! 🎮**

The best way to learn is by trying things, breaking them, and fixing them. Don't be afraid to modify the code!
