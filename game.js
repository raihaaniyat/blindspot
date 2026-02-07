// ========================================
// BLINDSPOT - Game Logic
// ========================================
// This file contains all the game logic explained step-by-step
// for beginner game developers.

// ========================================
// CANVAS SETUP
// ========================================
// Get the canvas element and its 2D drawing context
// Think of canvas as a digital drawing board
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get UI elements for updating game status
const gameStatusEl = document.getElementById('gameStatus');
const levelInfoEl = document.getElementById('levelInfo');

// ========================================
// LEVEL DEFINITIONS
// ========================================
// Each level has unique enemy configurations and difficulty
const LEVELS = [
    // Level 1: Tutorial - Learn the basics
    {
        name: 'Level 1: First Steps',
        player: { x: 100, y: 300 },
        goal: { x: 700, y: 300 },
        enemies: [
            { x: 400, y: 300, radius: 12, speed: 1.2 },
        ],
        description: 'One enemy. Learn to freeze and move.'
    },

    // Level 2: The Pincer - Multiple threats
    {
        name: 'Level 2: The Pincer',
        player: { x: 100, y: 300 },
        goal: { x: 700, y: 300 },
        enemies: [
            { x: 400, y: 150, radius: 12, speed: 1.3 },
            { x: 400, y: 450, radius: 12, speed: 1.3 },
        ],
        description: 'Two enemies flanking you. Watch both sides!'
    },

    // Level 3: The Gauntlet - Linear challenge
    {
        name: 'Level 3: The Gauntlet',
        player: { x: 100, y: 300 },
        goal: { x: 700, y: 300 },
        enemies: [
            { x: 250, y: 300, radius: 12, speed: 1.4 },
            { x: 450, y: 200, radius: 12, speed: 1.4 },
            { x: 450, y: 400, radius: 12, speed: 1.4 },
        ],
        description: 'Three enemies in your path. Plan your route!'
    },

    // Level 4: The Ambush - Surrounded
    {
        name: 'Level 4: The Ambush',
        player: { x: 400, y: 300 },
        goal: { x: 750, y: 300 },
        enemies: [
            { x: 150, y: 300, radius: 12, speed: 1.5 }, // Behind
            { x: 600, y: 150, radius: 12, speed: 1.5 }, // Front-right
            { x: 600, y: 450, radius: 12, speed: 1.5 }, // Front-left
            { x: 400, y: 100, radius: 12, speed: 1.3 }, // Top
        ],
        description: 'Surrounded! Check all directions constantly.'
    },

    // Level 5: The Maze - Expert challenge
    {
        name: 'Level 5: The Maze',
        player: { x: 100, y: 100 },
        goal: { x: 700, y: 500 },
        enemies: [
            { x: 250, y: 200, radius: 12, speed: 1.6 },
            { x: 400, y: 300, radius: 12, speed: 1.4 },
            { x: 550, y: 400, radius: 12, speed: 1.6 },
            { x: 300, y: 450, radius: 12, speed: 1.5 },
            { x: 600, y: 200, radius: 12, speed: 1.5 },
        ],
        description: 'Five enemies. Master level. Good luck!'
    },
];

// ========================================
// GAME STATE
// ========================================
// This object holds all the current game data
// It's like the "brain" of the game that remembers everything
const game = {
    state: 'playing', // Can be: 'playing', 'won', 'lost'
    currentLevel: 0,  // Index into LEVELS array (0-based)
    totalLevels: LEVELS.length,

    // Player data
    player: {
        x: 100,              // Horizontal position (pixels from left)
        y: 300,              // Vertical position (pixels from top)
        radius: 15,          // Size of the player circle
        speed: 3,            // How fast they move (pixels per frame)
        angle: 0,            // Which direction they're facing (in radians)
        // 0 = right, Math.PI/2 = down, Math.PI = left, etc.

        // Vision cone properties
        visionDistance: 250, // How far the player can see
        visionAngle: Math.PI / 3, // How wide the vision cone is (60 degrees)
        // Math.PI / 3 radians = 60 degrees
    },

    // Goal (where player needs to reach)
    goal: {
        x: 700,
        y: 300,
        radius: 30,
    },

    // Array of enemies (will be populated by loadLevel)
    enemies: [],

    // Keyboard input tracking
    keys: {
        w: false,
        a: false,
        s: false,
        d: false,
        ArrowUp: false,
        ArrowLeft: false,
        ArrowDown: false,
        ArrowRight: false,
    },
};

