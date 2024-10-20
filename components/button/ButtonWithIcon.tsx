import React from 'react';
import Link from 'next/link';

interface ButtonWithIconProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  className?: string;
  iconClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon,
  text,
  href,
  className = '',
  iconClassName = '',
  onClick,
}) => {
  const buttonClassNames = `text-blue flex items-center justify-center rounded-lg border bg-white p-3 font-semibold shadow-sm transition hover:bg-gray-100 ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClassNames}>
        <span className="mr-2">{icon}</span>
        {text}
      </Link>
    );
  }

  return (
    <button className={buttonClassNames} onClick={onClick}>
      <span className={`mr-2 ${iconClassName}`}>{icon}</span>
      {text}
    </button>
  );
};

export default ButtonWithIcon;
