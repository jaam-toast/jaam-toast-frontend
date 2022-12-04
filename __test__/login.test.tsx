import { render, screen } from "@testing-library/react";

import { RecoilRoot } from "recoil";

import Login from "@/pages/login";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Login Page", () => {
  it("renders Login Page unchanged", () => {
    const { container } = render(
      <RecoilRoot>
        <Login />
      </RecoilRoot>,
    );

    expect(container).toMatchSnapshot();
  });

  it("Login Page contains loginButton", async () => {
    const component = (
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    );

    render(component);

    const loginButton = await screen.findByText(/with github/i);
    expect(loginButton).toBeTruthy();
  });
});
