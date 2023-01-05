import "./index.css";
import { Account } from '../../../types';
import { AccountItem } from "./item";
import { useEffect, useState } from 'react';

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await fetch('/api/accounts')
        setAccounts(await res.json())
      } catch (e) {
        console.error(e)
      }
    }

    getAccounts()
  }, [])

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts?.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
