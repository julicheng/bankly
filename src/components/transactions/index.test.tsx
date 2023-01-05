import { render, screen, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { TransactionHistory } from ".";
import { server } from '../../../jest.setup';

describe("transaction history",  () => {
  test("the expenses tab should be shown by default", async () => {
    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");
    
    let expensesTable;
    
    // Need to wait for the expenses table to appear to then check for its existence
    await waitFor(() => {
      expensesTable = screen.getByRole("table", {
        name: "Expenses",
      });
    })

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-20.25")).toBeInTheDocument();
  });

  test.skip("changing between the expenses and income tabs should show different transactions", () => {
    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    expect(screen.getByText("-20.25")).toBeInTheDocument();

    incomeTabTrigger.click();

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(screen.queryByText("-20.25")).not.toBeInTheDocument();
  });

  test('should show the loading state when transactions have not yet loaded', () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.delay(2000))
      )
    );
    
    render(<TransactionHistory />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  })

  test('should show the error state when there is a transactions error', async () => {
    server.use(
      rest.get("/api/transactions", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<TransactionHistory />);

    await waitFor(() => {
      expect(screen.getByText("An error has occurred. Please contact support for further assistance.")).toBeInTheDocument();
    })
  })
});
