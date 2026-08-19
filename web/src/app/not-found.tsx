export default function NotFound() {
  return (
    <div className="section container" style={{ textAlign: "center", padding: "120px 34px" }}>
      <p className="eyebrow">404</p>
      <h1 className="h1" style={{ margin: "12px 0" }}>
        Siden ble ikke funnet
      </h1>
      <p style={{ color: "var(--muted)" }}>Siden du leter etter finnes ikke.</p>
    </div>
  );
}
