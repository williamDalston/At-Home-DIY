import fs from "fs";
import path from "path";

export interface Testimonial {
  name: string;
  city: string;
  state: string;
  service: string;
  rating: number;
  text: string;
  date: string;
}

export function getAllTestimonials(): Testimonial[] {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "testimonials.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Testimonial[];
}

export function getTestimonialsByService(service: string): Testimonial[] {
  return getAllTestimonials().filter((t) => t.service === service);
}
