const wireKey = global[Object.keys(global).find(key => /boom\d/.test(key))];
Bomb.CutTheWire(wireKey);