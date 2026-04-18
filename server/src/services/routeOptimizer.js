/**
 * Anti-Gravity Route Optimization Service
 * 
 * Implements an A* (A-Star) search algorithm tailored for 3D aerial navigation.
 * Optimizes for the shortest path while factoring in energy efficiency (ascent costs)
 * and strictly avoiding designated restricted airspaces.
 */

class MinPriorityQueue {
  constructor() {
    this.values = [];
  }
  
  enqueue(node, priority) {
    this.values.push({ node, priority });
    this.sort();
  }
  
  dequeue() {
    return this.values.shift();
  }
  
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
  
  isEmpty() {
    return this.values.length === 0;
  }
}

/**
 * Calculates Euclidean distance in 3D space.
 */
function getDistance(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  const dz = nodeA.z - nodeB.z; // Altitude
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Checks if a point lies within any restricted spherical zone.
 */
function isRestricted(node, restrictedZones) {
  for (let zone of restrictedZones) {
    const dist = getDistance(node, zone.center);
    if (dist <= zone.radius) {
      return true; // Node is inside a restricted zone
    }
  }
  return false;
}

/**
 * Calculates the traversal cost between two nodes.
 * Ascending costs significantly more energy than maintaining altitude or descending.
 */
function calculateEnergyCost(current, neighbor) {
  const distance = getDistance(current, neighbor);
  const altitudeChange = neighbor.z - current.z;
  
  let energyMultiplier = 1.0;
  
  if (altitudeChange > 0) {
    // Ascending against gravity uses more energy
    energyMultiplier = 1.5 + (0.01 * altitudeChange); 
  } else if (altitudeChange < 0) {
    // Descending recovers some energy / costs less
    energyMultiplier = 0.8; 
  }
  
  // Total cost is distance factored by the energy required
  return distance * energyMultiplier; 
}

/**
 * A* Heuristic Function
 * Estimates the cheapest path from node to goal using straight-line 3D distance.
 */
function heuristic(node, goal) {
  return getDistance(node, goal); // Admissible Euclidean heuristic
}

/**
 * Core A* Optimization Algorithm
 * 
 * @param {string} startId - Origin node ID
 * @param {string} goalId - Destination node ID
 * @param {Map} graph - Adjacency map of nodes {id: {x, y, z, pointId, neighbors: []}}
 * @param {Array} restrictedZones - Array of { center: {x,y,z}, radius: number }
 * @returns {Array|null} Array of node IDs forming the optimal path, or null if no path found.
 */
export function optimizeRoute(startId, goalId, graph, restrictedZones = []) {
  if (!graph.has(startId) || !graph.has(goalId)) return null;

  const openSet = new MinPriorityQueue();
  openSet.enqueue(startId, 0);
  
  // Maps to track the best path and costs
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();
  
  // Initialize scores with Infinity
  for (let [id] of graph) {
    gScore.set(id, Infinity);
    fScore.set(id, Infinity);
  }
  
  gScore.set(startId, 0);
  fScore.set(startId, heuristic(graph.get(startId), graph.get(goalId)));
  
  while (!openSet.isEmpty()) {
    const currentQueueItem = openSet.dequeue();
    const currentId = currentQueueItem.node;
    
    // Path Found! Reconstruct and return it.
    if (currentId === goalId) {
      const path = [currentId];
      let curr = currentId;
      while (cameFrom.has(curr)) {
        curr = cameFrom.get(curr);
        path.unshift(curr);
      }
      return path;
    }
    
    const currentNode = graph.get(currentId);
    
    // For each neighboring node
    for (const neighborId of currentNode.neighbors) {
      const neighborNode = graph.get(neighborId);
      
      // Strict constraint: Do not evaluate nodes inside restricted airspace
      if (isRestricted(neighborNode, restrictedZones)) continue;
      
      const tentativeGScore = gScore.get(currentId) + calculateEnergyCost(currentNode, neighborNode);
      
      if (tentativeGScore < gScore.get(neighborId)) {
        // This path to neighbor is better than any previous one
        cameFrom.set(neighborId, currentId);
        gScore.set(neighborId, tentativeGScore);
        
        const fCost = tentativeGScore + heuristic(neighborNode, graph.get(goalId));
        fScore.set(neighborId, fCost);
        
        // Add to priority queue if not already evaluated at a lower cost
        openSet.enqueue(neighborId, fCost);
      }
    }
  }
  
  // Open set is empty but goal was never reached (all paths blocked)
  return null;
}
