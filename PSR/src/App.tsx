import { useEffect, useMemo, useState } from "react";

export type AnswerOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
};

const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Что не относится к опасным факторам пожара, воздействующим на людей и имущество:",
    options: [
      { id: "1a", text: "Пламя и искры", isCorrect: false },
      { id: "1b", text: "Повышенная температура окружающей среды", isCorrect: false },
      { id: "1c", text: "Вынос высокого напряжения на токопроводящие части технологических установок", isCorrect: true },
      { id: "1d", text: "Пониженная концентрация кислорода", isCorrect: false },
      { id: "1e", text: "Повышенная концентрация токсичных продуктов горения и термического разложения", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "Время работы в средствах защиты кожи определяется",
    options: [
      { id: "2a", text: "Физической нагрузкой и температурой окружающей среды", isCorrect: true },
      { id: "2b", text: "Временем выполнения задачи по ликвидации ЧС", isCorrect: false },
      { id: "2с", text: "Самочувствием спасателя и способностью продолжать работать", isCorrect: false },
    ],
  },
  {
    id: 3,
    text: "Что такое адаптация человека?",
    options: [
      { id: "3a", text: "Протекание психических процессов в зависимости от состояния и явлений действительности", isCorrect: false },
      { id: "3b", text: "Устойчивое психическое состояние человека в различных условиях", isCorrect: false },
      { id: "3c", text: "Процесс приспособления человека к условиям внешней среды", isCorrect: true },
    ],
  },
  {
    id: 4,
    text: "Какой максимально допустимый наклон насосной станции при работающем двигателе",
    options: [
      { id: "4a", text: "Не более 20 градусов", isCorrect: true },
      { id: "4b", text: "Не более 30 градусов", isCorrect: false },
      { id: "4c", text: "Не более 40 градусов", isCorrect: false },
    ],
  },
   {
    id: 5,
    text: "Пожар это -",
    options: [
      { id: "5a", text: "Сложный физико-химический процесс превращения компонентов горючей смеси в продукты сгорания с выделением теплового излучения, света и лучистой энергии", isCorrect: false },
      { id: "5b", text: "Сложный физико-химический процесс причиняющий материальный ущерб, вред жизни и здоровью людей, интересам общества и государства", isCorrect: false },
      { id: "5c", text: "Неконтролируемый физико-химический процесс превращения компонентов горючей смеси в продукты сгорания", isCorrect: false },
      { id: "5d", text: "Неконтролируемое горение, причиняющее материальный ущерб, вред жизни и здоровью граждан, интересам общества и государства", isCorrect: true },
    ],
  },
   {
    id: 6,
    text: "При аварии на хладокомбинате следует использовать",
    options: [
      { id: "6a", text: "Промышленный противогаз (коробка серого цвета)", isCorrect: true },
      { id: "6b", text: "Промышленный противогаз (коробка желтого цвета)", isCorrect: false },
      { id: "6c", text: "Достаточно использовать общевойсковой фильтрующий противогаз", isCorrect: false },
    ],
  },
   {
    id: 7,
    text: "Тушение пожаров – это",
    options: [
      { id: "a", text: "Силы и средства сосредоточенные на решающем направлении и выполняющие боевую задачу", isCorrect: false },
      { id: "b", text: "Действия пожарных подразделений направленные на полное прекращение огня, а так же на исключение возможности его повторного возникновения", isCorrect: true },
      { id: "c", text: "Действия, направленные на спасение людей, имущества и ликвидацию пожаров", isCorrect: false },
      { id: "d", text: "Действия, направленные на спасение людей, имущества, ликвидацию горения и устранения условий для его повторного возникновения", isCorrect: false },
    ],
  },
   {
    id: 8,
    text: "Для защиты от хлора следует",
    options: [
      { id: "a", text: "Подняться повыше", isCorrect:  true },
      { id: "b", text: "Остаться на месте", isCorrect: false },
      { id: "c", text: "Спрятаться в подвал", isCorrect: false },
    ],
  },
   {
    id: 9,
    text: "Что не относиться к основным приемам «активного слушания»?",
    options: [
      { id: "a", text: "отражение чувств собеседника", isCorrect: false },
      { id: "b", text: "пара фраз", isCorrect: false },
      { id: "c", text: "резюме", isCorrect: false },
      { id: "d", text: "монолог", isCorrect: true },
    ],
  },
   {
    id: 10,
    text: "На какое максимально время можно оставлять включенный двигатель бензопилы или бензореза при ее остановке",
    options: [
      { id: "a", text: "Не более 5 минут", isCorrect:  true },
      { id: "b", text: "Не более 10 минут", isCorrect: false },
      { id: "c", text: "Не более 15 минут", isCorrect: false },
    ],
  },
   {
    id: 11,
    text: "При переломах костей конечностей накладывается шина:",
    options: [
      { id: "a", text: "Ниже области перелома", isCorrect: false },
      { id: "b", text: "Выше и ниже области перелома, так чтобы шина захватывала один сустав выше перелома и все суставы ниже перелома", isCorrect: true },
      { id: "c", text: "Выше области перелома", isCorrect: false },
    ],
  },
   {
    id: 12,
    text: "В каком случаи в ходе спасательных работ из автомобиля необходимо добавить точку стабилизации:",
    options: [
      { id: "a", text: "При установке домкрата для отодвигания приборной панели с целю создания свободного пространства – под задний конец домкрата (для предотвращения переламывания кузова)", isCorrect: false },
      { id: "b", text: "В случае если уже установленные точки стабилизации потеряли фиксацию", isCorrect: false },
      { id: "c", text: "В случае выражения сомнения в надежности стабилизации автомобиля хотя бы одним из участников спасательных работ", isCorrect: true },
    ],
  },
  {
    id: 13,
    text: "Сроки проведения разведки пожара",
    options: [
      { id: "a", text: "С момента сообщения о пожаре и до его ликвидации проводится разведка пожара", isCorrect: true },
      { id: "b", text: "С момента выезда подразделения и до полной ликвидации пожара", isCorrect: false },
      { id: "c", text: "С момента прибытия подразделения на пожар и до его ликвидации", isCorrect: false },
      { id: "d", text: "С момента сообщения о пожаре и до начала тушения пожара", isCorrect: false },
    ],
  },
  {
    id: 14,
    text: "Патроны РП используемые в изолирующем противогазе предназначены для:",
    options: [
      { id: "a", text: "Регенерации воздуха", isCorrect:  true },
      { id: "b", text: "Ингаляции воздуха", isCorrect: false },
      { id: "c", text: "Абсорбции воздуха", isCorrect: false },
    ],
  },
  {
    id: 15,
    text: "Острые стрессовые реакции возникают",
    options: [
      { id: "a", text: "в течение нескольких месяцев после произошедшего события", isCorrect: false },
      { id: "b", text: "в момент события, длительностью до нескольких дней", isCorrect: true },
      { id: "c", text: "в течение нескольких лет после события", isCorrect: false },
    ],
  },
  {
    id: 16,
    text: "В каком случае разрешается переносить механизированный инструмент (бензопилу) в работающем состоянии",
    options: [
      { id: "a", text: "Только в случае проведения неотложных работ и только обращённым рабочими поверхностями по ходу движения от работника", isCorrect: false },
      { id: "b", text: "Не разрешается", isCorrect: true },
      { id: "c", text: "Разрешается при согласовании с руководителем работ и предупреждении остальных работающих", isCorrect: false },
    ],
  },
  {
    id: 17,
    text: "Перечислите виды ожогов",
    options: [
      { id: "a", text: "Химические, термические, радиационные, электрические", isCorrect: true },
      { id: "b", text: "Химические, электрические, щелочные, термические", isCorrect: false },
      { id: "c", text: "Электрические, щелочные, кислотные, радиационные, термические", isCorrect: false },
    ],
  },
  {
    id: 18,
    text: "Имеется необходимость удалении крыши. Вклеенное лобовое стекло препятствует этому. Что необходимо предпринять?",
    options: [
      { id: "a", text: "Выдавить лобовое стекло изнутри", isCorrect: true },
      { id: "b", text: "Оторвать вручную лобовое стекло от крыши или кузова", isCorrect: false },
      { id: "c", text: "Разрезать лобовое стекло сабельной пилой или ручной пилой для стекла", isCorrect: false },
    ],
  },
  {
    id: 19,
    text: "Горение каких материалов относится к пожару класса D?",
    options: [
      { id: "a", text: "Пожары металлов", isCorrect: true },
      { id: "b", text: "Пожары твердых горючих веществ и материалов", isCorrect: false },
      { id: "c", text: "Пожары горючих жидкостей", isCorrect: false },
      { id: "d", text: "Пожары горючих веществ и материалов электроустановок, находящихся под напряжением", isCorrect: false },
      { id: "e", text: "Пожары ядерных материалов, радиоактивных отходов и радиоактивных веществ", isCorrect: false },
      { id: "f", text: "Пожары газов", isCorrect: false },
    ],
  },
  {
    id: 20,
    text: "Изолирующий противогаз предназначен",
    options: [
      { id: "a", text: "Для защиты органов дыхания от СО, аммиака, хлора, неизвестного ОВ", isCorrect:  true },
      { id: "b", text: "Для защиты органов дыхания только от АХОВ и ОВ", isCorrect: false },
      { id: "c", text: "Для защиты органов дыхания только от угарного газа", isCorrect: false },
    ],
  },
  {
    id: 21 ,
    text: "Горение каких материалов относится к пожару класса A?",
    options: [
      { id: "21a", text: "Пожары металлов и их сплавов", isCorrect: false },
      { id: "21b", text: "Пожары газов", isCorrect: false },
      { id: "21c", text: "Пожары твердых горючих веществ и материалов", isCorrect: true },
      { id: "21d", text: "Пожары горючих жидкостей или плавящихся твердых веществ и материалов", isCorrect: false },
      { id: "21e", text: "Пожары горючих веществ и материалов электроустановок, находящихся под напряжениемпожары горючих веществ и материалов электроустановок, находящихся под напряжением", isCorrect: false },
      { id: "21f", text: "Пожары ядерных материалов, радиоактивных отходов и радиоактивных веществ", isCorrect: false },
    ],
  },
  {
    id:22 ,
    text: "Для защиты от аммиака используется",
    options: [
      { id: "22a", text: "Промышленный противогаз (коробка серого цвета)", isCorrect: true },
      { id: "22b", text: "Промышленный противогаз (коробка желтого цвета)", isCorrect: false },
      { id: "22c", text: "Общевойсковой фильтрующий противогаз", isCorrect: false },
    ],
  },
  {
    id:23 ,
    text: "Какое рабочее давление подушек высокого давления Holmatro",
    options: [
      { id: "23a", text: "Давление 8 бар", isCorrect: true },
      { id: "23b", text: "Давление не более 16 бар", isCorrect: false },
      { id: "23c", text: "Давление 18 бар", isCorrect: false },
    ],
  },
  {
    id:24 ,
    text: "Что необходимо сделать, если пострадавший находится в состоянии: дышит и без сознания?",
    options: [
      { id: "24a", text: "Придать устойчивое боковое положение", isCorrect: true },
      { id: "24b", text: "Положить на спину, на гладкую твердую поверхность", isCorrect: false },
      { id: "24c", text: "Наклонить голову и согнуть ноги в коленях", isCorrect: false },
    ],
  },
  {
    id: 25,
    text: "Выберите правильные варианты действий при спасении пострадавших из автомобиля, находящегося на железнодорожных путях:",
    options: [
      { id: "25a", text: "Послать сигнальщиков (днем сигнал яркого цвета, ночью сигнал фонарем, круговыми движениями) в обе стороны железнодорожных путей для подачи сигнала поездам об экстренном торможении, на расстоянии не менее 1,5 км", isCorrect: false },
      { id: "25b", text: "Сообщить об аварии поездному диспетчеру дистанции пути", isCorrect: false },
      { id: "25c", text: "При приближении поезда выполнить экстренное извлечение пострадавших", isCorrect: false },
      { id: "25d", text: "Послать сигнальщиков в обе стороны железнодорожных путей для подачи сигнала поездам об экстренном торможении и при приближении поезда выполнить экстренное извлечение пострадавших", isCorrect: true },
    ],
  },
  {
    id: 26,
    text: "Легкий защитный костюм Л-1 предназначен",
    options: [
      { id: "26a", text: "Для защиты кожных покровов и одежды от РВ, ОВ, БС и АХОВ", isCorrect: true },
      { id: "26b", text: "Для защиты кожных покровов и одежды только от ОВ", isCorrect: false },
      { id: "26c", text: "Для защиты кожных покровов и одежды только от РВ и ОВ ", isCorrect: false },
    ],
  },
  {
    id:27 ,
    text: "Что не относится к приемам подавления истерики:",
    options: [
      { id: "27a", text: "говорить с пострадавшим короткими фразами, уверенным тоном", isCorrect: false },
      { id: "27b", text: "уложить пострадавшего спать", isCorrect: false },
      { id: "27c", text: "позвать людей, чтобы создать толпу зрителей", isCorrect: true },
      { id: "27d", text: "неожиданно совершить действие, которое может сильно удивить", isCorrect: false },
    ],
  },
  {
    id:28 ,
    text: "Превышения рабочего давления во сколько раз гарантированно не приводит к разрыву подушки высокого давления ",
    options: [
      { id: "28a", text: "В 2 раза ", isCorrect: false },
      { id: "28b", text: "В 4 раза", isCorrect: true },
      { id: "28c", text: "В 10 раз", isCorrect: false },
    ],
  },
  {
    id:29 ,
    text: "Как проводится транспортировка пострадавшего с односторонней травмой грудной клетки при потере сознания?",
    options: [
      { id: "29a", text: "Лежа на пораженном боку", isCorrect: true },
      { id: "29b", text: "Лежа на здоровом боку", isCorrect: false },
      { id: "29c", text: "Лежа на спине", isCorrect: false },
      { id: "29d", text: "Лежа на животе", isCorrect: false },
      { id: "29e", text: "В сидячем положении", isCorrect: false },
    ],
  },
  {
    id:30 ,
    text: "Какую клемму следуют отсоединять первой при отключении аккумуляторной батареи?",
    options: [
      { id: "30a", text: "Отрицательную", isCorrect: true },
      { id: "30b", text: "Не имеет значения", isCorrect: false },
      { id: "30c", text: "Положительную", isCorrect: false },
    ],
  },
  {
    id: 31,
    text: "Что не относится к приемам выведения пострадавшего из ступора",
    options: [
      { id: "31a", text: "оставить пострадавшего в таком состоянии", isCorrect: true },
      { id: "31b", text: "говорить медленно и четко, чтобы вызвать негативные эмоции", isCorrect: false },
      { id: "31c", text: "стараться подстроить свое дыхание под ритм дыхания пострадавшего", isCorrect: false },
      { id: "31d", text: "дать пощечину", isCorrect: false },
    ],
  },
  {
    id: 32,
    text: "Как необходимо удерживать бензопилу?",
    options: [
      { id: "32a", text: "Правилами установлены требования: «Удерживать инструмент нужно исключительно двумя руками»", isCorrect: true },
      { id: "32b", text: "Работник - левша левой рукой держит за заднюю ручку и правой за переднюю. Работник правша правой рукой держит заднюю ручку, а левой переднюю", isCorrect: false },
      { id: "32c", text: "В исключительных случаях при дополнительных мерах страховки,", isCorrect: false },
    ],
  },
  {
    id: 33,
    text: "В каких случаях наносится прекордиальный удар при оказании первой помощи:",
    options: [
      { id: "33a", text: "Прекордиальный удар не наносится", isCorrect: true },
      { id: "33b", text: "При отсутствии у пострадавшего признаков жизни", isCorrect: false },
      { id: "33c", text: "При отсутствии эффекта от проводимой сердечно-легочной реанимации", isCorrect: false },
      { id: "33d", text: "При появлении у пострадавшего болей за грудиной", isCorrect: false },
    ],
  },
  {
    id:34 ,
    text: "При невозможности обесточить аккумулятор необходимо:",
    options: [
      { id: "34a", text: "Включить аварийную световую сигнализацию («аварийка»)", isCorrect: true },
      { id: "34b", text: "Лично сообщить об этом всем участникам спасательных работ", isCorrect: false },
      { id: "34c", text: "Доложить руководителю ликвидации чрезвычайной ситуации", isCorrect: false },
    ],
  },
  {
    id: 35,
    text: "Какой этап не входит в боевое развёртывание",
    options: [
      { id: "35a", text: "Подготовка к боевому развёртыванию", isCorrect: false },
      { id: "35b", text: "Полное боевое развёртывание", isCorrect: false },
      { id: "35c", text: "Предварительное боевое развёртывание", isCorrect: false },
      { id: "35d", text: "Начало боевого развёртывания", isCorrect: true },
    ],
  },
  {
    id: 36,
    text: "Как расшифровывается аббревиатура АХОВ",
    options: [
      { id: "36a", text: "Аварийно-химические опасные вещества", isCorrect: true },
      { id: "36b", text: "Аварийно-химические отравляющие вещества", isCorrect: false },
      { id: "36c", text: "Аммиак, хлор, отравляющие вещества", isCorrect: false },
    ],
  },
  {
    id: 37,
    text: "Увеличение в речи пострадавшего количества пауз может быть связано с:",
    options: [
      { id: "37a", text: "негативным отношением человека к себе, другим, жизни", isCorrect: false },
      { id: "37b", text: "переживанием сильного эмоционального волнения", isCorrect: true },
      { id: "37c", text: "нежеланием озвучивать информацию", isCorrect: false },
    ],
  },
  {
    id:38 ,
    text: "Разрешено ли давать пострадавшему лекарственные средства при оказании ему первой помощи",
    options: [
      { id: "38a", text: "Разрешено", isCorrect: false },
      { id: "38b", text: "Запрещено", isCorrect: true },
      { id: "38c", text: "Разрешено в случае крайней необходимости", isCorrect: false },
    ],
  },
  {
    id: 39,
    text: "При каких условиях допустимо использовать бензорез для деблокирования пострадавших их автомобиля",
    options: [
      { id: "39a", text: "Не допустимо в любом случае ", isCorrect: false },
      { id: "39b", text: "При невозможности деблокирования другими средствами и выполнении трех условий:", isCorrect: true },
      { id: "39c", text: "При невозможности деблокирования другими средствами при выполнении следующих условий:", isCorrect: false },
    ],
  },
  {
    id: 40,
    text: "Какая проводится первая помощь, пораженным АХОВ",
    options: [
      { id: "40a", text: "Надеть противогаз, эвакуировать из зоны поражения, провести частичную СО", isCorrect: true },
      { id: "40b", text: "Эвакуировать из зоны поражения, провести дегазацию, дать обильное питье", isCorrect: false },
      { id: "40c", text: "Эвакуировать из зоны поражения, провести дегазацию, вызвать врача", isCorrect: false },
    ],
  },
   {
    id: 41,
    text: "Стресс, возникающий при непрерывном или регулярном стрессовом воздействии, сила которого, как правило, невелика",
    options: [
      { id: "41a", text: "острый", isCorrect: false },
      { id: "41b", text: "отложенный", isCorrect: false },
      { id: "41c", text: "хронический", isCorrect: true },
    ],
  },
   {
    id: 42,
    text: "Как часто нужно затачивать цепь бензопилы ",
    options: [
      { id: "42a", text: "После каждых 5 моточасов", isCorrect: false },
      { id: "42b", text: "Каждый месяц", isCorrect: false },
      { id: "42c", text: "Когда уменьшается размер стружки или снижается производительность пиления", isCorrect: true },
    ],
  },
  {
    id: 43,
    text: "Алгоритм сердечно-легочной реанимации, выполняемой при оказании первой помощи:",
    options: [
      { id: "43a", text: "5 надавливаний на грудную клетку – 1 вдувание воздуха", isCorrect: false },
      { id: "43b", text: "15 надавливаний на грудную клетку – 2 вдувания воздуха", isCorrect: false },
      { id: "43c", text: "30 надавливаний на грудную клетку – 2 вдувания воздуха", isCorrect: true },
      { id: "43d", text: "40 надавливаний на грудную клетку – 2 вдувания воздуха", isCorrect: false },
    ],
  },
  {
    id: 44 ,
    text: "От каких факторов зависит дистанция установки оградительных конусов:",
    options: [
      { id: "44a", text: "Дистанция установки оградительных конусов не зависит от условий а указана в правилах дорожного движения", isCorrect: false },
      { id: "44b", text: "От количества автомобилей, попавших в ДТП", isCorrect: false },
      { id: "44c", text: "От скорости движения автомобилей на участке дороги и условий видимости", isCorrect: true },
    ],
  },
   {
    id: 45 ,
    text: "Локализация пожара это -",
    options: [
      { id: "45a", text: "Направление на котором сосредоточены силы и средства, выполняющие боевую задачу", isCorrect: false },
      { id: "45b", text: "Действие пожарных подразделений направленные на полное прекращение огня, а так же на исключение возможности его повторного возникновения", isCorrect: false },
      { id: "45c", text: "Отсутствует или предотвращена угроза людям и (или) животным; предотвращена возможность дальнейшего распространения горения; созданы условия для ликвидации пожара имеющимися силами и средствами", isCorrect: false },
      { id: "45d", text: "Действия, направленные на предотвращение возможности дальнейшего распространения горения и создание условий для его ликвидации имеющимися силами и средствами", isCorrect: true },
    ],
  },
  // ... ВАШИ ВОПРОСЫ ИЗ ПРИМЕРА (1–45) ...
];

