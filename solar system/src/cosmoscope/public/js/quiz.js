// DOM Elements
const welcomeScreen = document.getElementById('welcome');
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('start-btn');
const playerGreeting = document.getElementById('player-greeting');
const question = document.getElementById('question');
const choices = document.getElementById('answer-buttons');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const explanation = document.getElementById('explanation');
const finalScore = document.getElementById('finalScore');
const difficultyCompleted = document.getElementById('difficulty-completed');
const achievementBadge = document.getElementById('achievement-badge');
const achievementText = document.getElementById('achievement-text');
const highScoresList = document.getElementById('highScoresList');
const questionImage = document.getElementById('question-image');

// Game constants
const MAX_HIGH_SCORES = 10;
const POINTS_PER_QUESTION = 10;
const MAX_QUESTIONS = 10;
const TOTAL_LEVELS = 3;
const LEVEL_NAMES = {
    easy: 'Easy',
    moderate: 'Moderate',
    hard: 'Hard'
};
const DIFFICULTY_MULTIPLIERS = {
    easy: 1,
    moderate: 1.5,
    hard: 2
};
const TIME_BONUS_THRESHOLD = 5; // seconds
const COMBO_BONUS = 2;

// Game variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let totalScore = 0;
let questionCounter = 0;
let availableQuestions = [];
let playerName = '';
let currentDifficulty = 'easy';
let comboStreak = 0;
let maxCombo = 0;
let currentLevel = 1;
let startingLevel = 'easy';
let usedImages = new Set();
let preloadedImages = new Map();

// Space-themed background images with consistent sizing parameters
const spaceImages = [
    "quiz images/1.png",
    "quiz images/2.jpeg",
    "quiz images/3.jpeg",
    "quiz images/4.jpeg",
    "quiz images/5.jpeg",
    "quiz images/6.jpeg",
    "quiz images/7.jpg",
    "quiz images/8.jpg",
    "quiz images/9.jpg",
    "quiz images/10.jpg"
  ,
  
].map(url => `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80`);

// Preload all images
function preloadImages() {
    spaceImages.forEach(src => {
        const img = new Image();
        img.src = src;
        preloadedImages.set(src, img);
    });
}

