import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/">
      <div className="relative w-20 aspect-square z-10">
        <Image src="/logo.avif" fill loading="eager" alt="Logo" className="object-contain" />
      </div>
    </Link>
  )
}

export default Logo
