/* ============================================
   IRON LOG — app logic
   All persistence via localStorage (client-only, no backend)
   ============================================ */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    sessions: "ironlog_sessions",       // completed sessions log
    exerciseWeights: "ironlog_weights", // { "week-day-exerciseIndex": "weight" }
    bodyLog: "ironlog_bodylog",         // array of {date, weight, chest, waist, arm, note}
    notes: "ironlog_notes",             // free text
    currentWeek: "ironlog_currentweek"
  };

  // ---------- Storage helpers ----------
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  // ---------- State ----------
  let state = {
    activeWeek: parseInt(loadJSON(STORAGE_KEYS.currentWeek, 1), 10) || 1,
    activeDay: "push",
    sessions: loadJSON(STORAGE_KEYS.sessions, []),          // [{week, day, date}]
    exerciseWeights: loadJSON(STORAGE_KEYS.exerciseWeights, {}),
    bodyLog: loadJSON(STORAGE_KEYS.bodyLog, []),
    notes: localStorage.getItem(STORAGE_KEYS.notes) || ""
  };

  // ============================================
  // NAVIGATION
  // ============================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".panel");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  function goToTab(tabId) {
    tabButtons.forEach(b => b.classList.toggle("is-active", b.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle("is-active", p.id === tabId));
    mainNav.classList.remove("is-open");
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => goToTab(btn.dataset.tab));
  });

  document.querySelectorAll("[data-goto]").forEach(el => {
    el.addEventListener("click", () => goToTab(el.dataset.goto));
  });

  navToggle.addEventListener("click", () => mainNav.classList.toggle("is-open"));

  // ============================================
  // WORKOUT TAB
  // ============================================
  const weekTabs = document.getElementById("weekTabs");
  const dayTabs = document.getElementById("dayTabs");
  const exerciseBody = document.getElementById("exerciseBody");
  const weekNote = document.getElementById("weekNote");
  const markSessionBtn = document.getElementById("markSessionBtn");
  const sessionHint = document.getElementById("sessionHint");

  function weightKey(week, day, idx) {
    return `${week}-${day}-${idx}`;
  }

  function renderExerciseTable() {
    const weekData = WORKOUT_PLAN[state.activeWeek];
    weekNote.textContent = weekData.note;

    document.querySelectorAll(".week-btn").forEach(b => {
      b.classList.toggle("is-active", parseInt(b.dataset.week, 10) === state.activeWeek);
    });
    document.querySelectorAll(".day-btn").forEach(b => {
      b.classList.toggle("is-active", b.dataset.day === state.activeDay);
    });

    const rows = weekData.days[state.activeDay];
    exerciseBody.innerHTML = "";

    rows.forEach((row, idx) => {
      const [name, setsReps, rpe, rest] = row;
      const key = weightKey(state.activeWeek, state.activeDay, idx);
      const savedWeight = state.exerciseWeights[key] || "";
      const doneKey = `done_${key}`;
      const isDone = loadJSON(doneKey, false);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="col-check"><input type="checkbox" data-donekey="${doneKey}" ${isDone ? "checked" : ""}></td>
        <td>${name}</td>
        <td>${setsReps}</td>
        <td>${rpe}</td>
        <td>${rest}</td>
        <td><input type="text" class="weight-input" data-weightkey="${key}" value="${savedWeight}" placeholder="kg"></td>
      `;
      exerciseBody.appendChild(tr);
    });

    // wire up inputs
    exerciseBody.querySelectorAll(".weight-input").forEach(input => {
      input.addEventListener("input", () => {
        state.exerciseWeights[input.dataset.weightkey] = input.value;
        saveJSON(STORAGE_KEYS.exerciseWeights, state.exerciseWeights);
      });
    });
    exerciseBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", () => {
        saveJSON(cb.dataset.donekey, cb.checked);
      });
    });

    updateSessionHint();
  }

  function updateSessionHint() {
    const today = new Date().toISOString().slice(0, 10);
    const already = state.sessions.find(
      s => s.week === state.activeWeek && s.day === state.activeDay && s.date === today
    );
    sessionHint.textContent = already
      ? `Logged today (${today})`
      : "Not logged for today yet";
  }

  weekTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".week-btn");
    if (!btn) return;
    state.activeWeek = parseInt(btn.dataset.week, 10);
    saveJSON(STORAGE_KEYS.currentWeek, state.activeWeek);
    renderExerciseTable();
    renderDashboard();
  });

  dayTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".day-btn");
    if (!btn) return;
    state.activeDay = btn.dataset.day;
    renderExerciseTable();
  });

  markSessionBtn.addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    const exists = state.sessions.find(
      s => s.week === state.activeWeek && s.day === state.activeDay && s.date === today
    );
    if (!exists) {
      state.sessions.push({ week: state.activeWeek, day: state.activeDay, date: today });
      saveJSON(STORAGE_KEYS.sessions, state.sessions);
    }
    updateSessionHint();
    renderDashboard();
  });

  // ============================================
  // DASHBOARD
  // ============================================
  const ringFill = document.getElementById("ringFill");
  const ringPercent = document.getElementById("ringPercent");
  const statWeek = document.getElementById("statWeek");
  const statSessions = document.getElementById("statSessions");
  const statStreak = document.getElementById("statStreak");
  const statWeight = document.getElementById("statWeight");

  const RING_CIRCUMFERENCE = 2 * Math.PI * 68;

  function computeStreak() {
    if (state.sessions.length === 0) return 0;
    const dates = [...new Set(state.sessions.map(s => s.date))].sort().reverse();
    let streak = 0;
    let cursor = new Date();
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i]);
      const diffDays = Math.round((cursor - d) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        streak++;
        cursor = d;
      } else {
        break;
      }
    }
    return streak;
  }

  function renderDashboard() {
    const weekSessions = state.sessions.filter(s => s.week === state.activeWeek);
    const uniqueDays = new Set(weekSessions.map(s => s.day + s.date));
    const targetSessionsPerWeek = 6;
    const pct = Math.min(100, Math.round((uniqueDays.size / targetSessionsPerWeek) * 100));

    ringFill.style.strokeDasharray = RING_CIRCUMFERENCE;
    ringFill.style.strokeDashoffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * pct) / 100;
    ringPercent.textContent = `${pct}%`;

    statWeek.textContent = WORKOUT_PLAN[state.activeWeek].label;
    statSessions.textContent = state.sessions.length;
    statStreak.textContent = `${computeStreak()} day${computeStreak() === 1 ? "" : "s"}`;

    if (state.bodyLog.length > 0) {
      const latest = state.bodyLog[state.bodyLog.length - 1];
      statWeight.textContent = `${latest.weight} kg`;
    } else {
      statWeight.textContent = `${PROFILE.weightKg} kg`;
    }
  }

  // ============================================
  // DIET TAB
  // ============================================
  function renderDiet() {
    const mealBody = document.getElementById("dietMealBody");
    mealBody.innerHTML = DIET_PLAN.meals
      .map(([meal, items]) => `<tr><td>${meal}</td><td>${items}</td></tr>`)
      .join("");

    const macroBody = document.getElementById("dietMacroBody");
    macroBody.innerHTML = DIET_PLAN.macros
      .map(([meal, cal, pro, carb, fat], i) => {
        const isTotal = i === DIET_PLAN.macros.length - 1;
        return `<tr${isTotal ? ' style="font-weight:700;background:rgba(227,172,61,0.08);"' : ""}><td>${meal}</td><td>${cal}</td><td>${pro}</td><td>${carb}</td><td>${fat}</td></tr>`;
      })
      .join("");

    document.getElementById("dietWorking").innerHTML = DIET_PLAN.working
      .map(item => `<li>${item}</li>`)
      .join("");
    document.getElementById("dietImprove").innerHTML = DIET_PLAN.improve
      .map(item => `<li>${item}</li>`)
      .join("");
  }

  // ============================================
  // PROGRESS TAB — body log + chart
  // ============================================
  const logForm = document.getElementById("logForm");
  const logBody = document.getElementById("logBody");
  const logEmpty = document.getElementById("logEmpty");
  const logTable = document.getElementById("logTable");
  let weightChart = null;

  function renderBodyLog() {
    if (state.bodyLog.length === 0) {
      logTable.style.display = "none";
      logEmpty.style.display = "block";
    } else {
      logTable.style.display = "table";
      logEmpty.style.display = "none";
    }

    const sorted = [...state.bodyLog].sort((a, b) => a.date.localeCompare(b.date));

    logBody.innerHTML = sorted
      .slice()
      .reverse()
      .map((entry, revIdx) => {
        const idx = sorted.length - 1 - revIdx;
        return `
        <tr>
          <td>${entry.date}</td>
          <td>${entry.weight} kg</td>
          <td>${entry.chest || "—"}</td>
          <td>${entry.waist || "—"}</td>
          <td>${entry.arm || "—"}</td>
          <td>${entry.note || ""}</td>
          <td><button class="delete-btn" data-idx="${idx}">Remove</button></td>
        </tr>`;
      })
      .join("");

    logBody.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sortedArr = [...state.bodyLog].sort((a, b) => a.date.localeCompare(b.date));
        const target = sortedArr[parseInt(btn.dataset.idx, 10)];
        state.bodyLog = state.bodyLog.filter(e => e !== target);
        saveJSON(STORAGE_KEYS.bodyLog, state.bodyLog);
        renderBodyLog();
        renderChart();
        renderDashboard();
      });
    });

    renderChart();
  }

  function renderChart() {
    const canvas = document.getElementById("weightChart");
    if (!canvas || typeof Chart === "undefined") return;
    const sorted = [...state.bodyLog].sort((a, b) => a.date.localeCompare(b.date));
    const labels = sorted.map(e => e.date);
    const weights = sorted.map(e => parseFloat(e.weight));

    if (weightChart) {
      weightChart.data.labels = labels;
      weightChart.data.datasets[0].data = weights;
      weightChart.update();
      return;
    }

    weightChart = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Bodyweight (kg)",
          data: weights,
          borderColor: "#e3ac3d",
          backgroundColor: "rgba(227,172,61,0.15)",
          tension: 0.3,
          fill: true,
          pointBackgroundColor: "#e3ac3d",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#a2a9b3" } }
        },
        scales: {
          x: { ticks: { color: "#6b7280" }, grid: { color: "#363b43" } },
          y: { ticks: { color: "#6b7280" }, grid: { color: "#363b43" } }
        }
      }
    });
  }

  logForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const entry = {
      date: document.getElementById("logDate").value,
      weight: document.getElementById("logWeight").value,
      chest: document.getElementById("logChest").value,
      waist: document.getElementById("logWaist").value,
      arm: document.getElementById("logArm").value,
      note: document.getElementById("logNote").value
    };
    if (!entry.date || !entry.weight) return;

    // replace existing entry for same date if present
    state.bodyLog = state.bodyLog.filter(e2 => e2.date !== entry.date);
    state.bodyLog.push(entry);
    saveJSON(STORAGE_KEYS.bodyLog, state.bodyLog);

    logForm.reset();
    renderBodyLog();
    renderDashboard();
  });

  // ============================================
  // NOTES TAB
  // ============================================
  const notesArea = document.getElementById("notesArea");
  const notesSaveHint = document.getElementById("notesSaveHint");
  let notesTimer = null;

  notesArea.value = state.notes;

  notesArea.addEventListener("input", () => {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.notes, notesArea.value);
      notesSaveHint.classList.add("is-visible");
      setTimeout(() => notesSaveHint.classList.remove("is-visible"), 1200);
    }, 400);
  });

  // ============================================
  // INIT
  // ============================================
  function init() {
    // default the date field to today
    const logDate = document.getElementById("logDate");
    if (logDate) logDate.value = new Date().toISOString().slice(0, 10);

    renderExerciseTable();
    renderDiet();
    renderBodyLog();
    renderDashboard();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