// ========================================
// INPUT HANDLING
// ========================================
// Listen for keyboard events to track which keys are pressed

// When a key is pressed down
window.addEventListener('keydown', (e) => {
    // Update the keys object
    if (e.key in game.keys) {
        game.keys[e.key] = true;
    }

    // Restart on 'R' key
    if (e.key === 'r' || e.key === 'R') {
        restartLevel();
    }

    // Next level on 'N' key (only when won)
    if ((e.key === 'n' || e.key === 'N') && game.state === 'won') {
        nextLevel();
    }
});

// When a key is released
window.addEventListener('keyup', (e) => {
    if (e.key in game.keys) {
        game.keys[e.key] = false;
    }
});

// ========================================
// MATH HELPER FUNCTIONS
// ========================================
// These functions help us calculate distances and angles
// Don't worry if the math seems complex - I'll explain each one!

/**
 * Calculate distance between two points
 * Uses Pythagorean theorem: distance = √(dx² + dy²)
 * 
 * Imagine a right triangle:
 * - One side is the horizontal distance (dx)
 * - Other side is the vertical distance (dy)
 * - The hypotenuse (diagonal) is the actual distance
 */
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1; // Horizontal difference
    const dy = y2 - y1; // Vertical difference
    return Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
}

/**
 * Calculate angle from point 1 to point 2
 * Returns angle in radians
 * 
 * Think of it like this:
 * - If point2 is directly to the right of point1: angle = 0
 * - If point2 is directly below point1: angle = π/2 (90°)
 * - If point2 is directly to the left: angle = π (180°)
 */
function angleBetween(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Check if a point is inside the vision cone
 * This is the CORE of our game mechanic!
 * 
 * How it works:
 * 1. Check if point is close enough (within vision distance)
 * 2. Calculate angle from player to point
 * 3. Check if that angle is within the cone's angle range
 */
function isInVisionCone(pointX, pointY) {
    const player = game.player;

    // Step 1: Check distance
    const dist = distance(player.x, player.y, pointX, pointY);
    if (dist > player.visionDistance) {
        return false; // Too far away to see
    }

    // Step 2: Calculate angle to the point
    const angleToPoint = angleBetween(player.x, player.y, pointX, pointY);

    // Step 3: Calculate angle difference
    // We need to check if angleToPoint is within the cone
    let angleDiff = angleToPoint - player.angle;

    // Normalize the angle difference to be between -π and π
    // This handles the wraparound (e.g., 350° and 10° are close)
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    // Check if the angle difference is within half the vision cone angle
    // We use half because the cone extends equally on both sides
    return Math.abs(angleDiff) <= player.visionAngle / 2;
}

/**
 * Normalize angle to be between 0 and 2π
 * This keeps angles in a consistent range
 */
function normalizeAngle(angle) {
    while (angle < 0) angle += 2 * Math.PI;
    while (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
    return angle;
}

// ========================================
// GAME LOGIC FUNCTIONS
// ========================================

/**
 * Update player position and facing direction
 * Called every frame
 */
function updatePlayer() {
    const p = game.player;
    const keys = game.keys;

    // Track movement for angle calculation
    let dx = 0;
    let dy = 0;

    // Horizontal movement
    if (keys.a || keys.ArrowLeft) {
        dx -= p.speed;
    }
    if (keys.d || keys.ArrowRight) {
        dx += p.speed;
    }

    // Vertical movement
    if (keys.w || keys.ArrowUp) {
        dy -= p.speed;
    }
    if (keys.s || keys.ArrowDown) {
        dy += p.speed;
    }

    // Update position
    p.x += dx;
    p.y += dy;

    // Keep player inside canvas bounds
    // This prevents the player from moving off-screen
    p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
    p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));

    // Update facing direction based on movement
    // Only update if actually moving (to avoid angle = 0 when standing still)
    if (dx !== 0 || dy !== 0) {
        p.angle = Math.atan2(dy, dx);
    }
}