function getRandomImage() {
    // If all images have been used, reset the used images set
    if (usedImages.size === spaceImages.length) {
        usedImages.clear();
    }

    // Get available images (ones that haven't been used yet)
    const availableImages = spaceImages.filter(img => !usedImages.has(img));
    
    // Select a random image from available ones
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    
    // Mark this image as used
    usedImages.add(selectedImage);
    
    return selectedImage;
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('maxCombo', maxCombo);
        return endGame();
    }

    questionCounter++;
    updateProgressBar();
    questionStartTime = Date.now();

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    availableQuestions.splice(questionIndex, 1);

    // Update question and image simultaneously
    const newImage = getRandomImage();
    questionImage.style.opacity = '0';
    
    setTimeout(() => {
        question.innerText = currentQuestion.question;
        questionImage.src = newImage;
        questionImage.style.opacity = '1';
    }, 150);

    // Clear previous choices
    choices.innerHTML = '';

    // Create new choice buttons
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.dataset.number = index;
        choices.appendChild(button);
    });

    acceptingAnswers = true;
    document.getElementById('feedback').classList.remove('correct', 'incorrect');
    document.getElementById('feedback').classList.add('hide');
    document.getElementById('next-btn').classList.add('hide');
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Reset score only when starting fresh
    totalScore = 0;
    localStorage.setItem('totalScore', '0');
    scoreText.innerText = '0';
    
    // Welcome screen logic
    playerNameInput.addEventListener('input', () => {
        startBtn.disabled = !playerNameInput.value.trim();
    });

    // Add quit game button functionality
    document.getElementById('quit-game').addEventListener('click', () => {
        document.getElementById('quit-dialog').classList.remove('hide');
    });

    // Quit confirmation dialog
    document.getElementById('confirm-quit').addEventListener('click', () => {
        document.getElementById('quit-dialog').classList.add('hide');
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        showScreen('home');
    });

    document.getElementById('cancel-quit').addEventListener('click', () => {
        document.getElementById('quit-dialog').classList.add('hide');
    });

    startBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        console.log('Player name set to:', playerName);
        playerGreeting.textContent = playerName;
        showScreen('home');
    });

    // Go Home button in Mission Records
    document.getElementById('welcomeBtn').addEventListener('click', () => {
        playerNameInput.value = '';
        startBtn.disabled = true;
        showScreen('welcome');
    });

    // Preload images when the game starts
    preloadImages();

    // Difficulty selection
    document.getElementById('easy-btn').addEventListener('click', () => {
        startingLevel = 'easy';
        currentDifficulty = 'easy';
        currentLevel = 1;
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        startGame();
    });

    document.getElementById('medium-btn').addEventListener('click', () => {
        startingLevel = 'moderate';
        currentDifficulty = 'moderate';
        currentLevel = 2;
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        startGame();
    });

    document.getElementById('hard-btn').addEventListener('click', () => {
        startingLevel = 'hard';
        currentDifficulty = 'hard';
        currentLevel = 3;
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        startGame();
    });

    // Next level and view score buttons
    document.getElementById('nextLevel').addEventListener('click', () => {
        // Keep the current score when moving to next level
        const currentTotalScore = totalScore;
        
        if (currentDifficulty === 'easy') {
            currentLevel = 2;
            currentDifficulty = 'moderate';
        } else if (currentDifficulty === 'moderate') {
            currentLevel = 3;
            currentDifficulty = 'hard';
        }
        
        // Reset game state for next level
        questionCounter = 0;
        score = 0;
        comboStreak = 0;
        totalScore = currentTotalScore;
        localStorage.setItem('totalScore', totalScore.toString());
        scoreText.innerText = totalScore;
        
        startGame();
    });

    document.getElementById('viewScore').addEventListener('click', () => {
        console.log('Viewing high scores');
        console.log('Current high scores:', JSON.parse(localStorage.getItem('highScores')));
        showScreen('highscores');
        showHighScores();
    });

    // Navigation buttons
    document.getElementById('highscore-btn').addEventListener('click', () => {
        console.log('Viewing high scores from home');
        console.log('Current high scores:', JSON.parse(localStorage.getItem('highScores')));
        showScreen('highscores');
        showHighScores();
    });

    document.getElementById('homeBtn').addEventListener('click', () => showScreen('home'));
    document.getElementById('playAgain').addEventListener('click', () => {
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        showScreen('home');
    });
    document.getElementById('goHome').addEventListener('click', () => {
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
        scoreText.innerText = '0';
        playerName = ''; // Reset player name when going home
        playerNameInput.value = ''; // Clear the name input
        showScreen('welcome'); // Show the welcome screen instead of home
    });

    // Answer selection
    choices.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn')) return;
        selectAnswer(e);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (!acceptingAnswers) {
            getNewQuestion();
        }
    });

    // Other event listeners...
});

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hide');
    });
    document.getElementById(screenName).classList.remove('hide');
}

function startGame() {
    questionCounter = 0;
    comboStreak = 0;
    maxCombo = 0;
    score = 0;
    
    // Only reset totalScore when starting a new game
    if (currentLevel === 1 || startingLevel !== 'easy') {
        totalScore = 0;
        localStorage.setItem('totalScore', '0');
    } else {
        // Load existing score for continuing levels
        totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
    }
    
    scoreText.innerText = totalScore;
    availableQuestions = [...getQuestionsByDifficulty()];
    acceptingAnswers = true;
    
    updateProgressBar();
    showScreen('game');
    getNewQuestion();
}

function getQuestionsByDifficulty() {
    switch(currentDifficulty) {
        case 'moderate':
            return moderateQuestions;
        case 'hard':
            return hardQuestions;
        default:
            return easyQuestions;
    }
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (questionCounter / MAX_QUESTIONS) * 100;
    progressBar.style.width = `${progress}%`;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
}

function calculateScore() {
    return POINTS_PER_QUESTION;
}

