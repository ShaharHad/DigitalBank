const { execSync } = require('child_process');

try {
  console.log('\n🧹 Pruning Docker system...');
  execSync('sudo docker system prune -a --volumes=false -f', { stdio: 'inherit' });

  console.log('\n🔨 Rebuilding Docker containers with no cache...');
  execSync('sudo docker compose build --no-cache', { stdio: 'inherit' });

  console.log('\n🚀 Starting Docker containers...');
  execSync('sudo docker compose up', { stdio: 'inherit' });

} catch (error) {
  console.error('\n❌ Error during Docker commands:', error.message);
}

