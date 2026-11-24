// Base de dados com suporte a links de vídeo por parágrafo
const booksData = [
  {
    id: 1,
    title: "O Menino que Via com as Mãos",
    author: "Carla Mendes",
    category: "Cultura Surda",
    level: "Iniciante",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    paragraphs: [
      { 
        text: "Lucas gostava de observar as pessoas através dos seus gestos e expressões.", 
        gesture: "LUCAS - GOSTAR - OBSERVAR - PESSOAS - EXPRESSÃO",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Link do vídeo (substitui pelo teu)
      },
      { 
        text: "Na escola, ele ensinou seus amigos a soletrar nomes no alfabeto manual.", 
        gesture: "ESCOLA - ELE - ENSINAR - AMIGOS - ALFABETO - MANUAL",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      },
      { 
        text: "Todos perceberam que a comunicação vai muito além das palavras faladas.", 
        gesture: "TODOS - ENTENDER - COMUNICAÇÃO - DIVERSA - PALAVRA",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      }
    ]
  },
  {
    id: 2,
    title: "A Menina e os Sinais do Vento",
    author: "Roberto Silva",
    category: "Infantil",
    level: "Intermediário",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    paragraphs: [
      { 
        text: "Em uma pequena cidade no interior, Sofia conversava com a natureza por sinais.", 
        gesture: "CIDADE - PEQUENA - SOFIA - CONVERSAR - NATUREZA - SINAIS",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      },
      { 
        text: "Ela mostrava como o sinal de 'árvore' imitava os galhos se movendo.", 
        gesture: "SOFIA - MOSTRAR - SINAL - ÁRVORE - GALHOS - MOVER",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      }
    ]
  },
  {
    id: 3,
    title: "Dom Casmurro (Adaptado em Libras)",
    author: "Machado de Assis",
    category: "Clássicos",
    level: "Avançado",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    paragraphs: [
      { 
        text: "Uma noite destas, vindo da cidade pelo aterro do Flamengo, encontrei num trem um rapaz.", 
        gesture: "NOITE - PASSADO - CIDADE - TREM - ENCONTRAR - RAPAZ",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      },
      { 
        text: "Ele cumprimentou-me, falou do tempo e dos jornais.", 
        gesture: "RAPAZ - CUMPRIMENTAR - FALAR - TEMPO - JORNAL",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
      }
    ]
  }
];

// Base de dados do Dicionário Visual
const dictionaryData = [
  { word: "Aprender", letter: "A", handShape: "Mão em 'S' na testa", desc: "Mão fechada com polegar sob os dedos, abrindo e fechando na testa." },
  { word: "Biblioteca", letter: "B", handShape: "Mão em 'B' girando", desc: "Mão aberta com polegar dobrado, fazendo movimento circular." },
  { word: "Cultura", letter: "C", handShape: "Mão em 'C'", desc: "Formato da letra C movendo-se suavemente à frente do peito." },
  { word: "Escola", letter: "E", handShape: "Mãos batendo palmas levemente", desc: "Sinal composto de Casa + Aprender." }
];

// Desafios de Dactilologia
const quizData = [
  { answer: "LIBRAS", letters: ["L", "I", "B", "R", "A", "S"] },
  { answer: "LIVRO", letters: ["L", "I", "V", "R", "O"] },
  { answer: "SURDO", letters: ["S", "U", "R", "D", "O"] }
];

