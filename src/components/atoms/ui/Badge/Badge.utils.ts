import { cva } from "class-variance-authority";

export const badgeVariants = cva("inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-extrabold", {
  variants: {
    variant: {
      default: "bg-brand-50 text-brand-600",
      success: "bg-emerald-100 text-emerald-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-rose-100 text-rose-700",
      slate: "bg-slate-100 text-slate-700",
      info: "bg-blue-100 text-blue-700"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
