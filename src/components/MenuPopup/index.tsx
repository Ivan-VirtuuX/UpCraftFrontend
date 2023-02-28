import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import styles from './MenuPopup.module.scss';

interface MenuPopupProps {
  onClose: () => void;
  visible: boolean;
}

export const MenuPopup: React.FC<MenuPopupProps> = ({ onClose, visible }) => {
  return (
    <Dialog open={visible} onClose={onClose} style={{ zIndex: 10000 }} className={styles.menuPopup}>
      <DialogContent className={styles.menuPopupContainer}>
        <DialogContentText className={styles.menuPopupInner}>
          <div className={styles.serversList}>
            <div className={`${styles.serversListItem} ${styles.serversListFirstItem}`}>
              <h4>Сервера 1.16.5</h4>
              <ul>
                <li>
                  <Link href="/servers/upclassic" onClick={onClose}>
                    UpClassic
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.serversListItem}>
              <h4>Сервера 1.12.2</h4>
              <ul>
                <li>
                  <Link href="/servers/upmagic" onClick={onClose}>
                    UpMagic
                  </Link>
                </li>
                <li>
                  <Link href="/servers/uprpg" onClick={onClose}>
                    UpRpg
                  </Link>
                </li>
                <li>
                  <Link href="/servers/upmagicrpg" onClick={onClose}>
                    UpMagicRpg
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.helpList}>
            <h4>Помощь</h4>
            <ul>
              <li>
                <Link href="/rules" onClick={onClose}>
                  Правила
                </Link>
              </li>
              <hr className={styles.line} />
              <li>
                <Link href="/download" onClick={onClose}>
                  Скачать лаунчер
                </Link>
              </li>
              <hr className={styles.line} />
              <li>
                <Link href="/faq" onClick={onClose}>
                  Вопросы и ответы
                </Link>
              </li>
              <hr className={styles.line} />
              <li>
                <Link href="/commands" onClick={onClose}>
                  Команды
                </Link>
              </li>
              <li>
                <Link href={'/donate'} className={styles.donateLink} onClick={onClose}>
                  Донат
                </Link>
              </li>
              <li>
                <Link href={'/start'}>Начать играть</Link>
              </li>
            </ul>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
