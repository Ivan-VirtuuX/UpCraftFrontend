import React from 'react';
import styles from './ServerInfo.module.scss';

interface ServerInfoProps {
  version: string;
  mapSize: string;
  wipeFrequency: string;
  lastWipe: string;
  color: string;
}

export const ServerInfo: React.FC<ServerInfoProps> = ({
  version,
  mapSize,
  wipeFrequency,
  lastWipe,
  color,
}) => {
  return (
    <div className={styles.serverInfoBlock}>
      <div>
        <h3>Версия игры</h3>
        <span style={{ color: color }}>{version}</span>
      </div>
      <div>
        <h3>Размер карты</h3>
        <span style={{ color: color }}>{mapSize}</span>
      </div>
      <div>
        <h3>Вайп доп. миров</h3>
        <span style={{ color: color }}>{wipeFrequency}</span>
      </div>
      <div>
        <h3>Последний вайп</h3>
        <span style={{ color: color }}>{lastWipe}</span>
      </div>
    </div>
  );
};
