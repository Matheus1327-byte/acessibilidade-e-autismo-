document.addEventListener("DOMContentLoaded", () => {
  // --- ESTADO DA APLICAÇÃO ---
  let currentBook = null;
  let currentParagraphIndex = 0;
  let isPlaying = false;
  let playInterval = null;
  let quizIndex = 0;

  // --- ACESSIBILIDADE ---
  const body = document.body;
  const btnFontInc = document.getElementById("btn-font-inc");
  const btnFontDec = document.getElementById("btn-font-dec");
  const btnFontReset = document.getElementById("btn-font-reset");
  const btnContrast = document.getElementById("btn-contrast");
  const btnDarkMode = document.getElementById("btn-dark-mode");

  btnFontInc?.addEventListener("click", () => {
    body.classList.remove("font-sm");
    if (body.classList.contains("font-lg")) {
      body.classList.replace("font-lg", "font-xl");
    } else {
      body.classList.add("font-lg");
    }
  });

  btnFontDec?.addEventListener("click", () => {
    body.classList.remove("font-lg", "font-xl");
  });

  btnFontReset?.addEventListener("click", () => {
    body.classList.remove("font-lg", "font-xl");
  });

  btnContrast?.addEventListener("click", () => {
    body.classList.toggle("high-contrast");
  });

  btnDarkMode?.addEventListener("click", () => {
    body.classList.toggle("bg-slate-950");
    body.classList.toggle("text-white");
  });

  // --- RENDERIZAR ACERVO DE LIVROS ---
  const booksGrid = document.getElementById("books-grid");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  function renderBooks(filterText = "", category = "todos") {
    if (!booksGrid) return;
    booksGrid.innerHTML = "";

    const filtered = booksData.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(filterText.toLowerCase()) || 
                            book.author.toLowerCase().includes(filterText.toLowerCase());
      const matchesCategory = category === "todos" || book.category === category;
      return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
      booksGrid.innerHTML = `<p class="col-span-full text-center text-slate-500 py-8">Nenhum livro encontrado.</p>`;
      return;
    }

    filtered.forEach(book => {
      const card = document.createElement("div");
      card.className = "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col";
      card.innerHTML = `
        <img src="${book.cover}" alt="Capa do livro ${book.title}" class="h-48 w-full object-cover" />
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">${book.category}</span>
              <span class="text-xs font-medium text-slate-500"><i class="fa-solid fa-layer-group"></i> ${book.level}</span>
            </div>
            <h3 class="font-bold text-slate-900 text-lg leading-snug">${book.title}</h3>
            <p class="text-xs text-slate-500">Por ${book.author}</p>
          </div>
          <button onclick="openReader(${book.id})" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-play"></i> Assistir em Libras
          </button>
        </div>
      `;
      booksGrid.appendChild(card);
    });
  }

  searchInput?.addEventListener("input", (e) => renderBooks(e.target.value, categoryFilter.value));
  categoryFilter?.addEventListener("change", (e) => renderBooks(searchInput ? searchInput.value : "", e.target.value));

  // --- MODAL DO LEITOR (SPLIT SCREEN COM VÍDEO) ---
  const modal = document.getElementById("reader-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const readerTextContainer = document.getElementById("reader-text-container");
  const modalTitle = document.getElementById("modal-book-title");
  const modalAuthor = document.getElementById("modal-book-author");
  const gestureNameSpan = document.getElementById("gesture-name");
  const videoPlaceholder = document.getElementById("video-placeholder");
  const btnPlayPause = document.getElementById("btn-play-pause");

  window.openReader = function(bookId) {
    currentBook = booksData.find(b => b.id === bookId);
    if (!currentBook) return;

    currentParagraphIndex = 0;
    modalTitle.textContent = currentBook.title;
    if (modalAuthor) modalAuthor.textContent = `Por ${currentBook.author}`;

    renderReaderContent();
    modal.classList.remove("hidden");
  };

  function renderReaderContent() {
    readerTextContainer.innerHTML = "";
    currentBook.paragraphs.forEach((p, idx) => {
      const pEl = document.createElement("p");
      pEl.className = `p-3 rounded-lg text-slate-700 leading-relaxed cursor-pointer transition ${idx === currentParagraphIndex ? "active-paragraph font-semibold" : "hover:bg-slate-100"}`;
      pEl.textContent = p.text;
      pEl.onclick = () => selectParagraph(idx);
      readerTextContainer.appendChild(pEl);
    });

    updateVideoDisplay();
  }

  function selectParagraph(index) {
    currentParagraphIndex = index;
    renderReaderContent();
  }

  function updateVideoDisplay() {
    const currentParagraph = currentBook.paragraphs[currentParagraphIndex];
    if (currentParagraph) {
      if (gestureNameSpan) gestureNameSpan.textContent = currentParagraph.gesture;

      // Injeta o vídeo real dentro do elemento video-placeholder
      if (videoPlaceholder) {
        videoPlaceholder.innerHTML = `
          <iframe 
            class="w-full h-full rounded-xl" 
            src="${currentParagraph.videoUrl}" 
            title="Vídeo em Libras" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
      }
    }
  }

  closeModalBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
    clearInterval(playInterval);
    isPlaying = false;
    // Para o vídeo ao fechar o modal
    if (videoPlaceholder) videoPlaceholder.innerHTML = "";
  });

  btnPlayPause?.addEventListener("click", () => {
    isPlaying = !isPlaying;
    btnPlayPause.innerHTML = isPlaying ? `<i class="fa-solid fa-pause"></i>` : `<i class="fa-solid fa-play"></i>`;

    if (isPlaying) {
      playInterval = setInterval(() => {
        if (currentParagraphIndex < currentBook.paragraphs.length - 1) {
          currentParagraphIndex++;
          renderReaderContent();
        } else {
          clearInterval(playInterval);
          isPlaying = false;
          btnPlayPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
        }
      }, 4000);
    } else {
      clearInterval(playInterval);
    }
  });

  // --- DICIONÁRIO VISUAL ---
  const dictionaryGrid = document.getElementById("dictionary-grid");
  const letterButtonsContainer = document.getElementById("letter-buttons");

  function initDictionary() {
    if (!dictionaryGrid) return;
    if (letterButtonsContainer) {
      letterButtonsContainer.innerHTML = `<button onclick="filterDictionary('TODOS')" class="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg text-xs">Todos</button>`;
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.className = "px-2.5 py-1 bg-white border border-slate-300 font-bold rounded-lg text-xs text-slate-700 hover:bg-indigo-50";
        btn.textContent = letter;
        btn.onclick = () => filterDictionary(letter);
        letterButtonsContainer.appendChild(btn);
      });
    }
    renderDictionary(dictionaryData);
  }

  function renderDictionary(data) {
    dictionaryGrid.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 border border-slate-200 rounded-xl shadow-sm space-y-2";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-indigo-600 text-base">${item.word}</h4>
          <span class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">${item.letter}</span>
        </div>
        <p class="text-xs font-semibold text-slate-500">${item.handShape}</p>
        <p class="text-xs text-slate-600">${item.desc}</p>
      `;
      dictionaryGrid.appendChild(card);
    });
  }

  window.filterDictionary = function(letter) {
    if (letter === "TODOS") {
      renderDictionary(dictionaryData);
    } else {
      const filtered = dictionaryData.filter(d => d.letter.toUpperCase() === letter);
      renderDictionary(filtered);
    }
  };

  // --- JOGO DE DACTILOLOGIA ---
  const quizHandShapes = document.getElementById("quiz-hand-shapes");
  const quizInput = document.getElementById("quiz-answer-input");
  const btnQuizCheck = document.getElementById("btn-quiz-check");
  const quizFeedback = document.getElementById("quiz-feedback");

  function loadQuiz() {
    if (!quizHandShapes) return;
    const currentQuiz = quizData[quizIndex];
    quizHandShapes.innerHTML = "";
    if (quizInput) quizInput.value = "";
    if (quizFeedback) quizFeedback.textContent = "";

    currentQuiz.letters.forEach(letter => {
      const box = document.createElement("div");
      box.className = "w-10 h-12 bg-indigo-900 text-teal-300 font-extrabold text-xl rounded-lg flex items-center justify-center shadow-inner border border-indigo-700";
      box.textContent = letter;
      quizHandShapes.appendChild(box);
    });
  }

  btnQuizCheck?.addEventListener("click", () => {
    const userAnswer = quizInput.value.trim().toUpperCase();
    const correctAnswer = quizData[quizIndex].answer;

    if (userAnswer === correctAnswer) {
      quizFeedback.className = "text-sm font-bold text-emerald-600";
      quizFeedback.textContent = "Parabéns! Resposta correta em Libras! 🎉";
      setTimeout(() => {
        quizIndex = (quizIndex + 1) % quizData.length;
        loadQuiz();
      }, 1800);
    } else {
      quizFeedback.className = "text-sm font-bold text-rose-600";
      quizFeedback.textContent = "Tente novamente! Verifique a soletracão.";
    }
  });

  // Inicialização
  renderBooks();
  initDictionary();
  loadQuiz();
});

