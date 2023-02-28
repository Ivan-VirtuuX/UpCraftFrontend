import donatePageImg1 from '@/assets/images/donatePageImg1.png';
import donatePageImg2 from '@/assets/images/donatePageImg2.png';
import donatePageImg3 from '@/assets/images/donatePageImg3.png';
import donatePageImg4 from '@/assets/images/donatePageImg4.png';

export const donates = [
  {
    color: '#EB8363',
    donateNumber: 1,
    title: 'VIP',
    text: {
      mainDescription: [
        'Префикс [Vip]',
        'Возможность писать цветные сообщения в чат',
        'Вход на заполненный сервер',
      ],
      kitsDescription: [
        'Перед использованием кита не забудьте очистить инвентарь!',
        '/kit vip - 1 раз в месяц',
        '/kit mobs - 1 раз в неделю',
        '/kit res - 1 раз в неделю',
      ],
    },
    price: 200,
    donatePageImg: donatePageImg1,
    isLineVisible: true,
  },
  {
    color: '#8E63EB',
    donateNumber: 2,
    title: 'PREMIUM',
    text: {
      mainDescription: [
        'Префикс [Premium]',
        'Возможность писать цветные сообщения в чат',
        'Вход на заполненный сервер',
      ],
      kitsDescription: [
        'Перед использованием кита не забудьте очистить инвентарь!',
        '/kit premium - 1 раз в месяц',
        '/kit botania - 1 раз в 2 недели',
        '/kit mobs - 1 раз в неделю',
        '/kit res - 1 раз в неделю',
      ],
    },
    price: 300,
    donatePageImg: donatePageImg2,
    isLineVisible: true,
  },
  {
    color: '#EB63BD',
    donateNumber: 3,
    title: 'MASTER',
    text: {
      mainDescription: [
        'Префикс [Master]',
        'Возможность писать цветные сообщения в чат',
        'Вход на заполненный сервер',
        'Сохранение инвентаря после смерти (включая бижутерию)',
      ],
      kitsDescription: [
        'Перед использованием кита не забудьте очистить инвентарь!',
        '/kit master - 1 раз в месяц',
        '/kit create - 1 раз в 2 недели',
        '/kit botania - 1 раз в 2 недели',
        '/kit mobs - 1 раз в неделю',
        '/kit res2 - 1 раз в неделю',
      ],
    },
    price: 450,
    donatePageImg: donatePageImg3,
    isLineVisible: true,
  },
  {
    color: '#EB6363',
    donateNumber: 4,
    title: 'CHAOTIC',
    text: {
      mainDescription: [
        'Префикс [Chaotic]',
        'Возможность писать цветные сообщения в чат',
        'Вход на заполненный сервер',
        'Сохранение инвентаря после смерти (включая бижутерию)',
        'Бессмертие',
        'Возможность летать',
      ],
      kitsDescription: [
        'Перед использованием кита не забудьте очистить инвентарь!',
        '/kit chaotic - 1 раз в месяц',
        '/kit thermal - 1 раз в 2 недели',
        '/kit mobs2 - 1 раз в 2 недели',
        '/kit create - 1 раз в 2 недели',
        '/kit botania - 1 раз в 2 недели',
        '/kit mobs - 1 раз в неделю',
        '/kit res2 - 1 раз в неделю',
      ],
    },
    price: 550,
    donatePageImg: donatePageImg4,
    isLineVisible: false,
  },
];
