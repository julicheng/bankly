import "./index.css";
import { Account } from '../../../types';
import { AccountItem } from "./item";
import { useEffect, useState } from 'react';
import { Error } from '../error';

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await fetch('/api/accounts')
        setAccounts(await res.json())
      } catch (e) {
        setHasError(true)
      }
    }

    getAccounts()
  }, [])

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {!hasError ? accounts?.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        )) : <Error/>}
      </div>
    </>
  );
};
