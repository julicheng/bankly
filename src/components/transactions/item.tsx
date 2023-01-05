import type { Transaction as TransactionType } from "../../../types";
import { Avatar } from "./avatar";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => {
  const formattedDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(transaction.date);

    return `${d.getDate()} ${months[d.getMonth()]} ${d.getUTCFullYear()}`
  }

  const formattedValue = () => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(transaction.amount.value)
  }

  return (
    <tr>
      <td>
        <div className="transaction-detail">
          <Avatar name={transaction.description} />
          <div className="transaction-description">
            {transaction.description}
            <div className="transaction-category">{transaction.category}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{formattedDate()}</div>
      </td>
      <td className="transaction-amount">
        <div className="amount">{formattedValue()}</div>
      </td>
    </tr>
  );
}
