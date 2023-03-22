import { render, screen } from "@testing-library/react";

import { RecoilRoot } from "recoil";

import PageLanding from "src/pages/index";

describe("PageLanding", () => {
  it("renders PageLanding unchanged", () => {
    const { container } = render(
      <RecoilRoot>
        <PageLanding />
      </RecoilRoot>,
    );

    expect(container).toMatchSnapshot();
  });

  it("PageLanding contains welcomText and loginButton", async () => {
    const component = (
      <RecoilRoot>
        <PageLanding />
      </RecoilRoot>
    );

    render(component);

    const welcomeText = await screen.findByText(/deploy your own project/i);
    const loginButton = await screen.findByText(/with github/i);
    expect(welcomeText).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });
});
