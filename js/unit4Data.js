(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";

  function audio(file) {
    return audioRoot + file;
  }

  function entry(id, text, emoji, type, file) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      type: type || "word",
      audio: audio(file)
    };
  }

  function line(text, file) {
    return {
      text: text,
      audio: audio(file)
    };
  }

  function option(id, text, emoji) {
    return {
      id: id,
      text: text,
      emoji: emoji || ""
    };
  }

  function question(id, text, options, correct, visual) {
    return {
      id: id,
      text: text,
      visual: visual || "",
      options: options,
      correct: correct
    };
  }

  function slide(id, title, text, visual, audioItems, questions, reading) {
    var item = {
      id: id,
      title: title,
      text: Array.isArray(text) ? text : [text],
      visual: visual,
      audio: audioItems || []
    };

    if (questions && questions.length) {
      item.questions = questions;
    }

    if (reading) {
      item.reading = true;
      item.wordMeanings = meanings;
    }

    return item;
  }

  function emoji(emojiText) {
    return {
      type: "emoji",
      emoji: emojiText
    };
  }

  function focus(items) {
    return {
      type: "focus",
      items: items
    };
  }

  function wordList(items) {
    return {
      type: "word-list",
      items: items
    };
  }

  function m(word, emojiText) {
    return {
      word: word,
      emoji: emojiText,
      translation: ""
    };
  }

  function gameTask(id, visual, questionText, file, options, correct, speechText) {
    return {
      id: id,
      visual: visual,
      text: speechText || questionText,
      question: questionText,
      audio: audio(file),
      options: options,
      correct: correct
    };
  }

  function unit(id, title, icon, stageTitle, slides) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "slides",
          title: stageTitle,
          tasks: slides
        }
      ]
    };
  }

  var meanings = {
    "я": m("я", "🙂"),
    "ты": m("ты", "🙂👉"),
    "хочу": m("хочу", "🙏"),
    "дай": m("дай", "🤲"),
    "пожалуйста": m("пожалуйста", "🙏"),
    "на": m("на", "👉"),
    "спасибо": m("спасибо", "😊"),
    "у": m("у", "🎒"),
    "меня": m("меня", "🙂"),
    "есть": m("есть", "✅"),
    "воду": m("воду", "💧"),
    "воды": m("воды", "💧❌"),
    "вода": m("вода", "💧"),
    "хлеб": m("хлеб", "🍞"),
    "яблоко": m("яблоко", "🍎"),
    "яблока": m("яблока", "🍎❌"),
    "мяч": m("мяч", "⚽"),
    "мяча": m("мяча", "⚽❌"),
    "книга": m("книга", "📖"),
    "книгу": m("книгу", "📖"),
    "книги": m("книги", "📖❌"),
    "телефон": m("телефон", "📱"),
    "телефона": m("телефона", "📱❌"),
    "магазин": m("магазин", "🏪"),
    "что": m("что", "❓📦"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var objectOptions = [
    option("vodu", "воду", "💧"),
    option("hleb", "хлеб", "🍞"),
    option("yabloko", "яблоко", "🍎"),
    option("myach", "мяч", "⚽"),
    option("knigu", "книгу", "📖"),
    option("telefon", "телефон", "📱")
  ];

  var haveObjectOptions = [
    option("telefon", "телефон", "📱"),
    option("kniga", "книга", "📖"),
    option("myach", "мяч", "⚽"),
    option("voda", "вода", "💧"),
    option("hleb", "хлеб", "🍞"),
    option("yabloko", "яблоко", "🍎")
  ];

  var wantPhraseOptions = [
    option("ya-hochu-vodu", "Я хочу воду.", "💧"),
    option("ya-hochu-hleb", "Я хочу хлеб.", "🍞"),
    option("ya-hochu-yabloko", "Я хочу яблоко.", "🍎"),
    option("ya-hochu-myach", "Я хочу мяч.", "⚽"),
    option("ya-hochu-knigu", "Я хочу книгу.", "📖"),
    option("ya-hochu-telefon", "Я хочу телефон.", "📱")
  ];

  var politeOptions = [
    option("dai-vodu", "Дай воду, пожалуйста.", "💧"),
    option("dai-hleb", "Дай хлеб, пожалуйста.", "🍞"),
    option("dai-yabloko", "Дай яблоко, пожалуйста.", "🍎"),
    option("dai-knigu", "Дай книгу, пожалуйста.", "📖"),
    option("dai-myach", "Дай мяч, пожалуйста.", "⚽"),
    option("dai-telefon", "Дай телефон, пожалуйста.", "📱")
  ];

  var thanksOptions = [
    option("spasibo", "Спасибо.", "😊"),
    option("dai", "Дай.", "🤲"),
    option("ya-hochu", "Я хочу.", "🙋🙏")
  ];

  var dictionary = [
    entry("u4-ya", "я", "🙂", "word", "ya.mp3"),
    entry("u4-hochu", "хочу", "🙏", "word", "hochu.mp3"),
    entry("u4-ya-hochu", "я хочу", "🙋🙏", "chunk", "ya_hochu.mp3"),
    entry("u4-dai", "дай", "🤲", "word", "dai.mp3"),
    entry("u4-pozhaluysta", "пожалуйста", "🙏", "word", "pozhaluysta.mp3"),
    entry("u4-na", "на", "👉", "word", "na_take.mp3"),
    entry("u4-spasibo", "спасибо", "😊", "word", "spasibo.mp3"),
    entry("u4-u-menya-est", "у меня есть", "🎒✅", "chunk", "u_menya_est.mp3"),
    entry("u4-u-menya-net", "у меня нет", "🎒❌", "chunk", "u_menya_net.mp3"),
    entry("u4-vodu", "воду", "💧", "word", "vodu.mp3"),
    entry("u4-vody", "воды", "💧❌", "word", "vody.mp3"),
    entry("u4-knigu", "книгу", "📖", "word", "knigu.mp3"),
    entry("u4-knigi", "книги", "📖❌", "word", "knigi.mp3"),
    entry("u4-myacha", "мяча", "⚽❌", "word", "myacha.mp3"),
    entry("u4-telefon", "телефон", "📱", "word", "telefon.mp3"),
    entry("u4-kniga", "книга", "📖", "word", "kniga.mp3"),
    entry("u4-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u4-hleb", "хлеб", "🍞", "word", "hleb.mp3"),
    entry("u4-yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
    entry("u4-magazin", "магазин", "🏪", "word", "magazin.mp3"),
    entry("u4-da", "да", "✅", "word", "da.mp3"),
    entry("u4-net", "нет", "❌", "word", "net.mp3")
  ];

  var lesson10Slides = [
    slide("u4-l10-1", "Я хочу", ["Я хочу."], emoji("🙂🙏"), [line("Я хочу.", "ya_hochu.mp3")], null, true),
    slide("u4-l10-2", "воду", ["Я хочу воду."], focus(["🙂🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], null, true),
    slide("u4-l10-3", "хлеб", ["Я хочу хлеб."], focus(["🙂🙏", "🍞"]), [line("Я хочу хлеб.", "ya_hochu_hleb.mp3")], null, true),
    slide("u4-l10-4", "яблоко", ["Я хочу яблоко."], focus(["🙂🙏", "🍎"]), [line("Я хочу яблоко.", "ya_hochu_yabloko.mp3")], null, true),
    slide("u4-l10-5", "мяч", ["Я хочу мяч."], focus(["🙂🙏", "⚽"]), [line("Я хочу мяч.", "ya_hochu_myach.mp3")], null, true),
    slide("u4-l10-6", "Читай", ["Я хочу воду.", "Я хочу хлеб.", "Я хочу яблоко.", "Я хочу мяч."], focus(["💧", "🍞", "🍎", "⚽"]), [line("Я хочу воду. Я хочу хлеб. Я хочу яблоко. Я хочу мяч.", "lesson_10_text.mp3")], [
      question("u4-l10-q1", "Что я хочу?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("myach", "мяч", "⚽")], "vodu", "💧"),
      question("u4-l10-q2", "Что я хочу?", [option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎"), option("vodu", "воду", "💧")], "hleb", "🍞"),
      question("u4-l10-q3", "Я хочу мяч?", yesNoOptions, "da", "⚽"),
      question("u4-l10-q4", "Я хочу телефон?", yesNoOptions, "net", "🍎")
    ], true),
    slide("u4-l10-7", "Найди", ["Я хочу воду."], focus(["🙂🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], [question("u4-l10-q5", "Что?", objectOptions.slice(0, 4), "vodu")], true),
    slide("u4-l10-8", "Найди", ["Я хочу яблоко."], focus(["🙂🙏", "🍎"]), [line("Я хочу яблоко.", "ya_hochu_yabloko.mp3")], [question("u4-l10-q6", "Что?", [option("yabloko", "яблоко", "🍎"), option("telefon", "телефон", "📱"), option("hleb", "хлеб", "🍞")], "yabloko")], true),
    slide("u4-l10-9", "Отлично!", ["Отлично! ✅", "Я хочу", "воду", "хлеб", "яблоко", "мяч"], wordList([{ text: "Я хочу", emoji: "🙋🙏" }, { text: "воду", emoji: "💧" }, { text: "хлеб", emoji: "🍞" }, { text: "яблоко", emoji: "🍎" }]), [line("Отлично! Я хочу.", "u4_l10_final.mp3")], null, true)
  ];

  var lesson11Slides = [
    slide("u4-l11-1", "Дай", ["Дай."], emoji("🤲"), [line("Дай.", "dai.mp3")], null, true),
    slide("u4-l11-2", "воду", ["Дай воду, пожалуйста."], focus(["🤲", "💧", "🙏"]), [line("Дай воду, пожалуйста.", "dai_vodu_pozhaluysta.mp3")], null, true),
    slide("u4-l11-3", "хлеб", ["Дай хлеб, пожалуйста."], focus(["🤲", "🍞", "🙏"]), [line("Дай хлеб, пожалуйста.", "dai_hleb_pozhaluysta.mp3")], null, true),
    slide("u4-l11-4", "яблоко", ["Дай яблоко, пожалуйста."], focus(["🤲", "🍎", "🙏"]), [line("Дай яблоко, пожалуйста.", "dai_yabloko_pozhaluysta.mp3")], null, true),
    slide("u4-l11-5", "На", ["На."], focus(["👉", "💧"]), [line("На.", "na_take.mp3")], null, true),
    slide("u4-l11-6", "Спасибо", ["Спасибо."], emoji("😊"), [line("Спасибо.", "spasibo.mp3")], null, true),
    slide("u4-l11-7", "Диалог", ["А: Дай воду, пожалуйста.", "Б: На.", "А: Спасибо."], focus(["🤲💧🙏", "👉💧", "😊"]), [line("А: Дай воду, пожалуйста. Б: На. А: Спасибо.", "dialog_dai_vodu_na_spasibo.mp3")], [
      question("u4-l11-q1", "Что дать?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("myach", "мяч", "⚽")], "vodu", "💧"),
      question("u4-l11-q2", "После «На»?", [option("spasibo", "спасибо", "😊"), option("dai", "дай", "🤲"), option("hochu", "хочу", "🙏")], "spasibo", "👉"),
      question("u4-l11-q3", "Дай хлеб, пожалуйста.", [option("hleb", "", "🍞"), option("voda", "", "💧"), option("kniga", "", "📖")], "hleb", "🍞")
    ], true),
    slide("u4-l11-8", "Порядок", ["Дай воду, пожалуйста.", "На.", "Спасибо."], wordList([{ text: "Дай воду", emoji: "🤲💧" }, { text: "На", emoji: "👉" }, { text: "Спасибо", emoji: "😊" }]), [line("Дай воду, пожалуйста. На. Спасибо.", "dai_vodu_na_spasibo.mp3")], [
      question("u4-l11-q4", "1", [option("dai-vodu", "Дай воду, пожалуйста.", "🤲"), option("na", "На.", "👉"), option("spasibo", "Спасибо.", "😊")], "dai-vodu"),
      question("u4-l11-q5", "2", [option("na", "На.", "👉"), option("spasibo", "Спасибо.", "😊"), option("dai-vodu", "Дай воду, пожалуйста.", "🤲")], "na"),
      question("u4-l11-q6", "3", [option("spasibo", "Спасибо.", "😊"), option("dai-vodu", "Дай воду, пожалуйста.", "🤲"), option("na", "На.", "👉")], "spasibo")
    ], true),
    slide("u4-l11-9", "Отлично!", ["Отлично! ✅", "дай", "пожалуйста", "на", "спасибо"], wordList([{ text: "дай", emoji: "🤲" }, { text: "пожалуйста", emoji: "🙏" }, { text: "на", emoji: "👉" }, { text: "спасибо", emoji: "😊" }]), [line("Отлично! Спасибо.", "u4_l11_final.mp3")], null, true)
  ];

  var lesson12Slides = [
    slide("u4-l12-1", "У меня есть", ["У меня есть."], emoji("🙂🎒✅"), [line("У меня есть.", "u_menya_est.mp3")], null, true),
    slide("u4-l12-2", "телефон", ["У меня есть телефон."], focus(["🙂", "📱"]), [line("У меня есть телефон.", "u_menya_est_telefon.mp3")], null, true),
    slide("u4-l12-3", "книга", ["У меня есть книга."], focus(["🙂", "📖"]), [line("У меня есть книга.", "u_menya_est_kniga.mp3")], null, true),
    slide("u4-l12-4", "У меня нет", ["У меня нет."], emoji("🙂🎒❌"), [line("У меня нет.", "u_menya_net.mp3")], null, true),
    slide("u4-l12-5", "мяча", ["У меня нет мяча."], focus(["🙂", "❌", "⚽"]), [line("У меня нет мяча.", "u_menya_net_myacha.mp3")], null, true),
    slide("u4-l12-6", "воды", ["У меня нет воды."], focus(["🙂", "❌", "💧"]), [line("У меня нет воды.", "u_menya_net_vody.mp3")], null, true),
    slide("u4-l12-7", "Читай", ["У меня есть телефон.", "У меня есть книга.", "У меня нет мяча.", "У меня нет воды."], focus(["📱", "📖", "❌⚽", "❌💧"]), [line("У меня есть телефон. У меня есть книга. У меня нет мяча. У меня нет воды.", "lesson_12_text.mp3")], [
      question("u4-l12-q1", "У меня есть телефон?", yesNoOptions, "da", "📱"),
      question("u4-l12-q2", "У меня есть мяч?", yesNoOptions, "net", "❌⚽"),
      question("u4-l12-q3", "Чего нет?", [option("vody", "воды", "💧❌"), option("telefon", "телефон", "📱"), option("kniga", "книга", "📖")], "vody", "❌💧"),
      question("u4-l12-q4", "Что есть?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽"), option("voda", "вода", "💧")], "kniga", "📖")
    ], true),
    slide("u4-l12-8", "Да или нет", ["У меня есть хлеб."], focus(["🙂", "🍞"]), [line("У меня есть хлеб.", "u_menya_est_hleb.mp3")], [question("u4-l12-q5", "У меня есть хлеб?", yesNoOptions, "da")], true),
    slide("u4-l12-9", "Да или нет", ["У меня нет книги."], focus(["🙂", "❌", "📖"]), [line("У меня нет книги.", "u_menya_net_knigi.mp3")], [question("u4-l12-q6", "У меня нет книги?", yesNoOptions, "da")], true),
    slide("u4-l12-10", "Отлично!", ["Отлично! ✅", "У меня есть", "У меня нет"], wordList([{ text: "у меня есть", emoji: "🎒✅" }, { text: "у меня нет", emoji: "🎒❌" }, { text: "телефон", emoji: "📱" }, { text: "книга", emoji: "📖" }]), [line("Отлично! У меня есть. У меня нет.", "u4_l12_final.mp3")], null, true)
  ];

  function phraseOptions(correct, others) {
    var lookup = {};
    wantPhraseOptions.forEach(function (item) {
      lookup[item.id] = item;
    });
    return [lookup[correct]].concat((others || []).map(function (id) {
      return lookup[id];
    }));
  }

  var game1 = {
    id: "unit-4-game-ya-hochu",
    gameSlug: "unit-4-game-ya-hochu",
    title: "Игра: Я хочу",
    finalTitle: "Отлично! Ты говоришь: Я хочу! 🏆",
    finalText: "Я хочу",
    finalWords: ["Я хочу воду.", "Я хочу хлеб.", "Я хочу яблоко.", "Я хочу мяч."],
    stages: [
      {
        type: "image_to_word",
        title: "Я хочу",
        instruction: "Что я хочу?",
        tasks: [
          gameTask("u4g1-1", "💧", "Что я хочу?", "ya_hochu_vodu.mp3", phraseOptions("ya-hochu-vodu", ["ya-hochu-hleb", "ya-hochu-myach"]), "ya-hochu-vodu", "Я хочу воду."),
          gameTask("u4g1-2", "🍞", "Что я хочу?", "ya_hochu_hleb.mp3", phraseOptions("ya-hochu-hleb", ["ya-hochu-yabloko", "ya-hochu-vodu"]), "ya-hochu-hleb", "Я хочу хлеб."),
          gameTask("u4g1-3", "🍎", "Что я хочу?", "ya_hochu_yabloko.mp3", phraseOptions("ya-hochu-yabloko", ["ya-hochu-telefon", "ya-hochu-hleb"]), "ya-hochu-yabloko", "Я хочу яблоко."),
          gameTask("u4g1-4", "⚽", "Что я хочу?", "ya_hochu_myach.mp3", phraseOptions("ya-hochu-myach", ["ya-hochu-vodu", "ya-hochu-knigu"]), "ya-hochu-myach", "Я хочу мяч."),
          gameTask("u4g1-5", "📖", "Что я хочу?", "ya_hochu_knigu.mp3", phraseOptions("ya-hochu-knigu", ["ya-hochu-yabloko", "ya-hochu-telefon"]), "ya-hochu-knigu", "Я хочу книгу."),
          gameTask("u4g1-6", "📱", "Что я хочу?", "ya_hochu_telefon.mp3", phraseOptions("ya-hochu-telefon", ["ya-hochu-myach", "ya-hochu-vodu"]), "ya-hochu-telefon", "Я хочу телефон.")
        ]
      }
    ]
  };

  var shopRounds = [
    ["vodu", "💧", "Я хочу воду.", "ya-hochu-vodu", "ya_hochu_vodu.mp3"],
    ["hleb", "🍞", "Я хочу хлеб.", "ya-hochu-hleb", "ya_hochu_hleb.mp3"],
    ["yabloko", "🍎", "Я хочу яблоко.", "ya-hochu-yabloko", "ya_hochu_yabloko.mp3"],
    ["knigu", "📖", "Я хочу книгу.", "ya-hochu-knigu", "ya_hochu_knigu.mp3"],
    ["myach", "⚽", "Я хочу мяч.", "ya-hochu-myach", "ya_hochu_myach.mp3"],
    ["telefon", "📱", "Я хочу телефон.", "ya-hochu-telefon", "ya_hochu_telefon.mp3"]
  ];

  var shopTasks = [];
  shopRounds.forEach(function (round, index) {
    var otherIds = wantPhraseOptions.map(function (item) { return item.id; }).filter(function (id) { return id !== round[3]; });
    shopTasks.push(gameTask("u4g2-want-" + round[0], "🏪 🙂 " + round[1], "Что ты хочешь?", "chto_ty_hochesh.mp3", phraseOptions(round[3], [otherIds[index % otherIds.length], otherIds[(index + 2) % otherIds.length]]), round[3]));
    shopTasks.push(gameTask("u4g2-thanks-" + round[0], "🏪 👉 " + round[1], "Б: На. А:", "na_take.mp3", thanksOptions, "spasibo", "На."));
  });

  var game2 = {
    id: "unit-4-game-shop",
    gameSlug: "unit-4-game-shop",
    title: "Игра 2: Магазин",
    finalTitle: "Ты был в магазине! 🏪🏆",
    finalText: "На. Спасибо.",
    finalWords: ["Я хочу воду.", "Я хочу хлеб.", "На.", "Спасибо."],
    stages: [
      {
        type: "dialogue",
        title: "Магазин",
        instruction: "Магазин",
        tasks: shopTasks
      }
    ]
  };

  var haveGameTasks = [
    gameTask("u4g3-1", "🙂📱", "У меня есть телефон.", "u_menya_est_telefon.mp3", yesNoOptions, "da"),
    gameTask("u4g3-2", "🙂📖", "У меня есть книга.", "u_menya_est_kniga.mp3", yesNoOptions, "da"),
    gameTask("u4g3-3", "🙂❌⚽", "У меня есть мяч.", "u_menya_est_myach_q.mp3", yesNoOptions, "net"),
    gameTask("u4g3-4", "🙂❌💧", "У меня есть вода.", "u_menya_est_voda_q.mp3", yesNoOptions, "net"),
    gameTask("u4g3-5", "🙂🍞", "У меня есть хлеб.", "u_menya_est_hleb.mp3", yesNoOptions, "da"),
    gameTask("u4g3-6", "🙂❌📖", "У меня нет книги.", "u_menya_net_knigi.mp3", yesNoOptions, "da"),
    gameTask("u4g3-7", "🙂📱", "У меня нет телефона.", "u_menya_net_telefona_q.mp3", yesNoOptions, "net"),
    gameTask("u4g3-8", "🙂❌🍎", "У меня нет яблока.", "u_menya_net_yabloka.mp3", yesNoOptions, "da")
  ];

  var game3 = {
    id: "unit-4-game-have",
    gameSlug: "unit-4-game-have",
    title: "Игра 3: У меня есть?",
    finalTitle: "Супер! Ты знаешь: есть и нет! 🏆",
    finalText: "есть / нет",
    finalWords: ["У меня есть телефон.", "У меня нет книги.", "да", "нет"],
    stages: [
      {
        type: "yes_no",
        title: "У меня есть?",
        instruction: "Правда?",
        tasks: haveGameTasks
      }
    ]
  };

  root.LexiLandUnit4Lesson = {
    id: "level-0-unit-4-personal-phrases",
    order: 6,
    menuLabel: "Юнит 4",
    title: "Юнит 4: Я хочу. Дай. У меня есть.",
    subtitle: "Первые личные фразы: хочу, дай, есть, нет",
    level: "Уровень 0",
    coverEmoji: "🙋",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-10-ya-hochu", "Урок 10: Я хочу", "🙋🙏", "Урок 10: Я хочу", lesson10Slides),
      unit("lesson-11-dai-pozhaluysta", "Урок 11: Дай, пожалуйста", "🤲🙏", "Урок 11: Дай, пожалуйста", lesson11Slides),
      unit("lesson-12-u-menya-est-net", "Урок 12: У меня есть / нет", "🎒✅", "Урок 12: У меня есть / нет", lesson12Slides),
      {
        id: "unit-4-game-ya-hochu",
        title: "Игра: Я хочу",
        icon: "🙋",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра: Я хочу",
            tasks: [game1]
          }
        ]
      },
      {
        id: "unit-4-game-magazin",
        title: "Игра 2: Магазин",
        icon: "🏪",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 2: Магазин",
            tasks: [game2]
          }
        ]
      },
      {
        id: "unit-4-game-u-menya-est",
        title: "Игра 3: У меня есть?",
        icon: "🎒",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 3: У меня есть?",
            tasks: [game3]
          }
        ]
      }
    ]
  };

  root.LexiLandUnit4 = root.LexiLandUnit4Lesson;
}(typeof window !== "undefined" ? window : globalThis));
