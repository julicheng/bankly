import { render, screen, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { Accounts } from ".";
import { server } from '../../../jest.setup';

describe("accounts",  () => {
  test('should show the error state when there is an accounts error', async () => {
    server.use(
      rest.get("/api/accounts", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<Accounts />);

    await waitFor(() => {
      expect(screen.getByText("An error has occurred. Please contact support for further assistance.")).toBeInTheDocument();
    })
  })
});
