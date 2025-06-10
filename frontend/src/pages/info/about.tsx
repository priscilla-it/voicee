import Image from 'next/image'

import '../../styles/globals.css'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'

const TABLE_DATA = [
    {
        label: 'Полное наименование:',
        value: 'ООО «Войси»',
    },
    {
        label: 'Адрес:',
        value: '129226, г. Москва, ул. Сельскохозяйственная, д. 17, к. 1, помещ. 13П',
    },
    {
        label: 'Телефон:',
        value: '+7 (495) 790-58-77',
    },
    {
        label: 'Электронная почта:',
        value: (
            <a
                href="mailto:hello@voicee.ru"
                className="text-amber-600 hover:text-white-600 transition-colors"
            >
                <b>hello@voicee.ru</b>
            </a>
        ),
    },
    {
        label: 'Телеграм:',
        value: (
            <a
                href="https://t.me/Voicee_AI_Bot"
                className="text-amber-600 hover:text-white-600 transition-colors"
            >
                <b>t.me/Voicee_AI_Bot</b>
            </a>
        ),

    },
    {
        label: 'ИНН:',
        value: '9717154850'
    },
    {
        label: 'КПП:',
        value: '771701001'
    },
    {
        label: 'ОГРН:',
        value: '1247700128653'
    },
    {
        label: 'ОКВЭД:',
        value: '62.01 Разработка компьютерного программного обеспечения'
    },
]

const SOCIAL_LINKS = [
    {
        href: 'https://t.me/Voicee_AI_Bot',
        imgSrc: '/images/logo.webp',
        alt: 'Telegram',
    },
]

export default function AboutPage() {

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white">
            <NavBar />

            <main className="flex-grow flex justify-center items-start bg-lavender p-4 text-gray-800 overflow-y-auto">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    <div className="bg-gray-100 p-3 rounded-lg mb-4">
                        <h2 className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
                            О нашей компании
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {TABLE_DATA.map((item) => (
                            <div key={item.label} className="flex flex-col md:flex-row gap-2">
                                <div className="w-full md:w-1/3 font-medium text-sm md:text-base lg:text-lg">
                                    {item.label}
                                </div>
                                <div className="w-full md:w-2/3 text-sm md:text-base lg:text-lg break-words">
                                    {Array.isArray(item.value) ? (
                                        <div className="space-y-4">
                                            {item.value.map((wallet) => (
                                                <div
                                                    key={wallet.name}
                                                    className="flex flex-col items-center"
                                                >
                                                    <div className="flex flex-col items-center gap-2 mb-2">
                                                        <Image
                                                            src={wallet.imgSrc}
                                                            alt={wallet.name}
                                                            width={128}
                                                            height={128}
                                                            className="w-20"
                                                        />
                                                    </div>
                                                    <span
                                                        className="cursor-pointer break-all"
                                                    >
                                                        <b>{wallet.address}</b>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span
                                        >
                                            <b>{item.value}</b>
                                        </span>
                                    )}
                                </div>{' '}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        {SOCIAL_LINKS.map((item) => (
                            <a
                                key={item.alt}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src={item.imgSrc}
                                    alt={item.alt}
                                    width={1024}
                                    height={1024}
                                    className="w-36 md:w-36 lg:w-36"
                                />
                            </a>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
