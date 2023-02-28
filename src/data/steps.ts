import step1 from '@/assets/images/step1.png';
import step2 from '@/assets/images/step2.png';
import step3 from '@/assets/images/step3.png';

export const steps = [
  {
    stepNumber: 1,
    title: 'РЕГИСТРАЦИЯ',
    text: 'Для начала игры необходимо зарегистрироваться, не забыв перед этим ознакомиться с нашими правилами.',
    primaryActionButtonText: 'ЗАРЕГИСТРИРОВАТЬСЯ',
    secondaryActionButtonText: 'ВОЙТИ',
    imageUrl: step1.src,
    color: '#EB6363',
    isLineVisible: true,
  },
  {
    stepNumber: 2,
    title: 'СКАЧАТЬ ЛАУНЧЕР',
    text: 'Необходимо скачать наш лаунчер, который сам автоматически установит и настроит всё необходимое.',
    primaryActionButtonText: 'ДЛЯ WINDOWS',
    secondaryActionButtonText: 'ДЛЯ LINUX',
    tertiaryActionButtonText: 'ДЛЯ MACOS',
    imageUrl: step2.src,
    color: '#8E63EB',
    isLineVisible: true,
  },
  {
    stepNumber: 3,
    title: 'НАЧАТЬ ИГРАТЬ',
    text: 'Поздравляем, Вы прошли все шаги! Выбирайте сервер по Вашему вкусу и приступайте к игре.',
    imageUrl: step3.src,
    color: '#EB63A4',
    isLineVisible: false,
  },
];