function selectAnswer(e) {
    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;
    
    const isCorrect = selectedAnswer == currentQuestion.correctAnswer;
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');

    if (isCorrect) {
        comboStreak++;
        maxCombo = Math.max(maxCombo, comboStreak);
        const earnedPoints = calculateScore();
        incrementScore(earnedPoints);
        selectedChoice.classList.add('correct');
        feedbackText.innerHTML = `
            <div>Excellent! 🌟 +${earnedPoints} points</div>
            ${comboStreak > 1 ? `<div>Combo Streak: ${comboStreak}! 🔥</div>` : ''}
            <div>${currentQuestion.explanation}</div>
        `;
    } else {
        comboStreak = 0;
        selectedChoice.classList.add('incorrect');
        const correctAnswerText = currentQuestion.choices[currentQuestion.correctAnswer];
        feedbackText.innerHTML = `
            <div>Incorrect ❌</div>
            <div class="correct-answer-text">
                Your answer: ${currentQuestion.choices[selectedAnswer]}<br>
                Correct answer: ${correctAnswerText}
            </div>
            <div>${currentQuestion.explanation}</div>
        `;
    }

    feedback.classList.remove('hide');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    nextButton.classList.remove('hide');
}

function incrementScore(num) {
    score += num;
    totalScore += num;
    scoreText.innerText = totalScore;
    localStorage.setItem('totalScore', totalScore.toString());
}

function endGame() {
    const levelComplete = document.getElementById('level-complete');
    const finalButtons = document.getElementById('final-buttons');
    const levelMessage = document.getElementById('level-message');
    const nextLevel = document.getElementById('nextLevel');
    const finalScore = document.getElementById('finalScore');
    const levelInfo = document.getElementById('levelInfo');
    
    let showNextLevel = false;
    let nextLevelName = '';
    
    if (startingLevel === 'easy' && currentLevel < 3) {
        showNextLevel = true;
        nextLevelName = currentLevel === 1 ? 'Moderate' : 'Hard';
    } else if (startingLevel === 'moderate' && currentLevel === 2) {
        showNextLevel = true;
        nextLevelName = 'Hard';
    }
    
    // Update mission score display with level name
    let levelDisplay = '';
    switch(currentDifficulty) {
        case 'easy':
            levelDisplay = 'Easy Level';
            break;
        case 'moderate':
            levelDisplay = 'Moderate Level';
            break;
        case 'hard':
            levelDisplay = 'Hard Level';
            break;
    }
    
    // Update score displays
    finalScore.textContent = `${totalScore}/300`;
    levelInfo.textContent = levelDisplay;
    
    // Always save the score after completing any level
    saveHighScore();
    
    if (showNextLevel) {
        levelMessage.textContent = `Congratulations! You've completed the ${LEVEL_NAMES[currentDifficulty]} level with a total score of ${totalScore}! Ready to try the ${nextLevelName} level?`;
        levelComplete.classList.remove('hide');
        finalButtons.classList.add('hide');
        nextLevel.classList.remove('hide');
    } else {
        levelMessage.textContent = `Congratulations! You've completed the ${LEVEL_NAMES[currentDifficulty]} level with a final score of ${totalScore}/300!`;
        levelComplete.classList.remove('hide');
        finalButtons.classList.remove('hide');
        nextLevel.classList.add('hide');
    }
    
    // Set achievement text based on score
    const percentage = (totalScore / (TOTAL_LEVELS * MAX_QUESTIONS * POINTS_PER_QUESTION)) * 100;
    let achievement = '';
    
    if (percentage >= 90) {
        achievement = 'Space Master! 🏆';
        achievementBadge.src = 'https://img.icons8.com/emoji/96/000000/trophy-emoji.png';
    } else if (percentage >= 70) {
        achievement = 'Star Explorer! 🌟';
        achievementBadge.src = 'https://img.icons8.com/emoji/96/000000/star-emoji.png';
    } else if (percentage >= 50) {
        achievement = 'Space Cadet! 👍';
        achievementBadge.src = 'https://img.icons8.com/emoji/96/000000/thumbs-up-emoji.png';
    } else {
        achievement = 'Keep Exploring! 💪';
        achievementBadge.src = 'https://img.icons8.com/emoji/96/000000/flexed-biceps-emoji.png';
    }
    
    achievementText.innerText = achievement;
    showScreen('end');
}