function pickRandomQuestions(source: Question[], count: number): Question[] {
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}

type Mode = "idle" | "credit" | "all";

export function App() {
  const CREDIT_QUESTION_COUNT = 20;
  const BASE_MAX_ERRORS_FRACTION = 0.2; // допускаем до 20% ошибок

  const [mode, setMode] = useState<Mode>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      try {
        tg.ready();
        tg.expand();
      } catch {
        // ignore
      }
    }
  }, []);

  const currentQuestion = questions[currentIndex];

  const correctCount = useMemo(
    () =>
      questions.reduce((sum, q) => {
        const chosen = answers[q.id];
        const correctOption = q.options.find((o) => o.isCorrect);
        if (!correctOption) return sum;
        return sum + (chosen === correctOption.id ? 1 : 0);
      }, 0),
    [answers, questions]
  );

  const totalQuestions = questions.length;
  const maxErrorsAllowed = Math.floor(totalQuestions * BASE_MAX_ERRORS_FRACTION);
  const errorsCount = Math.max(totalQuestions - correctCount, 0);
  const isPassed = errorsCount <= maxErrorsAllowed;

  const startTest = (newMode: Mode) => {
    let qs: Question[];
    if (newMode === "credit") {
      qs = pickRandomQuestions(ALL_QUESTIONS, Math.min(CREDIT_QUESTION_COUNT, ALL_QUESTIONS.length));
    } else if (newMode === "all") {
      qs = [...ALL_QUESTIONS];
    } else {
      qs = [];
    }

    setMode(newMode);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleAnswer = (optionId: string) => {
    if (!currentQuestion) return;

    const questionId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    const isLast = currentIndex === questions.length - 1;

    if (isLast) {
      setIsFinished(true);

      try {
        const tg = window.Telegram?.WebApp;
        if (tg && typeof tg.sendData === "function") {
          const isCorrectNow = isAnswerCorrect(currentQuestion, optionId);
          const finalCorrect = correctCount + (isCorrectNow ? 1 : 0);
          const finalTotal = questions.length;
          const finalMaxErrorsAllowed = Math.floor(finalTotal * BASE_MAX_ERRORS_FRACTION);
          const finalErrors = Math.max(finalTotal - finalCorrect, 0);
          const finalPassed = finalErrors <= finalMaxErrorsAllowed;

          const payload = {
            type: "quizResult",
            mode,
            correct: finalCorrect,
            total: finalTotal,
            errors: finalErrors,
            maxErrorsAllowed: finalMaxErrorsAllowed,
            passed: finalPassed,
            answers: {
              ...answers,
              [questionId]: optionId,
            },
          };

          // На некоторых Android-клиентах Telegram WebApp закрывается сразу после sendData.
          // Поэтому отправляем только данные, не вызываем close() и не меняем состояние после этого вызова.
          tg.sendData(JSON.stringify(payload));
        }
      } catch (error) {
        console.log("Telegram sendData error:", error);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestartSameMode = () => {
    if (mode === "credit") {
      startTest("credit");
    } else if (mode === "all") {
      startTest("all");
    } else {
      setMode("idle");
      setQuestions([]);
      setCurrentIndex(0);
      setAnswers({});
      setIsFinished(false);
    }
  };

  if (mode === "idle") {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-6 pt-8">
          <header className="mb-6 text-center">
            <h1 className="text-lg font-semibold">Тест для Telegram</h1>
            <p className="mt-1 text-xs text-slate-400">
              Выберите режим прохождения: зачёт (20 случайных вопросов) или вся база вопросов.
            </p>
          </header>

          <main className="flex flex-1 flex-col items-stretch justify-center gap-3">
            <button
              onClick={() => startTest("credit")}
              className="rounded-2xl bg-emerald-500 px-4 py-4 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 active:scale-[0.98] hover:bg-emerald-400"
            >
              Зачет (20 случайных вопросов)
            </button>
            <button
              onClick={() => startTest("all")}
              className="rounded-2xl bg-slate-800 px-4 py-4 text-sm font-semibold text-slate-50 shadow-lg shadow-slate-950/40 active:scale-[0.98] hover:bg-slate-700"
            >
              Все вопросы (вся база)
            </button>
          </main>

          <footer className="mt-4 text-center text-[10px] text-slate-500">
            Интерфейс адаптирован под Telegram WebApp.
          </footer>
        </div>
      </div>
    );
  }

  if (!currentQuestion && !isFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <div className="text-center text-sm text-slate-300">
          Недостаточно вопросов в базе. Добавьте больше вопросов в ALL_QUESTIONS.
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-6 pt-8">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Тест для Telegram</h1>
            <p className="text-xs text-slate-400">
              {mode === "credit" ? "20 случайных вопросов (зачет)" : "Все вопросы из базы"}
            </p>
          </div>
          <button
            onClick={() => {
              setMode("idle");
              setQuestions([]);
              setCurrentIndex(0);
              setAnswers({});
              setIsFinished(false);
            }}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200 shadow-sm hover:bg-slate-700"
          >
            В меню
          </button>
        </header>

        {!isFinished ? (
          <main className="flex flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>
                Вопрос {currentIndex + 1} / {questions.length}
              </span>
              <span>Правильных: {correctCount}</span>
            </div>

            {currentQuestion && (
              <>
                <div className="mb-4 rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40">
                  <p className="whitespace-pre-line text-sm leading-relaxed">{currentQuestion.text}</p>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-700 active:scale-[0.98]"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </>
            )}
          </main>
        ) : (
          <main className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-6 rounded-3xl bg-slate-900/70 px-6 py-8 shadow-lg shadow-slate-950/40">
              <h2 className="mb-2 text-xl font-semibold">Тест завершён</h2>
              <p className="mb-4 text-sm text-slate-300">
                Правильных ответов: {correctCount} из {questions.length}
              </p>
              <p
                className={
                  "text-lg font-bold " + (isPassed ? "text-emerald-400" : "text-rose-400")
                }
              >
                {isPassed ? "Зачёт" : "Незачёт"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleRestartSameMode}
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
              >
                Пройти ещё раз в этом режиме
              </button>
              <button
                onClick={() => setMode("idle")}
                className="rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-50 shadow-lg shadow-slate-950/40 hover:bg-slate-700"
              >
                В главное меню
              </button>
            </div>
          </main>
        )}

        <footer className="mt-4 text-center text-[10px] text-slate-500">
          Интерфейс адаптирован под Telegram WebApp: вопрос сверху, варианты ответов кнопками внизу.
        </footer>
      </div>
    </div>
  );
}

function isAnswerCorrect(question: Question, optionId: string): boolean {
  const option = question.options.find((o) => o.id === optionId);
  return Boolean(option && option.isCorrect);
}
