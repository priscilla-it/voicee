import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white p-2 md:p-2 text-center hidden md:block">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm md:text-xl leading-relaxed">
          © ООО «Войси» 2024-2025
          <br className="hidden sm:block" />
        </p>
      </div>
    </footer>
  )
}

export default Footer
