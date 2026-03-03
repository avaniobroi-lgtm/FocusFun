// --- State Management ---
let timeLeft;
let timerId = null;
let currentUser = JSON.parse(localStorage.getItem('focusUser')) || null;
let currentQuestQuestions = []; // Dynamically populated

// --- DOM Elements ---
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const settingChips = document.querySelectorAll('.setting-chip');
const focusStatus = document.getElementById('focus-status');
const focusTopic = document.getElementById('focus-topic');

// Nav & Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const contentSections = document.querySelectorAll('.content-section');

// Auth elements
const loginNavBtn = document.getElementById('login-nav-btn');
const userInfo = document.getElementById('user-info');
const usernameDisplay = document.getElementById('username-display');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const closeAuth = document.getElementById('close-auth');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-btn');
const usernameGroup = document.getElementById('username-group');
const errorDisplay = document.getElementById('error-display');

// Dashboard elements
const streakCount = document.getElementById('streak-count');
const focusScore = document.getElementById('focus-score');
const totalTime = document.getElementById('total-time');
const historyList = document.getElementById('history-list');

// Quiz elements
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizIntro = document.getElementById('quiz-intro');
const quizActive = document.getElementById('quiz-active');
const quizResult = document.getElementById('quiz-result');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizScoreDisplay = document.getElementById('quiz-score-display');
const closeQuizBtn = document.getElementById('close-quiz-btn');

// --- Tab Switching ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        contentSections.forEach(section => {
            section.style.display = section.id === `${tab}-tab` ? 'block' : 'none';
        });

        if (tab === 'dashboard') updateDashboard();
    });
});

// --- Timer Logic ---
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    display.textContent = timeStr;
    document.title = `${timeStr} - FocusFun`;
}

async function startTimer() {
    if (timerId) {
        // --- STRICT LOCK: Manual Stop Penalty ---
        if (currentUser && currentUser.streak > 0) {
            currentUser.streak = 0;
            saveUser();
            alert('STRICT MODE: Session stopped manually! Current streak has been reset to 0. 😔');
        }

        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Resume Focus';
        focusStatus.style.opacity = '0';
    } else {
        // Enter Strict Mode (Fullscreen)
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.log("Fullscreen failed");
        }

        if (!timeLeft) timeLeft = 25 * 60;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                finishSession();
            }
        }, 1000);
        startBtn.textContent = 'Pause';
        focusStatus.style.opacity = '1';
    }
}

async function finishSession() {
    clearInterval(timerId);
    timerId = null;
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => { });
    }

    alert('Session complete! Preparing your Topic Quest...');

    const topic = focusTopic.value.trim() || "General Study";

    if (currentUser) {
        currentUser.totalStudyTime = (currentUser.totalStudyTime || 0) + 25;
        currentUser.xp = (currentUser.xp || 0) + 50;

        // Streak logic
        const now = new Date();
        const lastDate = currentUser.lastDate ? new Date(currentUser.lastDate) : null;
        if (!lastDate || (now - lastDate > 86400000 && now.getDate() !== lastDate.getDate())) {
            currentUser.streak = (currentUser.streak || 0) + 1;
        }
        currentUser.lastDate = now.toISOString();

        if (!currentUser.history) currentUser.history = [];
        currentUser.history.unshift({ topic, date: now.toLocaleDateString(), type: 'Focus' });

        saveUser();
    }

    // Fetch dynamic quiz before switching
    await prepareDynamicQuiz(topic);
    document.querySelector('[data-tab="quiz"]').click();
}

async function prepareDynamicQuiz(topic) {
    quizIntro.innerHTML = `<h2>Generating Mind Quest for: ${topic}...</h2>`;
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
        const data = await response.json();

        if (data.extract) {
            const extract = data.extract;
            const sentences = extract.split('. ').filter(s => s.length > 20);

            currentQuestQuestions = sentences.slice(0, 3).map((sentence, idx) => {
                const words = sentence.split(' ');
                // Pick a long word to hide (at least 4 chars)
                const candidates = words.filter(w => w.length > 5 && !w.includes(','));
                const mysteryWord = candidates[Math.floor(Math.random() * candidates.length)] || words[0];
                const cleanWord = mysteryWord.replace(/[.,]/g, "");

                return {
                    q: sentence.replace(cleanWord, "_________"),
                    a: [cleanWord, "Knowledge", "Focus", "Learning"].sort(() => Math.random() - 0.5),
                    c: 0 // Will be set after sort
                };
            });

            // Re-find correct index after sort
            currentQuestQuestions.forEach(q => {
                q.c = q.a.indexOf(q.a.find(opt => !["Knowledge", "Focus", "Learning"].includes(opt) || opt === q.a[0]));
                // Simple logic: the one we picked is correct. If it was one of the fillers, we just pick the first match.
                // Refined: find which index contains our target.
            });

            // Correction for index finding
            currentQuestQuestions = sentences.slice(0, 3).map((sentence) => {
                const words = sentence.split(' ');
                const longWords = words.filter(w => w.length > 5);
                const target = longWords[Math.floor(Math.random() * longWords.length)].replace(/[.,!?;:()]/g, "");
                const options = [target, "Process", "Information", "Discovery"].sort(() => Math.random() - 0.5);
                return {
                    q: sentence.replace(target, "_______"),
                    a: options,
                    c: options.indexOf(target)
                };
            });

            quizIntro.innerHTML = `<h2>Mind Quest: ${topic}</h2><p>Excellent! Test your knowledge on ${topic}.</p><button id="start-quiz-btn" class="btn btn-primary" onclick="startQuiz()">Begin Quest</button>`;
        } else {
            throw new Error("No summary found");
        }
    } catch (err) {
        console.error("Quiz Fetch Error:", err);
        currentQuestQuestions = [
            { q: "Concentration is key to success. What is another word for focus?", a: ["Distraction", "Attention", "Laziness"], c: 1 },
            { q: "Which habit helps you learn better?", a: ["Sleeping 4 hours", "Daily consistency", "Cramming"], c: 1 }
        ];
        quizIntro.innerHTML = `<h2>General Mind Quest</h2><p>We couldn't find specific info for "${topic}", so here is a general quest!</p><button id="start-quiz-btn" class="btn btn-primary" onclick="startQuiz()">Begin Quest</button>`;
    }
}

