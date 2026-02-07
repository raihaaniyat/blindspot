# 🎨 Blindspot - Design Expansion Document

## 🎭 The Core Fantasy

**"You are a careful observer navigating a world where your attention is your only weapon."**

Moment to moment, the player feels like a **watchful guardian** constantly scanning their surroundings. Every turn of the head is a calculated risk. You experience the tension of knowing that the moment you look away, danger creeps closer. It's the feeling of being in a crowded room and trying to keep track of everyone at once — impossible, yet necessary. The game creates a rhythm: *look, move, check, breathe*. You're not powerful — you're *aware*. Victory comes not from defeating enemies, but from **outsmarting the limits of your own perception**.

---

## 👾 Enemy Type Design

All enemies follow the **"freeze when seen" rule**, but each creates different strategic challenges.

### 1. **The Stalker** (Basic Enemy - Already Implemented)
**Behavior:** Moves directly toward player when not observed.

**Visual Design:**
- Red circle with subtle pulsing when moving
- Ice-blue tint when frozen
- Leaves a faint trail showing recent path

**Strategy:**
- Forces constant vigilance
- Teaches the basic mechanic
- Predictable but relentless

**Player Decision:**
- "Do I keep watching this one, or check behind me?"

---

### 2. **The Dasher** (Speed Variant)
**Behavior:** Moves in quick bursts when unseen, but must "charge up" between dashes.

**Visual Design:**
- Orange/yellow color
- Crouches slightly before dashing (visual telegraph)
- Leaves motion blur trail during dash
- Glows brighter when charged

**Unique Mechanic:**
- Moves 3x faster than Stalker
- Can only move for 0.5 seconds at a time
- Must wait 2 seconds between dashes
- Makes distinctive "wind-up" sound before dashing

**Strategy:**
- Creates urgency — you can't afford to look away for long
- Punishes slow, methodical players
- Rewards quick glances and timing

**Player Decision:**
- "Do I freeze it before it charges, or deal with other threats first?"

**Why It Improves Gameplay:**
- Adds time pressure without a timer
- Forces faster decision-making
- Creates moments of panic (hearing the charge sound behind you)

