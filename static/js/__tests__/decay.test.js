import { applyDecay } from '../utils.js';
import { DECAY_ENABLED, DECAY_RATE, DECAY_THRESHOLD } from '../config.js';

describe('decay mechanics', () => {
  // Save original config values to restore after tests
  const originalDecayEnabled = DECAY_ENABLED;
  const originalDecayRate = DECAY_RATE;
  const originalDecayThreshold = DECAY_THRESHOLD;
  
  // Mock the config values for testing
  beforeEach(() => {
    // Ensure decay is enabled for tests
    global.DECAY_ENABLED = true;
    global.DECAY_RATE = 0.05;
    global.DECAY_THRESHOLD = 50;
  });
  
  // Restore original values after tests
  afterEach(() => {
    global.DECAY_ENABLED = originalDecayEnabled;
    global.DECAY_RATE = originalDecayRate;
    global.DECAY_THRESHOLD = originalDecayThreshold;
  });

  test('should not decay below threshold', () => {
    const entity = { score: DECAY_THRESHOLD };
    applyDecay(entity, 1000);
    expect(entity.score).toBe(DECAY_THRESHOLD);
  });

  test('should decay proportionally to time passed', () => {
    const entity = { score: 100 };
    const expectedDecayFactor = Math.sqrt(entity.score) / 10;
    const expectedDecayAmount = DECAY_RATE * expectedDecayFactor * 1; // 1 second
    
    applyDecay(entity, 1000); // 1 second
    
    expect(entity.score).toBeCloseTo(100 - expectedDecayAmount, 5);
  });

  test('should decay more for higher scores', () => {
    const smallEntity = { score: 100 };
    const largeEntity = { score: 400 };
    
    // Apply same time decay to both
    applyDecay(smallEntity, 1000);
    applyDecay(largeEntity, 1000);
    
    // Calculate expected decay
    const smallDecayFactor = Math.sqrt(100) / 10;
    const largeDecayFactor = Math.sqrt(400) / 10;
    
    // Verify larger entity decayed more
    expect(largeDecayFactor).toBeGreaterThan(smallDecayFactor);
    expect(100 - smallEntity.score).toBeLessThan(400 - largeEntity.score);
  });

  test('should not decay when disabled', () => {
    // Mock the DECAY_ENABLED value directly in the module
    const originalDecayEnabled = DECAY_ENABLED;
    Object.defineProperty(global, 'DECAY_ENABLED', {
      value: false,
      writable: true
    });
    
    const entity = { score: 100 };
    applyDecay(entity, 1000);
    
    // Restore original value
    Object.defineProperty(global, 'DECAY_ENABLED', {
      value: originalDecayEnabled,
      writable: true
    });
    
    expect(entity.score).toBe(100);
  });

  test('should handle very large time deltas gracefully', () => {
    const entity = { score: 200 };
    
    // Apply a very large time delta (10 seconds)
    applyDecay(entity, 10000);
    
    // Should not go below threshold
    expect(entity.score).toBeGreaterThanOrEqual(DECAY_THRESHOLD);
  });
});