function saveHighScore() {
    console.log('Saving score for player:', playerName);
    console.log('Current total score:', totalScore);
    
    if (!playerName) {
        console.log('No player name found, not saving score');
        return;
    }
    
    let highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    console.log('Current high scores:', highScores);
    
    const currentDate = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // If player exists, only update if new score is higher
    if (!highScores[playerName] || totalScore > highScores[playerName].score) {
        console.log('Saving new high score for player');
        highScores[playerName] = {
            score: totalScore,
            date: currentDate,
            level: currentLevel,
            difficulty: currentDifficulty
        };
        localStorage.setItem('highScores', JSON.stringify(highScores));
        console.log('Updated high scores:', JSON.parse(localStorage.getItem('highScores')));
    } else {
        console.log('Player already has a higher score');
    }
}

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    const highScoresList = document.getElementById('highScoresList');
    
    // Convert object to array and sort by score
    const sortedScores = Object.entries(highScores)
        .sort(([,a], [,b]) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);
    
    highScoresList.innerHTML = sortedScores
        .map((score, index) => {
            const [name, details] = score;
            const levelInfo = details.level === 3 ? 'Completed All Levels' : 
                            `Reached ${LEVEL_NAMES[details.difficulty]} Level`;
            return `
            <li class="high-score">
                <div class="high-score-main">
                    <span class="high-score-rank">#${index + 1}</span>
                    <span class="high-score-name">${name}</span>
                    <span class="high-score-score">${details.score}/300</span>
                </div>
                <div class="high-score-details">
                    <span class="high-score-level">${levelInfo}</span>
                    <span class="high-score-date">${details.date}</span>
                </div>
            </li>`;
        })
        .join('');
}

const easyQuestions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        choices: ["Venus", "Mars", "Jupiter", "Mercury"],
        correctAnswer: 1,  // "Mars" is at index 1
        explanation: "Mars is called the Red Planet because of the reddish color imparted to its surface by iron oxide (rust).",
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        correctAnswer: 1,  // "Jupiter" is at index 1
        explanation: "Jupiter is the largest planet in our solar system, with a mass more than twice that of all other planets combined.",
    },
    {
        question: "What is the name of the theory that suggests the universe began with a massive explosion?",
        choices: ["Steady State Theory", "Big Bang Theory", "Inflation Theory", "String Theory"],
        correctAnswer: 1,  // "Big Bang Theory" is at index 1
        explanation: "The Big Bang Theory proposes that the universe began about 13.8 billion years ago with a massive explosion.",
    },
    {
        question: "Which of these is NOT a dwarf planet?",
        choices: ["Pluto", "Ceres", "Europa", "Eris"],
        correctAnswer: 2,  // "Europa" is at index 2
        explanation: "Europa is one of Jupiter's moons, while the others are dwarf planets.",
    },
    {
        question: "What is a black hole?",
        choices: [
            "A star that emits black light",
            "A region of spacetime where gravity is so strong that nothing can escape",
            "A hole in the ozone layer",
            "A type of galaxy"
        ],
        correctAnswer: 1,  // Correct definition is at index 1
        explanation: "A black hole is a region of spacetime where gravitational forces are so strong that nothing, not even light, can escape from it.",
    },
    {
        question: "What is the name of Earth's only natural satellite?",
        choices: ["Titan", "Phobos", "Luna", "The Moon"],
        correctAnswer: 3,  // "The Moon" is at index 3
        explanation: "Earth's only natural satellite is simply called 'The Moon'. Luna is its Latin name.",
    },
    {
        question: "What is the hottest planet in our solar system?",
        choices: ["Mercury", "Venus", "Mars", "Jupiter"],
        correctAnswer: 1,  // "Venus" is at index 1
        explanation: "Despite being farther from the Sun than Mercury, Venus is the hottest planet due to its thick atmosphere creating a greenhouse effect.",
    },
    {
        question: "What is the name of the galaxy we live in?",
        choices: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
        correctAnswer: 1,  // "Milky Way" is at index 1
        explanation: "We live in the Milky Way galaxy, a spiral galaxy containing hundreds of billions of stars.",
    },
    {
        question: "What causes the phases of the Moon?",
        choices: ["Earth's shadow", "The Moon's position relative to Earth and Sun", "Cloud cover", "Solar flares"],
        correctAnswer: 1,
        explanation: "Moon phases occur due to the changing angle between the Moon, Earth, and Sun as the Moon orbits Earth, affecting how much of its sunlit surface we see.",
    },
    {
        question: "Which space agency successfully landed the first rover on Mars?",
        choices: ["ESA", "NASA", "Roscosmos", "ISRO"],
        correctAnswer: 1,
        explanation: "NASA's Mars Pathfinder mission in 1997 delivered the first successful Mars rover, named Sojourner.",
    }
];