**Common Beginner Mistakes:**
- ❌ Making dash too fast (player can't react)
- ❌ No visual/audio telegraph (feels unfair)
- ❌ Dash cooldown too short (becomes impossible)

---

### 3. **The Wanderer** (Patrol Variant)
**Behavior:** Follows a patrol path when unseen, but freezes and "remembers" player position when seen.

**Visual Design:**
- Purple/violet color
- Dotted line showing patrol path
- Question mark appears above head when it spots player
- Path glows when it's deviating to investigate

**Unique Mechanic:**
- Patrols between waypoints when not observed
- When frozen by player vision, it "locks onto" player's position
- After unfreezing, moves toward last seen position for 3 seconds
- Then resumes patrol

**Strategy:**
- Predictable when ignored
- Dangerous when engaged
- Creates "safe zones" along patrol route
- Teaches spatial planning

**Player Decision:**
- "Do I freeze it and reveal my position, or sneak past while it's looking away?"

**Why It Improves Gameplay:**
- Adds spatial puzzle element
- Rewards observation and patience
- Creates risk/reward for engagement

**Common Beginner Mistakes:**
- ❌ Patrol path too complex (hard to predict)
- ❌ No clear visual of patrol route
- ❌ "Memory" lasts too long (feels cheap)

---

### 4. **The Mimic** (Advanced - Deceptive Variant)
**Behavior:** Pretends to be frozen even when not in vision cone, then moves when player commits to another direction.

**Visual Design:**
- Teal/cyan color
- Subtle "breathing" animation even when frozen
- Eyes that track player (creepy but not horror)
- Slight shimmer when actually frozen vs. faking

**Unique Mechanic:**
- Has 30% chance to "fake freeze" when entering vision cone
- Stays still for 1-2 seconds after leaving vision
- Then moves quickly toward player
- Actually freezes when player looks back (can't fake twice in a row)

**Strategy:**
- Punishes assumption
- Rewards double-checking
- Creates paranoia without jump scares
- Forces players to verify threats

**Player Decision:**
- "Is it really frozen, or is it waiting for me to turn away?"

**Why It Improves Gameplay:**
- Adds psychological layer
- Prevents autopilot gameplay
- Creates memorable "gotcha" moments that feel fair

**Common Beginner Mistakes:**
- ❌ Fake freeze too often (becomes frustrating)
- ❌ No visual tell (feels random/unfair)
- ❌ Can fake multiple times in a row (impossible to counter)

---

## 👁️ Dynamic Vision System

### Core Principle: **Vision is a resource you manage, not a constant.**

### 1. **Movement-Based Vision**

**Mechanic:** Vision cone narrows when moving, widens when standing still.

**Implementation:**
```javascript
// Standing still
if (playerVelocity === 0) {
    visionAngle = 90°;  // Wide, relaxed vision
    visionDistance = 300; // Can see far
} else {
    visionAngle = 60°;  // Focused, tunnel vision
    visionDistance = 250; // Slightly shorter
}
```

**Visual Feedback:**
- Vision cone smoothly animates between states
- Cone becomes more transparent when narrow
- Subtle vignette effect at screen edges when moving

**Why It Improves Gameplay:**
- Creates stop-and-look rhythm
- Rewards careful movement
- Adds cost to rushing
- Makes standing still a strategic choice

**Player Decision:**
- "Do I run to the goal and risk tunnel vision, or move slowly and maintain awareness?"

**Common Beginner Mistakes:**
- ❌ Transition too abrupt (jarring)
- ❌ Difference too extreme (moving becomes useless)
- ❌ No visual feedback (player doesn't understand why they got caught)

---

### 2. **Light Zones**

**Mechanic:** Areas of the level have different lighting that affects vision.

**Types:**
- **Bright Zones** (yellow tint): Vision distance +50%, cone angle +15°
- **Normal Zones** (default): Standard vision
- **Dim Zones** (blue tint): Vision distance -30%, cone angle -10°
- **Dark Zones** (very dark blue): Vision distance -50%, but enemies glow slightly

**Visual Design:**
- Colored overlays on floor
- Ambient particles (dust in light, mist in dark)
- Player's vision cone changes opacity based on zone
- Enemies have subtle outline in dark zones

**Why It Improves Gameplay:**
- Creates safe and dangerous areas
- Adds spatial strategy
- Makes level layout matter
- Allows difficulty variation within a level

**Player Decision:**
- "Do I take the dark shortcut or the longer lit path?"

**Common Beginner Mistakes:**
- ❌ Dark zones too punishing (can't see anything)
- ❌ No compensation in dark (enemies should be slightly visible)
- ❌ Zone transitions unclear (player doesn't know when they enter)

---

### 3. **Focus Mode** (Advanced)

**Mechanic:** Hold SHIFT to narrow vision cone but see much farther.

**Stats:**
- Vision angle: 30° (very narrow)
- Vision distance: 500 (double normal)
- Movement speed: 50% (forced slow walk)

**Visual Design:**
- Screen edges darken (tunnel vision effect)
- Vision cone becomes laser-focused beam
- Enemies in focus appear highlighted
- Subtle heartbeat sound (tension, not horror)

**Why It Improves Gameplay:**
- Gives player active ability
- Creates risk/reward moment
- Useful for checking distant threats
- Adds skill expression

**Player Decision:**
- "Do I focus to check that distant enemy, leaving myself vulnerable to close threats?"

**Common Beginner Mistakes:**
- ❌ No movement penalty (becomes default state)
- ❌ Too narrow (unusable)
- ❌ No audio/visual feedback (unclear when active)

---

## 🔊 Non-Horror Sound Design

### Philosophy: **Tension through rhythm and information, not shock.**

### 1. **Ambient Soundscape**
- **Soft wind** - Creates atmosphere without being ominous
- **Distant footsteps** - Yours, echoing (reinforces isolation)
- **Gentle hum** - Low frequency, like a building's HVAC
- **Occasional drips** - Sparse, rhythmic (not creepy cave sounds)

**Purpose:** Creates presence without dread.

---

### 2. **Enemy Audio Cues**

**Stalker:**
- **Moving:** Soft shuffling, like fabric on floor
- **Freezing:** Quick "tink" like ice forming
- **Close proximity:** Breathing (calm, not raspy/scary)

**Dasher:**
- **Charging:** Rising pitch "whooooo" (like wind building)
- **Dashing:** Quick "whoosh" (motion, not aggression)
- **Cooldown:** Soft exhale

**Wanderer:**
- **Patrolling:** Rhythmic footsteps (predictable)
- **Spotting player:** Curious "hmm?" (question, not alarm)
- **Investigating:** Faster footsteps

**Mimic:**
- **Fake freezing:** Almost silent (that's the trick)
- **Actually frozen:** Very subtle "click"
- **Moving after fake:** Slightly louder shuffle (tells you it fooled you)

**Purpose:** Every sound is **information**, not fear.

---

### 3. **Player Feedback Sounds**

**Movement:**
- Light footsteps (you're trying to be quiet)
- Different sounds for different surfaces (optional)

**Vision Cone:**
- Subtle "ping" when enemy enters cone
- Soft "release" sound when enemy leaves cone
- No sound for empty cone (silence = safe)

**State Changes:**
- **Entering light zone:** Gentle chime (positive)
- **Entering dark zone:** Low tone (caution, not danger)
- **Focus mode activated:** Breath in (concentration)
- **Focus mode deactivated:** Breath out (release)

**Purpose:** Reinforces game state without narration.

---

### 4. **Music Design**

**Approach:** Adaptive, not reactive.

**Safe State (No nearby enemies):**
- Minimal piano melody
- Long, sustained notes
- Lots of space between notes
- Tempo: 60 BPM (calm heartbeat)

**Tension State (Enemies nearby but not close):**
- Add subtle strings
- Slightly faster tempo: 80 BPM
- More notes, less space
- Still melodic, not chaotic

**Danger State (Enemy very close):**
- Strings become more prominent
- Tempo: 100 BPM (elevated heartbeat)
- Add subtle percussion (not drums, more like ticking)
- Melody fragments (creates unease)

**Chase State (Enemy about to catch you):**
- Full instrumentation
- Tempo: 120 BPM
- Driving rhythm
- Still musical, not noise

**Victory:**
- Return to calm melody
- Add warm pads
- Resolve musical tension

**Purpose:** Music reflects danger level, helping player gauge threat.

---

### 5. **Sound Design Principles**

✅ **DO:**
- Use pitch to convey information (high = attention, low = caution)
- Make sounds diegetic when possible (sounds exist in the world)
- Layer sounds (ambient + enemy + player = rich soundscape)
- Use silence as a tool (absence of sound = safety)

❌ **DON'T:**
- Use sudden loud noises (jump scares)
- Make enemies sound monstrous (growls, roars)
- Use dissonant/atonal music (creates horror vibe)
- Overuse stingers (musical "stabs")

---

## 🎯 Level Objectives Beyond "Reach Exit"

### 1. **The Collector** (Puzzle Focus)

**Objective:** Collect 3 keys scattered around the level before reaching the exit.

**Design:**
- Keys are in exposed positions
- Each key is guarded by different enemy type
- Collecting a key makes a sound (alerts nearby enemies)
- Exit only opens when all keys collected

**Gameplay Loop:**
1. Scout the level (where are keys and enemies?)
2. Plan route (which key first?)
3. Execute (freeze enemies, grab key, escape)
4. Adapt (enemies now know your position)

**Why It Improves Gameplay:**
- Forces exploration
- Can't just run to exit
- Multiple risk/reward moments
- Teaches level reading

**Player Decision:**
- "Which key is safest to get first?"
- "Do I grab this key now, or wait for enemies to move?"

**Common Beginner Mistakes:**
- ❌ Too many collectibles (tedious)
- ❌ Keys in impossible positions (frustrating)
- ❌ No indication of key locations (aimless wandering)

---

### 2. **The Escort** (Awareness Challenge)

**Objective:** Guide a slow-moving NPC from start to goal without them being touched.

**Design:**
- NPC follows player at 50% speed
- NPC has no vision cone (relies on you)
- Enemies target NPC if they get close
- NPC stops if you get too far ahead

**Gameplay Loop:**
1. Move forward slowly
2. Check that NPC is following
3. Freeze enemies before NPC reaches them
4. Can't rush ahead (NPC is slow)

**Why It Improves Gameplay:**
- Removes "run past everything" strategy
- Forces protective play style
- Creates new failure state
- Tests patience and planning

**Player Decision:**
- "Do I clear the path ahead, or stay close to protect the NPC?"
- "Can I leave the NPC briefly to scout?"

**Common Beginner Mistakes:**
- ❌ NPC too slow (boring)
- ❌ NPC too fast (defeats purpose)
- ❌ No visual tether showing max distance
- ❌ Enemies can one-shot NPC (too punishing)

---

### 3. **The Blackout** (Perception Challenge)

**Objective:** Reach the exit, but the lights periodically turn off.

**Design:**
- Lights are on for 10 seconds
- Lights turn off for 5 seconds
- During blackout:
  - Your vision cone disappears
  - Enemies glow faintly (you can see them, but not freeze them)
  - You can still move
- Timer shown on screen

**Gameplay Loop:**
1. Use light phase to freeze enemies and move
2. Prepare for blackout (position yourself safely)
3. During blackout, navigate by enemy glow
4. Resume freezing when lights return

**Why It Improves Gameplay:**
- Adds time pressure without constant timer
- Creates rhythm (light/dark cycles)
- Forces memorization (where were enemies?)
- Tests spatial awareness

**Player Decision:**
- "Do I make progress during light, or just freeze enemies?"
- "Where should I be when the lights go out?"

**Common Beginner Mistakes:**
- ❌ Blackout too long (frustrating)
- ❌ No warning before blackout (unfair)
- ❌ Can't see anything in dark (disorienting)
- ❌ Enemies move during blackout (impossible)

---

## 🛠️ Implementation Guide: The Dasher Enemy

Let's implement the **Dasher** enemy type step-by-step.

### Why Start With The Dasher?
- Builds on existing enemy code
- Introduces timing mechanics
- Teaches state machines
- Adds immediate gameplay variety

---

### Step 1: Understanding the Dasher's States

The Dasher has 3 states:
1. **FROZEN** - Player is looking at it
2. **CHARGING** - Building up energy to dash (2 seconds)
3. **DASHING** - Moving quickly toward player (0.5 seconds)

```
State Machine:
FROZEN → (player looks away) → CHARGING
CHARGING → (2 seconds pass) → DASHING
DASHING → (0.5 seconds pass) → CHARGING
CHARGING/DASHING → (player looks at it) → FROZEN
```

---

### Step 2: Add Dasher Data Structure

**In `game.js`, modify the enemies array:**

```javascript
// OLD (Stalker only):
enemies: [
    {
        x: 400,
        y: 200,
        radius: 12,
        speed: 1.5,
        isFrozen: false,
    },
]

// NEW (Add type and state):
enemies: [
    // Existing Stalker
    {
        type: 'stalker',
        x: 400,
        y: 200,
        radius: 12,
        speed: 1.5,
        isFrozen: false,
    },
    // New Dasher
    {
        type: 'dasher',
        x: 400,
        y: 400,
        radius: 12,
        baseSpeed: 1.5,      // Normal speed
        dashSpeed: 4.5,      // 3x faster when dashing
        currentSpeed: 1.5,   // Current actual speed
        isFrozen: false,
        state: 'charging',   // 'frozen', 'charging', or 'dashing'
        stateTimer: 0,       // Tracks time in current state
        chargeTime: 2000,    // 2 seconds to charge (in milliseconds)
        dashTime: 500,       // 0.5 seconds dash duration
    },
],
```

**Why this structure?**
- `type` lets us handle different enemies differently
- `state` tracks what the Dasher is doing
- `stateTimer` counts time in current state
- Separate speeds for normal vs. dash

---

### Step 3: Modify `updateEnemies()` Function

**Replace the simple enemy update with type-specific logic:**

```javascript
function updateEnemies() {
    const currentTime = Date.now(); // Get current time for timers
    
    game.enemies.forEach(enemy => {
        // Check if enemy is in vision cone
        const inVisionCone = isInVisionCone(enemy.x, enemy.y);
        
        // Handle different enemy types
        if (enemy.type === 'stalker') {
            updateStalker(enemy, inVisionCone);
        } else if (enemy.type === 'dasher') {
            updateDasher(enemy, inVisionCone, currentTime);
        }
    });
}
```

**Why separate update functions?**
- Keeps code organized
- Easy to add new enemy types
- Each type has unique logic

---

### Step 4: Create `updateStalker()` Function

**Extract existing logic into its own function:**

```javascript
function updateStalker(enemy, inVisionCone) {
    // This is the original enemy behavior
    enemy.isFrozen = inVisionCone;
    
    if (!enemy.isFrozen) {
        // Move toward player
        const angleToPlayer = angleBetween(
            enemy.x, enemy.y,
            game.player.x, game.player.y
        );
        enemy.x += Math.cos(angleToPlayer) * enemy.speed;
        enemy.y += Math.sin(angleToPlayer) * enemy.speed;
    }
}
```

---

### Step 5: Create `updateDasher()` Function

**This is the new logic for the Dasher:**

```javascript
function updateDasher(enemy, inVisionCone, currentTime) {
    // If player is looking at Dasher, freeze it
    if (inVisionCone) {
        enemy.state = 'frozen';
        enemy.isFrozen = true;
        enemy.stateTimer = 0; // Reset timer
        return; // Don't do anything else
    }
    
    // Player is NOT looking - Dasher can act
    enemy.isFrozen = false;
    
    // Update state timer
    if (enemy.stateTimer === 0) {
        enemy.stateTimer = currentTime; // Start timer
    }
    const timeInState = currentTime - enemy.stateTimer;
    
    // State machine logic
    if (enemy.state === 'charging') {
        // Charging up for a dash
        if (timeInState >= enemy.chargeTime) {
            // Charge complete! Start dashing
            enemy.state = 'dashing';
            enemy.stateTimer = currentTime; // Reset timer for dash
            enemy.currentSpeed = enemy.dashSpeed; // Speed up!
        }
        // While charging, don't move
        
    } else if (enemy.state === 'dashing') {
        // Currently dashing!
        if (timeInState >= enemy.dashTime) {
            // Dash complete! Start charging again
            enemy.state = 'charging';
            enemy.stateTimer = currentTime; // Reset timer
            enemy.currentSpeed = enemy.baseSpeed; // Back to normal speed
        }
        
        // Move toward player at dash speed
        const angleToPlayer = angleBetween(
            enemy.x, enemy.y,
            game.player.x, game.player.y
        );
        enemy.x += Math.cos(angleToPlayer) * enemy.currentSpeed;
        enemy.y += Math.sin(angleToPlayer) * enemy.currentSpeed;
    }
}
```

**What's happening here?**
1. If seen → freeze (same as Stalker)
2. If not seen → check state:
   - **Charging:** Wait 2 seconds, then switch to dashing
   - **Dashing:** Move fast for 0.5 seconds, then switch back to charging

---

### Step 6: Update `drawEnemies()` for Visual Distinction

**Modify the drawing function to show different enemy types:**

```javascript
function drawEnemies() {
    game.enemies.forEach(enemy => {
        ctx.save();
        
        // Choose color based on type and state
        let fillColor, strokeColor;
        
        if (enemy.type === 'stalker') {
            // Original red enemy
            if (enemy.isFrozen) {
                fillColor = 'hsl(0, 50%, 70%)';
                strokeColor = 'hsl(200, 60%, 80%)';
            } else {
                fillColor = 'hsl(0, 85%, 60%)';
                strokeColor = 'hsl(0, 85%, 75%)';
            }
        } else if (enemy.type === 'dasher') {
            // Orange/yellow enemy
            if (enemy.isFrozen) {
                fillColor = 'hsl(30, 50%, 70%)';
                strokeColor = 'hsl(200, 60%, 80%)';
            } else if (enemy.state === 'charging') {
                // Pulsing orange while charging
                const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
                fillColor = `hsl(30, 100%, ${50 * pulse}%)`;
                strokeColor = 'hsl(30, 100%, 70%)';
            } else if (enemy.state === 'dashing') {
                // Bright yellow while dashing
                fillColor = 'hsl(50, 100%, 60%)';
                strokeColor = 'hsl(50, 100%, 80%)';
            }
        }
        
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        
        // Draw enemy circle
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add pulsing effect for moving enemies
        if (!enemy.isFrozen) {
            const pulseSize = Math.sin(Date.now() / 200) * 3;
            ctx.strokeStyle = enemy.type === 'dasher' 
                ? 'rgba(255, 200, 100, 0.4)' 
                : 'rgba(255, 100, 100, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius + pulseSize, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Special effect: Show charge indicator for Dasher
        if (enemy.type === 'dasher' && enemy.state === 'charging' && !enemy.isFrozen) {
            const chargePercent = (Date.now() - enemy.stateTimer) / enemy.chargeTime;
            const chargeArc = chargePercent * Math.PI * 2;
            
            ctx.strokeStyle = 'hsl(50, 100%, 70%)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius + 5, -Math.PI/2, -Math.PI/2 + chargeArc);
            ctx.stroke();
        }
        
        ctx.restore();
    });
}
```

**Visual feedback:**
- **Stalker:** Red (original)
- **Dasher charging:** Pulsing orange + circular charge indicator
- **Dasher dashing:** Bright yellow + motion blur

---

### Step 7: Test and Balance

**Testing checklist:**
1. ✅ Does Dasher freeze when looked at?
2. ✅ Does it charge for 2 seconds when not seen?
3. ✅ Does it dash for 0.5 seconds after charging?
4. ✅ Does it return to charging after dash?
5. ✅ Is the charge indicator visible and clear?
6. ✅ Can you tell the difference between Stalker and Dasher?

**Balance adjustments:**
- If too easy: Reduce charge time to 1.5 seconds
- If too hard: Increase charge time to 2.5 seconds
- If dash too fast: Reduce dashSpeed to 3.5
- If dash too slow: Increase dashSpeed to 5.0

---

### Step 8: Add Sound (Optional Enhancement)

**Add audio cues for better feedback:**

```javascript
// At the top of game.js, create audio objects
const sounds = {
    dasherCharge: new Audio(), // You'll need to add actual sound files
    dasherDash: new Audio(),
};

// In updateDasher(), add sound triggers:
if (enemy.state === 'charging') {
    if (timeInState >= enemy.chargeTime) {
        // About to dash!
        sounds.dasherDash.play(); // Play dash sound
        enemy.state = 'dashing';
        // ... rest of code
    }
}
```

---

## 🎓 Key Takeaways

### Design Principles Applied:
1. **Clarity over complexity** - Each enemy has one clear behavior
2. **Fair challenge** - Visual and audio telegraphs for all threats
3. **Player agency** - Every mechanic creates meaningful choices
4. **Tension without horror** - Atmosphere through rhythm, not shock

### Common Beginner Mistakes to Avoid:
- ❌ Adding too many mechanics at once
- ❌ No visual feedback for game state
- ❌ Mechanics that feel random or unfair
- ❌ Forgetting to playtest with fresh eyes

### Next Steps:
1. Implement the Dasher (follow guide above)
2. Playtest extensively
3. Adjust timing based on feel
4. Add one more enemy type
5. Design levels that showcase each enemy's unique challenge

---

**Remember:** Great game design is iterative. Implement, test, adjust, repeat. Every mechanic should answer the question: "Does this make the player's decisions more interesting?"

Good luck, and have fun designing! 🎮
