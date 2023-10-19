import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

import styles from './CardMyBet.module.scss';

const CardMyBet = ({ bet, editBet, deleteCard }) => {
  const border = bet.profit > 0 ? 'win' : bet.profit < 0 ? 'loss' : 'void';
  const color = bet.profit > 0 ? 'win' : bet.profit < 0 ? 'loss' : 'void';

  return (
    <div
      className={`${styles['card-my-bet']} ${styles[`card-my-bet--${border}`]}`}
    >
      <div className={styles['card-my-bet__close-container']}>
        <FaTimes onClick={() => deleteCard(bet._id)} />
      </div>
      <div className={styles['card-my-bet__image-box']}>
        <Image src={`/${bet.bookie}.png`} width={103} height={32} alt="Logo" />
      </div>
      <p>
        Depósitos: <span>{bet.deposits}€</span>
      </p>
      <p>
        Reintegros: <span>{bet.withdraws}€</span>
      </p>
      <p>
        Saldo inicial: <span>{bet.initialBalance}€</span>
      </p>
      <p>
        Saldo final: <span>{bet.finalBalance}€</span>
      </p>
      <p>
        Profit:{' '}
        <span className={`text-${color}`} style={{ fontWeight: '600' }}>
          {bet.profit.toFixed(2)}€
        </span>
      </p>
      <div className={styles['card-my-bet__btn-box']}>
        <button className="card-btn" onClick={() => editBet(bet._id)}>
          Editar
        </button>
      </div>
    </div>
  );
};

export default CardMyBet;
