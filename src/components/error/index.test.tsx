import { render } from "@testing-library/react";
import { Error } from ".";

test("should render as expected", () => {
  const { asFragment } = render(<Error />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    An error has occurred. Please contact support for further assistance.
  </div>
</DocumentFragment>
`);
});
