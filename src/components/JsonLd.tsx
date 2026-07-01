/**
 * Renders a schema.org JSON-LD block. Accepts a single node or an array of
 * nodes (which are wrapped in an @graph). Server component — safe to render in
 * layouts and pages. The payload is escaped so it can never break out of the
 * <script> tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped to neutralise "</script>" and other
      // sequences that could terminate the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