const moderateQuestions = [
    {
        question: "What is a nebula?",
        choices: [
            "A type of black hole",
            "A cloud of gas and dust in space",
            "A small planet",
            "A type of star"
        ],
        correctAnswer: 1,
        explanation: "A nebula is a giant cloud of gas and dust in space. Some nebulae are regions where new stars are being formed, while others are the remains of dead or dying stars.",
    },
    {
        question: "What is the Kuiper Belt?",
        choices: [
            "A ring of asteroids between Mars and Jupiter",
            "A region of icy bodies beyond Neptune",
            "A band of radiation around Earth",
            "A ring around Saturn"
        ],
        correctAnswer: 1,
        explanation: "The Kuiper Belt is a region of the solar system beyond Neptune's orbit, containing many icy bodies, dwarf planets (including Pluto), and comets.",
    },
    {
        question: "What causes a solar eclipse?",
        choices: [
            "Earth's shadow on the Sun",
            "The Moon passing between Earth and Sun",
            "Sunspots becoming very large",
            "Clouds blocking the Sun"
        ],
        correctAnswer: 1,
        explanation: "A solar eclipse occurs when the Moon passes between Earth and the Sun, temporarily blocking some or all of the Sun's light from reaching Earth.",
    },
    {
        question: "What is a pulsar?",
        choices: [
            "A type of galaxy",
            "A rapidly rotating neutron star",
            "A comet with two tails",
            "A type of solar flare"
        ],
        correctAnswer: 1,
        explanation: "A pulsar is a highly magnetized, rotating neutron star that emits beams of electromagnetic radiation from its poles, appearing to pulse as the beam sweeps past Earth.",
    },
    {
        question: "What is the asteroid belt?",
        choices: [
            "A ring around Saturn",
            "A region between Mars and Jupiter containing many asteroids",
            "A belt of stars around the galaxy",
            "A ring of debris around Earth"
        ],
        correctAnswer: 1,
        explanation: "The asteroid belt is a region of space between Mars and Jupiter's orbits that contains millions of asteroids, ranging from tiny dust particles to dwarf planets like Ceres.",
    },
    {
        question: "What is a light-year?",
        choices: [
            "The time it takes light to reach Earth",
            "The distance light travels in one year",
            "The brightness of a star",
            "The age of a galaxy"
        ],
        correctAnswer: 1,
        explanation: "A light-year is the distance that light travels in one year, approximately 9.46 trillion kilometers or 5.88 trillion miles. It's used to measure vast distances in space.",
    },
    {
        question: "What is the purpose of a space telescope?",
        choices: [
            "To predict weather",
            "To observe space without atmospheric interference",
            "To communicate with satellites",
            "To track asteroids only"
        ],
        correctAnswer: 1,
        explanation: "Space telescopes are placed above Earth's atmosphere to obtain clearer images of space objects without atmospheric distortion and to observe wavelengths that can't penetrate the atmosphere.",
    },
    {
        question: "What is the solar wind?",
        choices: [
            "Wind between planets",
            "A stream of charged particles from the Sun",
            "Radiation from distant stars",
            "The Sun's rotation"
        ],
        correctAnswer: 1,
        explanation: "The solar wind is a stream of charged particles (mostly protons and electrons) released from the Sun's upper atmosphere, traveling through the solar system at high speeds.",
    },
    {
        question: "What causes the aurora borealis?",
        choices: [
            "Reflected moonlight",
            "Solar wind interacting with Earth's magnetic field",
            "Light pollution",
            "Atmospheric gases burning"
        ],
        correctAnswer: 1,
        explanation: "The aurora borealis (Northern Lights) occurs when charged particles from the solar wind interact with Earth's magnetic field and atmosphere, causing gases to glow.",
    },
    {
        question: "What is a meteorite?",
        choices: [
            "A shooting star",
            "Space rock that reaches Earth's surface",
            "A type of weather pattern",
            "A small moon"
        ],
        correctAnswer: 1,
        explanation: "A meteorite is a piece of rock or metal from space that survives passage through Earth's atmosphere and reaches the surface. Most meteorites are fragments of asteroids.",
    }
];

