import React, { useEffect } from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from "@testing-library/react-hooks";
import { useRecoilValue, RecoilRoot, useSetRecoilState } from "recoil";
import { organization } from "..";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/repositories", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders welcome message", () => {
  const { result } = renderHook(() => useRecoilValue(organization), {
    wrapper: RecoilRoot,
  });
  expect(result.current).toEqual("");
});

it("should return the length otherwise", async () => {
  const query = "Hello World";

  const { result } = renderHook(
    () => {
      // Set searchQueryState to "Hello World" so that we can test our selector.
      // We can probably mock this out, too. But I haven't tested that.
      const setSearchQuery = useSetRecoilState(organization);
      useEffect(() => {
        setSearchQuery(query);
      }, [setSearchQuery]);

      return useRecoilValue(organization);
    },
    {
      wrapper: RecoilRoot,
    }
  );

  expect(result.current).toEqual(query);
});
