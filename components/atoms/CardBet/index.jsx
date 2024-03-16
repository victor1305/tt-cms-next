import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

import { bookiesImages } from '@/lib/constants';

import styles from './CardBet.module.scss';

const CardBet = ({ bet, editBet, deleteCard }) => {
  const border = bet.profit > 0 ? 'win' : bet.profit < 0 ? 'loss' : 'void';
  const color = bet.profit > 0 ? 'win' : bet.profit < 0 ? 'loss' : 'void';
  return (
    <div className={`${styles['card-bet']} ${styles[`card-bet--${border}`]}`}>
      <div className={styles['card-bet__close-container']}>
        <FaTimes onClick={() => deleteCard(bet._id)} />
      </div>
      <div className={styles['card-bet__image-box']}>
        <Image
          src={bookiesImages[bet.bookie]}
          width={103}
          height={32}
          alt="Logo"
        />
      </div>
      <p className={styles['card-bet--racecourse']}>{bet.racecourse}</p>
      <p>
        <span className={styles['card-bet--limit-lines']}>{bet.betName}</span>
      </p>
      <p>
        Stake: <span>{bet.stake}</span>
      </p>
      <p>
        Cuota: <span>{bet.price}</span>
      </p>
      <p>
        Profit:{' '}
        <span className={`text-${color}`} style={{ fontWeight: '600' }}>
          {bet.profit.toFixed(2)} uds
        </span>
      </p>
      <div className={styles['card-bet__btn-box']}>
        <button className="card-btn" onClick={() => editBet(bet._id)}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default CardBet;
