/* ============================================================
   routers.js — Backend tRPC
   Convertido para JavaScript
   Alterações: telefone obrigatório, e-mail opcional
   ============================================================ */

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { schedules } from "../drizzle/schema";
import { sendScheduleConfirmation, sendScheduleNotification } from "./email";
import { ENV } from "./_core/env";

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

  schedule: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          // E-mail agora opcional
          email: z.string().email("E-mail inválido").optional(),
          // Telefone agora obrigatório
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

          // Salvar agendamento no banco
          await db.insert(schedules).values({
            name: input.name,
            email: input.email,
            phone: input.phone,
            device: input.device,
            problem: input.problem,
            preferredDate: input.date,
            status: "pendente",
          });

          // Enviar confirmação por e-mail apenas se o cliente forneceu um
          if (input.email) {
            await sendScheduleConfirmation(input.email, {
              name: input.name,
              device: input.device,
              problem: input.problem,
              preferredDate: input.date,
            });
          }

          // Notificar o dono sempre
          if (ENV.ownerEmail) {
            await sendScheduleNotification(ENV.ownerEmail, {
              name: input.name,
              email: input.email,
              phone: input.phone,
              device: input.device,
              problem: input.problem,
              preferredDate: input.date,
            });
          }

          return { success: true, message: "Agendamento enviado com sucesso!" };
        } catch (error) {
          console.error("Erro ao criar agendamento:", error);
          throw new Error("Erro ao processar agendamento. Tente novamente.");
        }
      }),
  }),
});
