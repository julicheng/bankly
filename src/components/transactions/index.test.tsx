import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { TransactionHistory } from ".";
import { server } from '../../../jest.setup';

describe("transaction history", () => {
  test("the expenses tab should be shown by default", async () => {
    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.queryByRole("table", {
      name: "Expenses",
    });

    waitFor(() => {
      expect(expensesTable).toBeInTheDocument();
      expect(screen.getByText("-£20.25")).toBeInTheDocument()
    })
  });

  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.queryByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    waitFor(() => {
      expect(expensesTable).toBeInTheDocument();
      expect(screen.getByText("-£20.25")).toBeInTheDocument()
      expect(incomeTable).not.toBeInTheDocument();

      fireEvent.click(incomeTabTrigger)
      expect(incomeTable).toBeInTheDocument()

      expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
      expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
      expect(screen.queryByText("-£20.25")).not.toBeInTheDocument();
    })
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
