import { listLeads } from "@/lib/leads";

export default async function BackendHome() {
  const leads = await listLeads();

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "48px 20px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
      }}
    >
      <p style={{ color: "#147d7a", fontWeight: 800, textTransform: "uppercase" }}>
        Next.js Backend
      </p>
      <h1 style={{ color: "#14213d", fontSize: 42, lineHeight: 1.05 }}>
        API Routes va Server Actions cho lead tu van
      </h1>
      <p style={{ color: "#34415f", lineHeight: 1.7 }}>
        Endpoint dang san sang tai <code>/api/lead</code>. Trang nay giup kiem
        tra nhanh danh sach lead da gui tu frontend.
      </p>

      <section style={{ marginTop: 36 }}>
        <h2>Leads moi nhat ({leads.length})</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {leads.length === 0 ? (
            <p>Chua co lead nao.</p>
          ) : (
            leads.map((lead) => (
              <article
                key={lead.id}
                style={{
                  border: "1px solid rgba(20, 33, 61, 0.14)",
                  borderRadius: 8,
                  padding: 18
                }}
              >
                <strong>{lead.name}</strong>
                <p>{lead.email}</p>
                <p>{lead.company}</p>
                <p>{lead.service}</p>
                <p>{lead.budget}</p>
                {lead.message ? <p>{lead.message}</p> : null}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
