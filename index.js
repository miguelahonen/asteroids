const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw() {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  draw() {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  draw() {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}


xCoordinate = canvas.width / 2
yCoordinate  = canvas.height / 2

const player = new Player(xCoordinate, yCoordinate, 30, 'blue')


const projectiles = []
const enemies = []


// Rakas, sinä päivieni ilo ja aamujeni valo
//
// Mieleni matkustaa kohti pohjantähteä
// matkalla sinne sydämeni kaappaisi syliinsä aarteen
// voisinpa pakata reppuni, heti luoksesi lähteä
// joudun vielä jäämään, mutta onneksi muistan hymysi ihanan kaarteen
//
// Rakas, sinä päivien valo ja aamujeni ilo



function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4
    let x
    let y
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
      y = Math.random() * canvas.height
    }

    const color = 'green'
    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(new Enemy(x, y, radius, color, velocity))
    console.log(enemies)
  }, 1000)
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  projectiles.forEach((projectile) => {
    projectile.update()
  })

  enemies.forEach((enemy, index) => {
    enemy.update()

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x,
        projectile.y - enemy.y)
      if (dist - enemy.radius - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          enemies.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
        }, 0) //5823
      }
    })
  })
}

addEventListener('click', (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
  projectiles.push(new Projectile(canvas.width / 2,
    canvas.height /2,
    5,
    'red',
    velocity
  ))
})

animate()
spawnEnemies()
