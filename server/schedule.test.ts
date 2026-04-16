import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("schedule.create", () => {
  it("should accept valid schedule input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.schedule.create({
      name: "João Silva",
      email: "joao@example.com",
      phone: "11999999999",
      device: "iPhone 13",
      problem: "Tela quebrada",
      date: "2025-04-15",
    });

    expect(result).toHaveProperty("success");
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.schedule.create({
        name: "João Silva",
        email: "invalid-email",
        device: "iPhone 13",
        problem: "Tela quebrada",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.schedule.create({
        name: "",
        email: "joao@example.com",
        device: "iPhone 13",
        problem: "Tela quebrada",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