// Fixed Start Quiz function for dynamic call
window.startQuiz = () => {
    quizIntro.style.display = 'none';
    quizActive.style.display = 'block';
    currentQuizIdx = 0;
    quizScore = 0;
    showQuestion();
};

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    const activeChip = document.querySelector('.setting-chip.active');
    timeLeft = parseInt(activeChip.dataset.time) * 60;
    updateDisplay();
    startBtn.textContent = 'Start Focus';
    focusStatus.style.opacity = '0';
}

// --- Dashboard Logic ---
function updateDashboard() {
    if (!currentUser) return;
    streakCount.textContent = currentUser.streak || 0;
    focusScore.textContent = currentUser.xp || 0;
    totalTime.textContent = currentUser.totalStudyTime || 0;

    historyList.innerHTML = '';
    if (currentUser.history && currentUser.history.length > 0) {
        currentUser.history.slice(0, 5).forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.topic} (${item.type})</span> <span>${item.date}</span>`;
            historyList.appendChild(li);
        });
    } else {
        historyList.innerHTML = '<li>No history yet. Start focusing!</li>';
    }
}

// --- Quiz Logic ---
let currentQuizIdx = 0;
let quizScore = 0;

function showQuestion() {
    if (currentQuestQuestions.length === 0) return;
    const q = currentQuestQuestions[currentQuizIdx];
    quizQuestion.textContent = q.q;
    quizOptions.innerHTML = '';
    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(i);
        quizOptions.appendChild(btn);
    });
}

function handleAnswer(idx) {
    if (idx === currentQuestQuestions[currentQuizIdx].c) quizScore++;
    currentQuizIdx++;
    if (currentQuizIdx < currentQuestQuestions.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    quizActive.style.display = 'none';
    quizResult.style.display = 'block';
    quizScoreDisplay.textContent = `${quizScore}/${currentQuestQuestions.length}`;

    const xpGained = quizScore * 20;
    if (currentUser) {
        currentUser.xp = (currentUser.xp || 0) + xpGained;
        currentUser.history.unshift({ topic: "Quiz Result", date: new Date().toLocaleDateString(), type: 'Quest' });
        saveUser();
    }
    document.getElementById('quiz-summary').textContent = `You earned ${xpGained} XP for your knowledge!`;
}

closeQuizBtn.addEventListener('click', () => {
    quizResult.style.display = 'none';
    quizActive.style.display = 'none';
    quizIntro.style.display = 'block';
    document.querySelector('[data-tab="timer"]').click();
});

// --- Auth Logic (Local Storage) ---
let isLoginMode = true;

function saveUser() {
    localStorage.setItem('focusUser', JSON.stringify(currentUser));
}

function updateAuthUI() {
    if (currentUser) {
        loginNavBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        usernameDisplay.textContent = `Hi, ${currentUser.username}`;
    } else {
        loginNavBtn.style.display = 'block';
        userInfo.style.display = 'none';
    }
}

toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    authTitle.textContent = isLoginMode ? 'Welcome Back' : 'Create Account';
    authSubtitle.textContent = isLoginMode ? 'Log in to continue your focus journey' : 'Join thousands of students leveling up';
    submitBtn.textContent = isLoginMode ? 'Login' : 'Register';
    toggleBtn.textContent = isLoginMode ? 'Register' : 'Login';
    usernameGroup.style.display = isLoginMode ? 'none' : 'flex';
    errorDisplay.style.display = 'none';
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    if (isLoginMode) {
        const savedUser = JSON.parse(localStorage.getItem('focusUser'));
        if (savedUser && savedUser.email === email) {
            currentUser = savedUser;
            authSection.style.display = 'none';
            updateAuthUI();
        } else {
            errorDisplay.textContent = "User not found. Please register first.";
            errorDisplay.style.display = 'block';
        }
    } else {
        currentUser = { username, email, streak: 0, totalStudyTime: 0, xp: 100, history: [] };
        saveUser();
        authSection.style.display = 'none';
        updateAuthUI();
    }
});

loginNavBtn.addEventListener('click', () => {
    authSection.style.display = 'flex';
});

closeAuth.addEventListener('click', () => {
    authSection.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('focusUser');
    updateAuthUI();
});

// --- Event Listeners ---
settingChips.forEach(chip => {
    chip.addEventListener('click', () => {
        settingChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        timeLeft = parseInt(chip.dataset.time) * 60;
        resetTimer();
    });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

document.addEventListener('visibilitychange', () => {
    if (document.hidden && timerId) {
        // --- STRICT LOCK: Visibility Penalty ---
        if (currentUser && currentUser.streak > 0) {
            currentUser.streak = 0;
            saveUser();
            alert('STRICT MODE: You left the tab! Your focus streak has been reset to 0. Stay committed!');
        } else {
            alert('STRICT MODE: You left the tab! Stay on this page to level up.');
        }
    }
});

// --- Init ---
timeLeft = 25 * 60;
updateDisplay();
updateAuthUI();
updateDashboard();
