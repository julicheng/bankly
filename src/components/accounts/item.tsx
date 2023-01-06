import type { Account } from "../../../types";
import { formatCurrency } from '../../helpers/formatCurrency';
import "./index.css";

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  const {currency, value} = account.balance.amount;
  
  return (
    <div className="account">
      <div className="total">Total {currency}</div>
      <strong>{formatCurrency(value, currency)}</strong>
    </div>
  );
};
