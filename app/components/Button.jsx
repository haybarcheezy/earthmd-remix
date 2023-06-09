import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-white active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    pink: "bg-pink-500 text-white hover:text-white hover:bg-pink-500 active:bg-pink-700 active:text-pink-100 focus-visible:outline-pink-500",
    white:
      "bg-white text-slate-900 hover:bg-pink-50 active:bg-pink-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-pink-500 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
  },
};

export default function Button({
  variant = "solid",
  color = "slate",
  className,
  href,
  ...props
}) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
