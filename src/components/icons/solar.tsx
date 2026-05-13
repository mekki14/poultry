import { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string
}

export function SproutDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path className="opacity-40" d="M7 20h10" />
      <path d="M10 20c0-7.15 4.3-10.75 6.5-12 1.5 2 1.5 4.5 0 6.5-2 1.5-4.5 1.5-6.5 5.5Z" />
      <path d="M12 20c0-7.15-4.3-10.75-6.5-12-1.5 2-1.5 4.5 0 6.5 2 1.5 4.5 1.5 6.5 5.5Z" />
    </svg>
  )
}

export function SearchDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle className="opacity-40" cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function ChartDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path className="opacity-40" d="M3 21h18" />
      <path d="M7 17V9" />
      <path d="M12 17V5" />
      <path d="M17 17v-4" />
    </svg>
  )
}

export function TruckDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path className="opacity-40" d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <circle cx="19" cy="18" r="2" />
      <circle cx="5" cy="18" r="2" />
      <path d="M14 14h7l-2-3h-5" />
    </svg>
  )
}

export function ShieldDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path className="opacity-40" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function UsersDuotone({ color = "currentColor", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle className="opacity-40" cx="9" cy="7" r="4" />
      <path className="opacity-40" d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="8" r="3" />
      <path d="M21 21v-1a3 3 0 0 0-3-3h-1" />
    </svg>
  )
}

export function SolarUsersGroupRoundedBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}<circle cx="15" cy="6" r="3" fill="currentColor" opacity=".4" /><ellipse cx="16" cy="17" fill="currentColor" opacity=".4" rx="5" ry="3" /><circle cx="9.001" cy="6" r="4" fill="currentColor" /><ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" /></svg>
  )
}


export function SolarDeliveryBoldDuotone({ color = "currentColor", ...props }: IconProps) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} ><path fill="currentColor" d="M2.277 5.247a.75.75 0 0 1 .924-.522l1.703.472A2.71 2.71 0 0 1 6.8 7.075l2.151 7.786l.158.547a2.96 2.96 0 0 1 1.522 1.267l.31-.096l8.87-2.305a.75.75 0 1 1 .378 1.452l-8.837 2.296l-.33.102c-.006 1.27-.883 2.432-2.21 2.776c-1.59.414-3.225-.502-3.651-2.044s.518-3.129 2.108-3.542q.119-.03.237-.052L5.354 7.474a1.21 1.21 0 0 0-.85-.831L2.8 6.17a.75.75 0 0 1-.523-.923" /><path fill="currentColor" d="m9.564 8.73l.515 1.863c.485 1.755.727 2.633 1.44 3.032c.713.4 1.618.164 3.428-.306l1.92-.5c1.81-.47 2.715-.705 3.127-1.396c.412-.692.17-1.57-.316-3.325l-.514-1.862c-.485-1.756-.728-2.634-1.44-3.033c-.714-.4-1.619-.164-3.429.307l-1.92.498c-1.81.47-2.715.706-3.126 1.398c-.412.691-.17 1.569.315 3.324" opacity=".5" /></svg>)
}
