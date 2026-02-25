import { JsonLd } from "./JsonLd";

interface SchemaHowToProps {
  name: string;
  steps: string[];
}

export function SchemaHowTo({ name, steps }: SchemaHowToProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        step: steps.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }}
    />
  );
}
