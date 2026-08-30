import type { ButtonHTMLAttributes } from 'react'
type ButtonProps=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'default'|'link'}
export function Button({className='',variant='default',...props}:ButtonProps){return <button data-slot="button" className={`ui-button ui-button-${variant} ${className}`} {...props}/>}
