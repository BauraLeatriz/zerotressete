/* ============================================================
   routers.js — Backend tRPC
   Convertido para JavaScript puro
   ============================================================ */

import { COOKIE_NAME } from "@shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db.js";
import { schedules } from "../drizzle/schema.js";
import { sendScheduleConfirmation, sendScheduleNotification } from "./email.js";
import { ENV } from "./_core/env.js";
import { eq, desc } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),
  }),

  // ==========================================
  // Rotas do Cliente (Frontend público)
  // ==========================================
  schedule: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("E-mail inválido").optional(),
          phone: z.string().min(8, "Telefone é obrigatório"),
          device: z.string().min(1, "Dispositivo é obrigatório"),
          problem: z.string().min(1, "Descrição do problema é obrigatória"),
          date: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const db = await getDb();
          if (!db) throw new Error("Banco de dados não disponível");

          // GRAVA SEMPRE NO BANCO (Protegemos independente se o Email falha)
          await db.insert(schedules).values({
            name: input.name,
            email: input.email,
            phone: input.phone,
            device: input.device,
            problem: input.problem,
            preferredDate: input.date,
            status: "pendente",
          });

          // DISPARO DE EMAILS (Os erros são apenas "logados")
          if (input.email) {
            sendScheduleConfirmation(input.email, {
              name: input.name,
              device: input.device,
              problem: input.problem,
              preferredDate: input.date,
            });
          }

          if (ENV.ownerEmail) {
            sendScheduleNotification(ENV.ownerEmail, {
              name: input.name,
              email: input.email,
              phone: input.phone,
              device: input.device,
              problem: input.problem,
              preferredDate: input.date,
            });
          }

          return { success: true, message: "Agendamento recebido, confirmaremos em breve!" };
        } catch (error) {
          console.error("Erro Crítico no BD ao criar agendamento:", error);
          throw new Error("Erro ao processar agendamento. Tente novamente.");
        }
      }),
  }),

  // ==========================================
  // Rotas do Administrador Privado
  // ==========================================
  admin: router({
    // Validação extremamente simples: pede uma senha, checa contra .env
    checkPassword: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input }) => {
        const masterPassword = process.env.ADMIN_PASSWORD;
        if (!masterPassword) {
          throw new Error("A variável ADMIN_PASSWORD não foi configurada na hospedagem.");
        }
        if (input.password !== masterPassword) {
          throw new Error("Senha incorreta.");
        }
        return { success: true };
      }),

    getSchedules: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        if (input.password !== process.env.ADMIN_PASSWORD) {
          throw new Error("Acesso não autorizado.");
        }

        const db = await getDb();
        if (!db) throw new Error("Banco de dados indisponível");

        const result = await db.select().from(schedules).orderBy(desc(schedules.createdAt));
        return result;
      }),

    updateStatus: publicProcedure
      .input(z.object({
        password: z.string(),
        id: z.number(),
        status: z.enum(["pendente", "confirmado", "concluído"]),
      }))
      .mutation(async ({ input }) => {
        if (input.password !== process.env.ADMIN_PASSWORD) {
          throw new Error("Acesso não autorizado.");
        }
        const db = await getDb();
        await db.update(schedules).set({ status: input.status }).where(eq(schedules.id, input.id));
        return { success: true };
      }),

    deleteSchedule: publicProcedure
      .input(z.object({ password: z.string(), id: z.number() }))
      .mutation(async ({ input }) => {
        if (input.password !== process.env.ADMIN_PASSWORD) {
          throw new Error("Acesso não autorizado.");
        }
        const db = await getDb();
        await db.delete(schedules).where(eq(schedules.id, input.id));
        return { success: true };
      })
  })
});
