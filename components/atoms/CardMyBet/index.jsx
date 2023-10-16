import Image from "next/image";

const CardMyBet = ({ bet, editBet }) => (
  <div>
    <Image 
      src={`/${bet.bookie}.png`}
      width={103}
      height={32}
      alt="Logo"
    />
    <p>Depósitos: <span>{bet.deposits}€</span></p>
    <p>Reintegros: <span>{bet.withdraws}€</span></p>
    <p>Saldo inicial: <span>{bet.initialBalance}€</span></p>
    <p>Saldo final: <span>{bet.finalBalance}€</span></p>
    <p>Profit: <span>{bet.profit.toFixed(2)}€</span></p>
    <div>
      <button onClick={editBet}>Editar</button>
    </div>
  </div>
);

export default CardMyBet;