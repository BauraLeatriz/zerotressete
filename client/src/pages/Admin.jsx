import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Cores baseadas no Tech.jsx para manter o estilo
const ACCENT = "oklch(0.85 0.18 195)";
const ACCENT_BORDER = "oklch(0.85 0.18 195 / 0.35)";
const ACCENT_GLOW = "0 0 40px oklch(0.85 0.18 195 / 0.3)";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // tRPC calls
  const checkPassword = trpc.admin.checkPassword.useMutation({
    onSuccess: () => {
      setIsAuthenticated(true);
      toast.success("Acesso Autorizado.");
      refetchSchedules();
    },
    onError: (error) => {
      toast.error(error.message || "Senha incorreta.");
    }
  });

  const { data: schedules, refetch: refetchSchedules, isLoading } = trpc.admin.getSchedules.useQuery(
    { password },
    { enabled: isAuthenticated }
  );

  const updateStatus = trpc.admin.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status atualizado!");
      refetchSchedules();
    },
    onError: (error) => {
      toast.error("Erro ao atualizar: " + error.message);
    }
  });

  const deleteSchedule = trpc.admin.deleteSchedule.useMutation({
    onSuccess: () => {
      toast.success("Agendamento excluído.");
      refetchSchedules();
    },
    onError: (error) => {
      toast.error("Erro ao excluir: " + error.message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) return;
    checkPassword.mutate({ password });
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatus.mutate({ password, id, status: newStatus });
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja apagar esse agendamento?")) {
      deleteSchedule.mutate({ password, id });
    }
  };

  const inputStyle = {
    background: "oklch(0.12 0.02 265 / 0.8)",
    border: `1px solid ${ACCENT_BORDER}`,
    color: "oklch(0.95 0.005 265)",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s"
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.09 0.025 265)" }}>
        <div className="max-w-sm w-full p-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-40 text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              — acesso restrito —
          </p>
          <h2 className="text-4xl font-bold leading-none mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
            ADMIN PORTAL
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Senha Administrativa" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={checkPassword.isPending}
              className="w-full py-3 rounded font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: ACCENT,
                color: "oklch(0.09 0.025 265)",
                fontSize: "0.875rem",
                boxShadow: ACCENT_GLOW,
              }}
            >
              {checkPassword.isPending ? "Verificando..." : "Entrar"}
            </button>
            <div className="mt-4">
              <Link href="/">
                <span className="text-xs opacity-40 hover:opacity-100 cursor-pointer text-white underline" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  Voltar ao site
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white w-full" style={{ background: "oklch(0.09 0.025 265)" }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
           <div>
              <h1 className="text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}>
                PAINEL DE AGENDAMENTOS
              </h1>
              <p className="text-xs tracking-widest uppercase opacity-40 mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                 — VISÃO GERAL DE CONSERTOS —
              </p>
           </div>
           <Link href="/">
             <button className="px-4 py-2 border rounded border-gray-700 hover:bg-gray-800 text-sm">Sair / Voltar</button>
           </Link>
        </div>

        {isLoading ? (
          <p className="text-center opacity-50 py-10">Carregando agendamentos...</p>
        ) : schedules?.length === 0 ? (
          <div className="text-center opacity-50 py-10 bg-gray-900 rounded-lg">Nenhum agendamento encontrado no banco.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900">
            <table className="w-full text-left text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <thead className="bg-gray-950 uppercase border-b border-gray-800 text-xs text-gray-400">
                <tr>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Contato</th>
                  <th className="px-4 py-3">Equipamento</th>
                  <th className="px-4 py-3">Problema</th>
                  <th className="px-4 py-3">Data Pref.</th>
                  <th className="px-4 py-3">Criado em</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {schedules?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                    <td className="px-4 py-3 text-xs">
                      {item.phone && <div>📞 {item.phone}</div>}
                      {item.email && <div className="opacity-70 mt-1">✉️ {item.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-[oklch(0.85_0.18_195)] font-bold">{item.device}</td>
                    <td className="px-4 py-3 break-words max-w-[200px] text-xs opacity-80">{item.problem}</td>
                    <td className="px-4 py-3 text-xs">{item.preferredDate || "N/A"}</td>
                    <td className="px-4 py-3 text-xs opacity-60">
                      {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select 
                        value={item.status} 
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`bg-black border rounded px-2 py-1 text-xs uppercase font-bold
                          ${item.status === 'concluído' ? 'border-green-500 text-green-500' : 
                            item.status === 'confirmado' ? 'border-yellow-500 text-yellow-500' : 
                            'border-red-500 text-red-500'}`}>
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="concluído">Concluído</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 text-xl" title="Excluir">
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
