// tests/unit/axiosInstance.spec.js

import axiosInstance from "@/config/axiosInstance";
import { msalInstance } from "@/main";

jest.mock("@/main", () => ({
  msalInstance: {
    acquireTokenSilent: jest.fn()
  }
}));

describe("Axios Instance with Interceptor", () => {
  it("should add Authorization header with token", async () => {
    // const token = "mock-token";
    msalInstance.acquireTokenSilent([]);

    const testData = { data: "test" };
    axiosInstance.post("/test", testData);
  });
});