const hardQuestions = [
    {
        question: "What is the Chandrasekhar limit?",
        choices: [
            "Maximum possible size of a galaxy",
            "Maximum mass of a stable white dwarf",
            "Minimum distance between two black holes",
            "Maximum speed of a neutron star"
        ],
        correctAnswer: 1,
        explanation: "The Chandrasekhar limit (about 1.4 solar masses) is the maximum mass of a stable white dwarf star. Above this mass, electron degeneracy pressure cannot prevent gravitational collapse.",
    },
    {
        question: "What is the significance of the cosmic microwave background radiation?",
        choices: [
            "It powers satellite communications",
            "It's evidence of the Big Bang",
            "It causes auroras on Earth",
            "It helps navigate spacecraft"
        ],
        correctAnswer: 1,
        explanation: "The cosmic microwave background radiation is the afterglow of the Big Bang, providing strong evidence for the hot early universe and cosmic inflation theory.",
    },
    {
        question: "What is the Schwarzschild radius?",
        choices: [
            "The radius of the observable universe",
            "The event horizon radius of a black hole",
            "The minimum size of a neutron star",
            "The maximum radius of a galaxy"
        ],
        correctAnswer: 1,
        explanation: "The Schwarzschild radius defines the event horizon of a black hole - the boundary beyond which nothing, not even light, can escape the black hole's gravitational pull.",
    },
    {
        question: "What is dark energy?",
        choices: [
            "Energy from black holes",
            "A hypothetical form of energy causing universe expansion acceleration",
            "Energy from antimatter",
            "Radiation from distant galaxies"
        ],
        correctAnswer: 1,
        explanation: "Dark energy is a hypothetical form of energy that permeates all of space and tends to accelerate the expansion of the universe. It accounts for about 68% of the universe's total energy.",
    },
    {
        question: "What is the Fermi Paradox?",
        choices: [
            "A mathematical error in quantum physics",
            "The apparent contradiction between high probability of alien life and lack of evidence",
            "A problem in rocket propulsion",
            "A conflict in relativity theory"
        ],
        correctAnswer: 1,
        explanation: "The Fermi Paradox points out the contradiction between high estimates of the probability of extraterrestrial civilizations and the lack of evidence for, or contact with, such civilizations.",
    },
    {
        question: "What is quantum entanglement?",
        choices: [
            "A type of space-time distortion",
            "A phenomenon where particles remain connected regardless of distance",
            "The process of star formation",
            "A theory about parallel universes"
        ],
        correctAnswer: 1,
        explanation: "Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently, even when separated by large distances.",
    },
    {
        question: "What is the Great Attractor?",
        choices: [
            "A massive black hole at galaxy's center",
            "A gravitational anomaly drawing galaxies towards it",
            "The largest known star",
            "A theoretical point where universe began"
        ],
        correctAnswer: 1,
        explanation: "The Great Attractor is a gravitational anomaly in intergalactic space that is pulling galaxies, including our Milky Way, towards it with a force equivalent to the gravitational pull of a million billion suns.",
    },
    {
        question: "What is the significance of the Higgs boson?",
        choices: [
            "It powers nuclear fusion in stars",
            "It gives other particles their mass",
            "It causes black holes to form",
            "It creates dark matter"
        ],
        correctAnswer: 1,
        explanation: "The Higgs boson is a fundamental particle associated with the Higgs field, which gives mass to other particles. Its discovery in 2012 completed the Standard Model of particle physics.",
    },
    {
        question: "What is a magnetar?",
        choices: [
            "A type of space telescope",
            "A neutron star with an extremely powerful magnetic field",
            "An artificial satellite",
            "A type of comet"
        ],
        correctAnswer: 1,
        explanation: "A magnetar is a type of neutron star with an extremely powerful magnetic field, so strong it could strip information from a credit card at a distance of 100,000 miles.",
    },
    {
        question: "What is the lambda-CDM model?",
        choices: [
            "A theory about black hole formation",
            "The current standard model of cosmology",
            "A model of planetary formation",
            "A theory about star life cycles"
        ],
        correctAnswer: 1,
        explanation: "Lambda-CDM (Lambda Cold Dark Matter) is the current standard model of cosmology, describing the evolution and content of the universe, including dark energy (lambda) and cold dark matter.",
    }
];