/**
 * Update all enemies
 * This is where the freeze/move mechanic happens!
 */
function updateEnemies() {
    game.enemies.forEach(enemy => {
        // Check if enemy is in player's vision cone
        enemy.isFrozen = isInVisionCone(enemy.x, enemy.y);

        // If frozen, don't move
        if (enemy.isFrozen) {
            return; // Skip the rest of this iteration
        }

        // If not frozen, move toward player
        // Calculate direction to player
        const angleToPlayer = angleBetween(enemy.x, enemy.y, game.player.x, game.player.y);

        // Move in that direction
        enemy.x += Math.cos(angleToPlayer) * enemy.speed;
        enemy.y += Math.sin(angleToPlayer) * enemy.speed;
    });
}

/**
 * Check for collisions and win condition
 */
function checkGameConditions() {
    // Only check if game is still playing
    if (game.state !== 'playing') return;

    const p = game.player;

    // Check collision with each enemy
    for (let enemy of game.enemies) {
        const dist = distance(p.x, p.y, enemy.x, enemy.y);
        // If distance between centers is less than sum of radii, they're touching
        if (dist < p.radius + enemy.radius) {
            game.state = 'lost';
            gameStatusEl.textContent = '💀 Caught! Press R to restart';
            gameStatusEl.style.color = 'hsl(0, 85%, 60%)';
            return;
        }
    }

    // Check if player reached goal
    const distToGoal = distance(p.x, p.y, game.goal.x, game.goal.y);
    if (distToGoal < p.radius + game.goal.radius) {
        game.state = 'won';

        // Check if there are more levels
        if (game.currentLevel < game.totalLevels - 1) {
            gameStatusEl.textContent = '🎉 Level Complete! Press N for next level or R to retry';
        } else {
            gameStatusEl.textContent = '🏆 All Levels Complete! You Win! Press R to restart';
        }
        gameStatusEl.style.color = 'hsl(140, 70%, 50%)';
    }
}

/**
 * Load a specific level
 */
function loadLevel(levelIndex) {
    // Validate level index
    if (levelIndex < 0 || levelIndex >= LEVELS.length) {
        console.error('Invalid level index:', levelIndex);
        return;
    }

    const level = LEVELS[levelIndex];
    game.currentLevel = levelIndex;

    // Set player position
    game.player.x = level.player.x;
    game.player.y = level.player.y;
    game.player.angle = 0;

    // Set goal position
    game.goal.x = level.goal.x;
    game.goal.y = level.goal.y;

    // Create enemies from level data
    game.enemies = level.enemies.map(enemyData => ({
        x: enemyData.x,
        y: enemyData.y,
        radius: enemyData.radius,
        speed: enemyData.speed,
        isFrozen: false,
    }));

    // Reset game state
    game.state = 'playing';

    // Update UI
    levelInfoEl.textContent = `${level.name} (${levelIndex + 1}/${LEVELS.length})`;
    gameStatusEl.textContent = level.description;
    gameStatusEl.style.color = 'hsl(45, 100%, 60%)';
}

/**
 * Restart the current level
 */
function restartLevel() {
    loadLevel(game.currentLevel);
}

/**
 * Load the next level
 */
function nextLevel() {
    if (game.currentLevel < game.totalLevels - 1) {
        loadLevel(game.currentLevel + 1);
    } else {
        // Already on last level, restart from beginning
        loadLevel(0);
    }
}

// ========================================
// DRAWING FUNCTIONS
// ========================================
// These functions handle all the visual rendering

/**
 * Draw the vision cone
 * This shows the player what they can see
 */
