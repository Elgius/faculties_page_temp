import type { HTMLAttributes } from 'react'
export function Card({className='',...props}:HTMLAttributes<HTMLDivElement>){return <div data-slot="card" className={`ui-card ${className}`} {...props}/>}
export function CardContent({className='',...props}:HTMLAttributes<HTMLDivElement>){return <div data-slot="card-content" className={className} {...props}/>}
