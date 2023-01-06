import moment from 'moment';
import type { Transaction as TransactionType } from "../../../types";
import { Avatar } from "./avatar";
import { formatCurrency } from '../../helpers/formatCurrency';

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => {
  const {category, amount, date, description} = transaction;

  const formatDate = () => {
    return moment(date).format('Do MMMM YYYY')
  }

  return (
    <tr>
      <td>
        <div className="transaction-detail">
          <Avatar name={description} />
          <div className="transaction-description">
            {description}
            <div className="transaction-category">{category.replace(/_/g, ' ')}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{formatDate()}</div>
      </td>
      <td className="transaction-amount">
        <div className="amount">{formatCurrency(amount.value)}</div>
      </td>
    </tr>
  );
}
