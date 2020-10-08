import './styles.css';


// Создайте таймер
// Таймер можно выставить на 10с/20с/30с. ( У вас должно быть 3 кнопки с данными значениями)
// У таймера должна быть возможность поставить на паузу, продолжить, сбросить, старт.
//  Изначально должно быть всего 2 кнопки - старт и сбросить,
// после старта таймера кнопка старта меняет состояние на пауза,
// после нажатия на паузу кнопка меняет состояние на продолжить,
// после нажатия на продолжить кнопка меняет состояние на пауза
// после нажатия на сбросить кнопка старта снова имеет сочтояние старт


const timerRef = document.querySelector('.time');
const timeSelectionButton = document.querySelector('.button-wrapper');
const buttonStartAndPauseRef = document.querySelector('.start-buttons__button-start-pause');
const buttonTrowOffRef = document.querySelector('.start-buttons__button-trow-off');
let timerTime = 0;


const createTimer = (time) => {
    timerRef.textContent = `00 : ${time}`;
    timerTime = time;
};


const setTimer = (event) => {
    if(event.target.nodeName !== 'BUTTON') return;
    buttonStartAndPauseRef.removeAttribute('disabled', '');
    createTimer(event.target.textContent);
};

const startTimer = () => {

    const startTimer = setInterval(() => {

        if(buttonStartAndPauseRef.getAttribute('data-action') === 'proceed') {
            clearInterval(startTimer);
            return;
        };

        if(timerTime !== 0) {
            timerTime -= 1;
            timerRef.textContent = `00 : ${timerTime < 10 ? `0${timerTime}` : timerTime}`;
            return;
        }
        clearInterval(startTimer);
    }, 1000);
};


const startAndPauseTimer = () => {

    if(buttonStartAndPauseRef.getAttribute('data-action') === 'start' || buttonStartAndPauseRef.getAttribute('data-action') === 'proceed') {

        buttonStartAndPauseRef.textContent = 'Пауза';
        buttonStartAndPauseRef.setAttribute('data-action', 'pause');
        startTimer();
        return
    };

    buttonStartAndPauseRef.textContent = "Продолжить";
    buttonStartAndPauseRef.setAttribute('data-action', 'proceed');
};


const resetTimer = () => {
    timerRef.textContent = '00 : 00';
    timerTime = 0;
    buttonStartAndPauseRef.textContent = "Старт";
    buttonStartAndPauseRef.setAttribute('data-action', 'start');
    buttonStartAndPauseRef.setAttribute('disabled', '')
};

buttonStartAndPauseRef.addEventListener('click', startAndPauseTimer);
timeSelectionButton.addEventListener('click', setTimer);
buttonTrowOffRef.addEventListener('click', resetTimer);