function drawVisionCone() {
    const p = game.player;

    ctx.save(); // Save current drawing state

    // Create a gradient for the cone (looks cooler!)
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.visionDistance);
    gradient.addColorStop(0, 'rgba(255, 230, 100, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 230, 100, 0)');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'rgba(255, 230, 100, 0.5)';
    ctx.lineWidth = 2;

    // Draw the cone as a triangle/arc
    ctx.beginPath();
    ctx.moveTo(p.x, p.y); // Start at player position

    // Calculate the two edges of the cone
    const halfAngle = p.visionAngle / 2;
    const leftAngle = p.angle - halfAngle;
    const rightAngle = p.angle + halfAngle;

    // Draw arc from left edge to right edge
    ctx.arc(
        p.x, p.y,                    // Center point
        p.visionDistance,            // Radius
        leftAngle,                   // Start angle
        rightAngle,                  // End angle
        false                        // Counterclockwise = false
    );

    ctx.lineTo(p.x, p.y); // Close the path back to center
    ctx.fill();
    ctx.stroke();

    ctx.restore(); // Restore drawing state
}

/**
 * Draw the player
 */
function drawPlayer() {
    const p = game.player;

    ctx.save();

    // Draw player circle
    ctx.fillStyle = 'hsl(200, 90%, 65%)';
    ctx.strokeStyle = 'hsl(200, 90%, 80%)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw facing direction indicator (a line showing where player looks)
    ctx.strokeStyle = 'hsl(200, 90%, 90%)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(
        p.x + Math.cos(p.angle) * p.radius * 1.5,
        p.y + Math.sin(p.angle) * p.radius * 1.5
    );
    ctx.stroke();

    ctx.restore();
}

/**
 * Draw all enemies
 */
function drawEnemies() {
    game.enemies.forEach(enemy => {
        ctx.save();

        // Different color based on frozen state
        if (enemy.isFrozen) {
            // Frozen: lighter, desaturated (like ice)
            ctx.fillStyle = 'hsl(0, 50%, 70%)';
            ctx.strokeStyle = 'hsl(200, 60%, 80%)';
        } else {
            // Moving: bright red (danger!)
            ctx.fillStyle = 'hsl(0, 85%, 60%)';
            ctx.strokeStyle = 'hsl(0, 85%, 75%)';
        }

        ctx.lineWidth = 2;

        // Draw enemy circle
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Add a pulsing effect for moving enemies
        if (!enemy.isFrozen) {
            const pulseSize = Math.sin(Date.now() / 200) * 3;
            ctx.strokeStyle = 'rgba(255, 100, 100, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius + pulseSize, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    });
}

/**
 * Draw the goal
 */
function drawGoal() {
    const g = game.goal;

    ctx.save();

    // Pulsing gradient effect
    const pulse = Math.sin(Date.now() / 500) * 5;
    const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.radius + pulse);
    gradient.addColorStop(0, 'hsl(140, 70%, 60%)');
    gradient.addColorStop(1, 'hsl(140, 70%, 40%)');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'hsl(140, 70%, 70%)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw a star pattern inside
    ctx.fillStyle = 'hsl(140, 70%, 80%)';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', g.x, g.y);

    ctx.restore();
}

/**
 * Clear the canvas
 */
function clearCanvas() {
    ctx.fillStyle = 'hsl(220, 18%, 15%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ========================================
// MAIN GAME LOOP
// ========================================
/**
 * This function runs every frame (about 60 times per second)
 * It updates game logic and redraws everything
 */
function gameLoop() {
    // 1. Clear the canvas
    clearCanvas();

    // 2. Update game logic (only if playing)
    if (game.state === 'playing') {
        updatePlayer();
        updateEnemies();
        checkGameConditions();
    }

    // 3. Draw everything (in order from back to front)
    drawVisionCone();  // Draw cone first (behind everything)
    drawGoal();        // Draw goal
    drawEnemies();     // Draw enemies
    drawPlayer();      // Draw player last (on top)

    // 4. Request next frame
    // This creates a loop - the function calls itself repeatedly
    requestAnimationFrame(gameLoop);
}

// ========================================
// START THE GAME
// ========================================
// This runs once when the page loads
loadLevel(0); // Load the first level
gameLoop();
