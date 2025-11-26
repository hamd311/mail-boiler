import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: {
      container: "gap-1",
      icon: "h-8 w-8",
      text: "text-lg",
      offsetY: "mb-0.5",
    },
    md: {
      container: "gap-1.5",
      icon: "h-11 w-11",
      text: "text-2xl",
      offsetY: "mb-1",
    },
    lg: {
      container: "gap-2",
      icon: "h-14 w-14",
      text: "text-3xl",
      offsetY: "mb-1.5",
    },
  };

  const currentSize = sizes[size];

  return (
    <Link href={"/"}>
      <div className={`flex items-end ${currentSize.container} ${className}`}>
        {/* Icon */}
        <img
          src={"/logo-icon.png"}
          alt="Mail Boiler Logo"
          className={`${currentSize.icon} object-contain flex-shrink-0`}
        />

        {/* Text */}
        {showText && (
          <div className={`flex items-center gap-0.5 ${currentSize.offsetY}`}>
            <span
              className={`${currentSize.text} font-bold leading-none tracking-tight text-[#06b6d4]`}
            >
              Mail
            </span>
            <span
              className={`${currentSize.text} font-bold leading-none tracking-tight text-foreground`}
            >
              Boiler
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
