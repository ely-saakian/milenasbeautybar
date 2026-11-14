import { afterEach, describe, expect, it, vi } from "vitest";
import { submitSignup } from "./use-waitlist-signup";

// fetch is the system boundary: the browser talking to /api/waitlist.
function respond(status: number, body: unknown) {
  const fetchMock = vi.fn(
    async () =>
      new Response(typeof body === "string" ? body : JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      })
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const signup = {
  name: "Sarah Kim",
  phone: "(253) 555-0147",
  service: "Lash Lift",
  website: "",
};

describe("submitSignup", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the signup and reports a new one as created", async () => {
    const fetchMock = respond(201, { status: "created" });

    expect(await submitSignup(signup)).toEqual({ status: "created" });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(signup),
      })
    );
  });

  it("reports a returning phone as already listed", async () => {
    respond(200, { status: "already_listed" });

    expect(await submitSignup(signup)).toEqual({ status: "already_listed" });
  });

  it("passes the server's field messages through", async () => {
    respond(400, {
      status: "invalid",
      fields: { phone: "Enter a 10-digit US mobile number." },
    });

    expect(await submitSignup(signup)).toEqual({
      status: "invalid",
      fields: { phone: "Enter a 10-digit US mobile number." },
    });
  });

  it("treats an invalid answer with no field messages as an error", async () => {
    respond(400, { status: "invalid", fields: {} });

    expect(await submitSignup(signup)).toEqual({ status: "error" });
  });

  it("reports a server error as error", async () => {
    respond(500, { status: "error" });

    expect(await submitSignup(signup)).toEqual({ status: "error" });
  });

  it("reports a rate limit as error", async () => {
    respond(429, "Too Many Requests");

    expect(await submitSignup(signup)).toEqual({ status: "error" });
  });

  it("reports a body that isn't JSON as error", async () => {
    respond(200, "<html>Bad gateway</html>");

    expect(await submitSignup(signup)).toEqual({ status: "error" });
  });

  it("reports a network failure as error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      })
    );

    expect(await submitSignup(signup)).toEqual({ status: "error" });
  });

  it("checks the signup in the browser first and sends nothing if it's invalid", async () => {
    const fetchMock = respond(201, { status: "created" });

    expect(
      await submitSignup({ ...signup, name: "  ", phone: "253 555 01" })
    ).toEqual({
      status: "invalid",
      fields: {
        name: "Please enter your name.",
        phone: "Enter a 10-digit US mobile number.",
      },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
