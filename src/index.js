import './styles.css';
import * as ref from './js/ref';


// Создайте таймер
// Таймер можно выставить на 10с/20с/30с. ( У вас должно быть 3 кнопки с данными значениями)
// У таймера должна быть возможность поставить на паузу, продолжить, сбросить, старт.
//  Изначально должно быть всего 2 кнопки - старт и сбросить,
// после старта таймера кнопка старта меняет состояние на пауза,
// после нажатия на паузу кнопка меняет состояние на продолжить,
// после нажатия на продолжить кнопка меняет состояние на пауза
// после нажатия на сбросить кнопка старта снова имеет сочтояние старт


let timerTime = 0;
let time = 0;
let stopTimer = 0;


const createTimer = (time) => {
    ref.timer.textContent = `00 : ${time}`;
    timerTime = time;
};


const setTimer = (event) => {
    if(event.target.nodeName !== 'BUTTON') return;
    ref.buttonStartAndPause.removeAttribute('disabled', '');
    createTimer(event.target.textContent);
};

const resetTimer = () => {
    stopTimer = 0;
    ref.timer.textContent = '00 : 00';
    ref.buttonStartAndPause.textContent = "Старт";
    ref.buttonStartAndPause.setAttribute('data-action', 'start');
    ref.buttonStartAndPause.setAttribute('disabled', '')
    ref.timerSettingButtons.forEach(el => el.removeAttribute('disabled', ''));
};


const startTimer = (timeNaw) => {
    const setTime = timeNaw + timerTime * 1000;
    

    const startTimer = setInterval(() => {

        if(ref.buttonStartAndPause.getAttribute('data-action') === 'start') {
            clearInterval(startTimer)
            return;
        };

        if(ref.buttonStartAndPause.getAttribute('data-action') === 'proceed') {
            stopTimer = timerTime * 1000 - time - 1000;
            clearInterval(startTimer);
            return;
        };

        time = setTime - stopTimer - Date.now();
        const secs = Math.round((time / 1000));

        if(secs >= 0) {
            ref.timer.textContent = ` 00 : ${secs < 10 ? `0${secs}` : secs}`;
            time -= 1000;
            return;
        }

        clearInterval(startTimer);
        resetTimer();
    }, 1000);
};


const startAndPauseTimer = () => {
    const timeNaw = Date.now();

    if(ref.buttonStartAndPause.getAttribute('data-action') === 'start') {
        ref.timerSettingButtons.forEach(el => el.setAttribute('disabled', ''));
    }

    if(ref.buttonStartAndPause.getAttribute('data-action') === 'start' || ref.buttonStartAndPause.getAttribute('data-action') === 'proceed') {

        ref.buttonStartAndPause.textContent = 'Пауза';
        ref.buttonStartAndPause.setAttribute('data-action', 'pause');
        startTimer(timeNaw);
        return
    };

    ref.buttonStartAndPause.textContent = "Продолжить";
    ref.buttonStartAndPause.setAttribute('data-action', 'proceed');
};


ref.buttonStartAndPause.addEventListener('click', startAndPauseTimer);
ref.timeSelectionButton.addEventListener('click', setTimer);
ref.buttonTrowOff.addEventListener('click', resetTimer);




// const createTimer = (time) => {
//     timerRef.textContent = `00 : ${time}`;
//     timerTime = time;
// };


// const setTimer = (event) => {
//     if(event.target.nodeName !== 'BUTTON') return;
//     buttonStartAndPauseRef.removeAttribute('disabled', '');
//     createTimer(event.target.textContent);
// };

// const startTimer = () => {

//     const startTimer = setInterval(() => {

//         if(buttonStartAndPauseRef.getAttribute('data-action') === 'proceed') {
//             clearInterval(startTimer);
//             return;
//         };

//         if(timerTime !== 0) {
//             timerTime -= 1;
//             timerRef.textContent = `00 : ${timerTime < 10 ? `0${timerTime}` : timerTime}`;
//             return;
//         }
//         clearInterval(startTimer);
//     }, 1000);
// };


// const startAndPauseTimer = () => {

//     if(buttonStartAndPauseRef.getAttribute('data-action') === 'start' || buttonStartAndPauseRef.getAttribute('data-action') === 'proceed') {

//         buttonStartAndPauseRef.textContent = 'Пауза';
//         buttonStartAndPauseRef.setAttribute('data-action', 'pause');
//         startTimer();
//         return
//     };

//     buttonStartAndPauseRef.textContent = "Продолжить";
//     buttonStartAndPauseRef.setAttribute('data-action', 'proceed');
// };


// const resetTimer = () => {
//     timerRef.textContent = '00 : 00';
//     timerTime = 0;
//     buttonStartAndPauseRef.textContent = "Старт";
//     buttonStartAndPauseRef.setAttribute('data-action', 'start');
//     buttonStartAndPauseRef.setAttribute('disabled', '')
// };

// buttonStartAndPauseRef.addEventListener('click', startAndPauseTimer);
// timeSelectionButton.addEventListener('click', setTimer);
// buttonTrowOffRef.addEventListener('click', resetTimer);