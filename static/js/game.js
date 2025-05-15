import { gameState, mouse, keyboard } from './gameState.js';
import { initRenderer, resizeCanvas, drawGame, drawMinimap, updateLeaderboard } from './renderer.js';
import { updatePlayer, updateAI, initEntities, handlePlayerSplit } from './entities.js';
import { handleFoodCollisions, handlePlayerAICollisions, handleAIAICollisions, respawnEntities } from './collisions.js';
import { initUI } from './ui.js';

function setupInputHandlers() {
    const canvas = document.getElementById('gameCanvas');
    
    // Mouse movement
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Mouse click for splitting
    canvas.addEventListener('click', (e) => {
        handlePlayerSplit();
    });

    // Window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    // Keyboard events for boost
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            keyboard.space = true;
            handleBoostStart();
        }
    });
    
    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            keyboard.space = false;
            handleBoostEnd();
        }
    });
}

function checkCollisions() {
    handleFoodCollisions();
    handlePlayerAICollisions();
    handleAIAICollisions();
    respawnEntities();
}

function verifyGameState() {
    console.log('Verifying game state...');
    console.log('Player cells:', gameState.playerCells);
    console.log('AI players:', gameState.aiPlayers);
    console.log('Food count:', gameState.food.length);

    if (gameState.playerCells.length === 0) {
        console.error('No player cells found!');
    }
    if (gameState.aiPlayers.length === 0) {
        console.error('No AI players found!');
    }
    if (gameState.food.length === 0) {
        console.error('No food found!');
    }
}

function handleBoostStart() {
    // Only activate boost if not already active
    if (!gameState.boost.active) {
        gameState.boost.active = true;
        gameState.boost.lastUpdateTime = Date.now();
    }
}

function handleBoostEnd() {
    gameState.boost.active = false;
}

function updateBoost() {
    if (!gameState.boost.active) return;
    
    const now = Date.now();
    const deltaTime = (now - gameState.boost.lastUpdateTime) / 1000; // Convert to seconds
    gameState.boost.lastUpdateTime = now;
    
    // Apply mass loss to all player cells
    gameState.playerCells.forEach(cell => {
        // Calculate mass loss based on current score and time
        const massLoss = cell.score * BOOST_MASS_LOSS_RATE * deltaTime;
        
        // Reduce score, but don't go below minimum
        cell.score = Math.max(BOOST_MIN_SCORE, cell.score - massLoss);
        
        // Deactivate boost if any cell reaches minimum score
        if (cell.score <= BOOST_MIN_SCORE) {
            gameState.boost.active = false;
        }
    });
}

function gameLoop() {
    updateBoost();
    updatePlayer();
    updateAI();
    checkCollisions();
    updateLeaderboard();
    drawGame();
    drawMinimap();
    requestAnimationFrame(gameLoop);
}

async function initGame() {
    try {
        console.log('Initializing game...');
        
        // Get DOM elements
        const elements = {
            gameCanvas: document.getElementById('gameCanvas'),
            minimapCanvas: document.getElementById('minimap'),
            scoreElement: document.getElementById('score'),
            leaderboardContent: document.getElementById('leaderboard-content')
        };

        // Verify all elements are found
        Object.entries(elements).forEach(([key, element]) => {
            if (!element) {
                throw new Error(`Could not find element: ${key}`);
            }
        });

        console.log('DOM elements found');

        // Initialize game components in order
        initRenderer(elements);
        console.log('Renderer initialized');
        
        setupInputHandlers();
        console.log('Input handlers set up');
        
        initEntities();
        console.log('Entities initialized');

        initUI();
        console.log('UI initialized');

        // Verify game state
        verifyGameState();

        // Start game loop
        console.log('Starting game loop');
        gameLoop();
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

// Start the game when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}