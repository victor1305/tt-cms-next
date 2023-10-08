import styles from "./PaymentsResume.module.scss";

const PaymentsResume = ({ payments }) => {
  const bizumPayments = payments.filter((elm) => elm.type === 'Bizum');
  const paypalPayments = payments.filter((elm) => elm.type === 'Paypal');
  const pscPayments = payments.filter((elm) => elm.type === 'Paysafecard');
  const cashPayments = payments.filter((elm) => elm.type === 'Efectivo');
  const transferPayments = payments.filter(
    (elm) => elm.type === 'Transferencia'
  );
  const totalReceipt = payments.reduce((acc, elm) => {
    return acc + elm.price;
  }, 0);

  return (
    <div className={styles["payments-resume"]}>
      <p>Resumen:</p>
      <ul>
        {bizumPayments.length > 0 && (
          <li>
            Bizum: <span>{bizumPayments.length}</span>
          </li>
        )}
        {paypalPayments.length > 0 && (
          <li>
            Paypal: <span>{paypalPayments.length}</span>
          </li>
        )}
        {pscPayments.length > 0 && (
          <li>
            Paysafecard: <span>{pscPayments.length}</span>
          </li>
        )}
        {cashPayments.length > 0 && (
          <li>
            Efectivo: <span>{cashPayments.length}</span>
          </li>
        )}
        {transferPayments.length > 0 && (
          <li>
            Transferencia: <span>{transferPayments.length}</span>
          </li>
        )}
      </ul>
      <p>Total Recibido: {totalReceipt}€</p>
    </div>
  );
};

export default PaymentsResume;
