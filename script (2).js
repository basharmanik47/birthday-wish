// ⏰ এখানে জন্মদিনের সঠিক তারিখ ও সময় দিন
// ফরম্যাট: "Month DD, YYYY HH:MM:SS"
const targetDate = new Date("July 25, 2026 00:00:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // দিন, ঘণ্টা, মিনিট ও সেকেন্ড হিসাব
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // টাইমার স্ক্রিনে দেখানো
    document.getElementById("timer").innerHTML = 
        (days > 0 ? days + "d " : "") + hours + "h " + minutes + "m " + seconds + "s ";

    // কাউন্টডাউন শেষ হলে
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown-container").style.display = "none";
        document.getElementById("surprise-container").style.display = "block";
        startFireworks(); // আতশবাজি শুরু
    }
}, 1000);

// 🎁 গিফট বক্স খোলার ফাংশন
function openGift() {
    document.getElementById("gift").style.display = "none";
    document.getElementById("click-prompt").style.display = "none";
    document.getElementById("letter").style.display = "block";
}

// 🎆 আতশবাজি (Fireworks) লজিক
function startFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    
    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
    }

    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };

    Particle.prototype.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    };

    function spawnFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2);
        const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff9f1c'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    setInterval(spawnFirework, 800);

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(13, 27, 42, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
    }
    animate();
}