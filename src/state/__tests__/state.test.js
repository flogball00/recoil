import React, { useEffect } from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from "@testing-library/react-hooks";
import { useRecoilValue, RecoilRoot, useSetRecoilState } from "recoil";
import { organization, orgPage, getRepositories } from "..";

it("returns the correct default value", () => {
  const { result } = renderHook(() => useRecoilValue(organization), {
    wrapper: RecoilRoot,
  });
  expect(result.current).toEqual("");
});

it("should return the correct information", async () => {
  const query = "Hello World";

  const { result } = renderHook(
    () => {
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

it("returns the correct default value", () => {
  const { result } = renderHook(() => useRecoilValue(orgPage), {
    wrapper: RecoilRoot,
  });
  expect(result.current).toEqual({});
});

it("should return the correct information", async () => {
  const query = { page: "Hello" };

  const { result } = renderHook(
    () => {
      const setOrgPage = useSetRecoilState(orgPage);
      useEffect(() => {
        setOrgPage(query);
      }, [setOrgPage]);

      return useRecoilValue(orgPage);
    },
    {
      wrapper: RecoilRoot,
    }
  );

  expect(result.current).toEqual(query);
});
