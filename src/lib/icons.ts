import {
  Wrench,
  Zap,
  Home,
  Thermometer,
  Paintbrush,
  TreePine,
  Calculator,
  Ruler,
  Gauge,
  Lightbulb,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  zap: Zap,
  home: Home,
  thermometer: Thermometer,
  paintbrush: Paintbrush,
  tree: TreePine,
};

export const SERVICE_SLUG_ICONS: Record<string, LucideIcon> = {
  plumbing: Wrench,
  electrical: Zap,
  roofing: Home,
  hvac: Thermometer,
  painting: Paintbrush,
  landscaping: TreePine,
};

export const TOOL_ICONS: Record<string, LucideIcon> = {
  "roofing-cost-estimator": Calculator,
  "painting-cost-estimator": Ruler,
  "hvac-sizing-calculator": Gauge,
  "energy-savings-quiz": Lightbulb,
  "project-planner": ClipboardList,
};
