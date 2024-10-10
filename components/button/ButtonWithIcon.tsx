import React from 'react';
import Link from 'next/link';

interface ButtonWithIconProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  icon,
  text,
  href,
  className = '',
  onClick,
}) => {
  const buttonClassNames = `text-blue flex items-center justify-center rounded-lg border bg-white p-3 font-semibold shadow-sm transition hover:bg-gray-100 ${className}`;

  if (href) {
    return (
      <Link href={href} passHref>
        <a className={buttonClassNames}>
          <span className="mr-2">{icon}</span>
          {text}
        </a>
      </Link>
    );
  }

  return (
    <button className={buttonClassNames} onClick={onClick}>
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default ButtonWithIcon;
