const FEATURES = [
  "Daily POTD with Hindi + English thought process",
  "Multi-language solutions (Java, C++, Python, JS)",
  "Hints-first learning approach",
  "Contest-wise problem collections",
  "Community requests & reports",
];

export default function Features() {
  return (
    <section className="py-10 max-w-3xl mx-auto">
      <ul className="space-y-2 text-sm">
        {FEATURES.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
    </section>
  );
}
