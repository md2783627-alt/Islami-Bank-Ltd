const questions = [
  {
    question: "ইসলামী ব্যাংক বাংলাদেশ লিমিটেড কত সালে প্রতিষ্ঠিত হয়?",
    options: ["1613 সালে", "1983 সালে", "1845 সালে", "2023 সালে"],
    correct: 1
  },
  {
    question: "ইসলামী ব্যাংকিং-এ কোনটি সম্পূর্ণ নিষিদ্ধ?",
    options: ["মুদারাবা", "সুদ (রিবা)", "মুশারাকা", "ইজারা"],
    correct: 1
  },
  {
    question: "ইসলামী ব্যাংক বাংলাদেশ-এর মোবাইল ব্যাংকিং সেবার নাম কী?",
    options: ["Bkash", "Nagad", "Cellfin", "Rocket"],
    correct: 2
  },
  {
    question: "ইসলামী ব্যাংক বাংলাদেশ-এর সদর দপ্তর কোথায় অবস্থিত?",
    options: ["কলকাতা", "রাজশাহী", "ঢাকা", "তেতুলিয়া"],
    correct: 2
  },
  {
    question: "ইসলামী ব্যাংকিং কোন নীতির উপর পরিচালিত হয়?",
    options: ["সুদভিত্তিক নীতি", "ইসলামী শরিয়াহ নীতি", "সরকারি নীতি", "আন্তর্জাতিক নীতি"],
    correct: 1
  }
];

let current = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const q = questions[current];
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('progress-bar').style.width = ((current / questions.length) * 100) + '%';
  document.getElementById('progress-text').textContent = `প্রশ্ন ${current + 1} / ${questions.length}`;

  const optContainer = document.getElementById('options');
  optContainer.innerHTML = '';
  const labels = ['ক', 'খ', 'গ', 'ঘ'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${i}`;
    btn.innerHTML = `<span class="opt-label">${labels[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i);
    optContainer.appendChild(btn);
  });

  document.getElementById('next-btn').style.display = 'none';
  answered = false;
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach(btn => btn.disabled = true);

  if (index === q.correct) {
    buttons[index].classList.add('correct');
    score++;
  } else {
    buttons[index].classList.add('wrong');
    buttons[q.correct].classList.add('correct');
  }

  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    // Save score and go to result
    sessionStorage.setItem('quiz_score', score);
    sessionStorage.setItem('quiz_total', questions.length);
    window.location.href = 'result.html';
  }
}

// Initialize
if (document.getElementById('question-text')) {
  loadQuestion();
}
