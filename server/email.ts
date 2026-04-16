import { Resend } from "resend";
import { ENV } from "./_core/env";

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    if (!ENV.resendApiKey) {
      throw new Error("RESEND_API_KEY não configurada. Configure a chave no Manus Secrets.");
    }
    resend = new Resend(ENV.resendApiKey);
  }
  return resend;
}

export async function sendScheduleConfirmation(email: string, data: {
  name: string;
  device: string;
  problem: string;
  preferredDate?: string;
}) {
  try {
    const result = await getResend().emails.send({
      from: "zerotressete@resend.dev",
      to: email,
      subject: "Agendamento recebido - zerotressete tech",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00d9ff;">Olá ${data.name},</h2>
          <p style="color: #ccc; line-height: 1.6;">Recebemos sua solicitação de agendamento!</p>
          
          <div style="background: #0a0a0a; border: 1px solid #00d9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #00d9ff; margin-top: 0;">Detalhes do Agendamento:</h3>
            <ul style="color: #ccc; line-height: 1.8;">
              <li><strong>Dispositivo:</strong> ${data.device}</li>
              <li><strong>Problema:</strong> ${data.problem}</li>
              <li><strong>Data preferida:</strong> ${data.preferredDate || "A definir"}</li>
            </ul>
          </div>
          
          <p style="color: #ccc; line-height: 1.6;">Entraremos em contato em até 24h para confirmar seu agendamento.</p>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            zerotressete © 2025 | Consertos de Eletrônicos
          </p>
        </div>
      `,
    });

    return result;
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
    throw error;
  }
}

export async function sendScheduleNotification(ownerEmail: string, data: {
  name: string;
  email: string;
  phone?: string;
  device: string;
  problem: string;
  preferredDate?: string;
}) {
  try {
    const result = await getResend().emails.send({
      from: "zerotressete@resend.dev",
      to: ownerEmail,
      subject: `🔧 Nova solicitação de agendamento - ${data.device}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00d9ff;">Nova Solicitação de Agendamento</h2>
          
          <div style="background: #0a0a0a; border: 1px solid #00d9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #00d9ff; margin-top: 0;">Informações do Cliente:</h3>
            <ul style="color: #ccc; line-height: 1.8;">
              <li><strong>Nome:</strong> ${data.name}</li>
              <li><strong>E-mail:</strong> <a href="mailto:${data.email}" style="color: #00d9ff;">${data.email}</a></li>
              <li><strong>Telefone:</strong> ${data.phone || "Não informado"}</li>
            </ul>
          </div>
          
          <div style="background: #0a0a0a; border: 1px solid #00ff00; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #00ff00; margin-top: 0;">Detalhes do Serviço:</h3>
            <ul style="color: #ccc; line-height: 1.8;">
              <li><strong>Dispositivo:</strong> ${data.device}</li>
              <li><strong>Problema:</strong> ${data.problem}</li>
              <li><strong>Data preferida:</strong> ${data.preferredDate || "A definir"}</li>
            </ul>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            Verifique o banco de dados para mais informações.
          </p>
        </div>
      `,
    });

    return result;
  } catch (error) {
    console.error("Erro ao enviar notificação ao dono:", error);
    throw error;
  }
}
